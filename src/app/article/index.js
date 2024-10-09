import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
//import commentActions from '../../store-redux/comment/actions';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(
    async () => {
      await Promise.all([
        dispatch(articleActions.load(params.id)),
        dispatch(commentsActions.load(params.id)),
      ]);
    },
    [params.id],
    true,
  );

  const select = useSelector(
    state => ({
      article: state.article.data,
      comments: state.comments.data,
      waiting: state.article.waiting && state.comments.waiting,
      session: store.getState().session.exists
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  // Формируем массив комментариев для рендера
  const transformedComments = useMemo(() => {
    // если загрузились комментарии из апи
    if (select.comments && select.comments?.items?.length > 0) {
      // сортируем их по родителям
      const tree = listToTree(select.comments.items);

      // убираем объект верхнего уровня из результата (иначе он тоже пушит в массив для рендера объект со всеми свойствами
      // равными undefined и еще ломает иерархию вложенности)
      const flatItems = tree.flatMap(item => {
        return [...item.children];
      });
      // формируем массив для рендера комментариев согласно их иерархии
      const items = treeToList(flatItems, (item, level) => {
        return {
          _id: item._id,
          text: item.text,
          dateCreate: item.dateCreate,
          type: item?.parent?._type,
          level: level,
          author: item?.author?.profile?.name || 'Unknown',
          isDeleted: item.isDeleted,
        };
      });

      return {
        ...select.comments,
        items: items,
      };
    }

    return select.comments;

  }, [select.comments]);

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // отправка коммента в ответ на коммент
    //replyComment: useCallback(() => dispatch(commentActions.reply(params)), [])
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          replyComment={callbacks.replyComment}
          t={t}
          comments={transformedComments}
          session={select.session}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
