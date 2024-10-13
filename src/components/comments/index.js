import {memo, useState} from 'react';
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import './style.css';
import { Link, useLocation } from 'react-router-dom';
import Comment from '../comment';
import NewCommentWindow from '../new-comment-window';
import { useDispatch } from 'react-redux';
import commentActions from '../../store-redux/comment/actions';
import isLastInBranch from '../../utils/is-last-in-branch';

function Comments(props) {
  const cn = bem('Comments');
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Функция для отправки комментария
  const handleReplySubmit = data => {
    dispatch(commentActions.reply(data)); // Отправляем комментарий через Redux action
  };

  const [visibleCommentId, setVisibleCommentId] = useState(null); // Хранит id видимого комментария

  // Функция переключения окна ответа под последним комментарием ветки
  const toggleReplyWindow = id => {
    const clickedComment = props.comments.items.find(comment => comment._id === id);
    if (clickedComment) {
      const lastCommentIndex = isLastInBranch(
        props.comments.items,
        clickedComment.dateCreate,
        clickedComment._id,
      );
      const lastCommentInBranch = props.comments.items[lastCommentIndex];
      setVisibleCommentId(prevId =>
        prevId === lastCommentInBranch.dateCreate ? null : lastCommentInBranch.dateCreate,
      );
    }
  };

  const renderComments = items => {
    return items.map(item => {
      return (
        <div
          className={cn('item')}
          key={item.dateCreate}
          style={{ paddingLeft: item.level < 50 ? `${item.level * 10}px` : '500px' }}
          data-level={item.level}
        >
          <Comment
            id={item._id}
            key={item.dateCreate}
            name={item.author || 'anonymous'}
            dateCreate={item.dateCreate}
            text={item.text}
            session={props.session}
            isVisible={visibleCommentId === item.dateCreate}
            onToggleReply={() => toggleReplyWindow(item._id)}
            onSubmit={handleReplySubmit}
          />
        </div>
      );
    });
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <span>{t('comments.title')}</span>
        <span>{` (${props.comments.count || 0})`}</span>
      </div>
      <section className={cn('body')}>
        {props.comments.items && renderComments(props.comments.items)}
      </section>
      {visibleCommentId === null &&
        (props.session ? (
          <NewCommentWindow
            onToggleReply={toggleReplyWindow}
            placeholder={'Text'}
            theme="medium"
            onSubmitReply={handleReplySubmit}
          />
        ) : (
          <div className={cn('footer')}>
            <p className={cn('link')}>
              <Link to={'/login'} state={{ back: location.pathname }}>
                {t('comments.enter')}
              </Link>
              , {t('comments.toBeAbleComment')}
            </p>
          </div>
        ))}
    </div>
  );
}

export default memo(Comments);
