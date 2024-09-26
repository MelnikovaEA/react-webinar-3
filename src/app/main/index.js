import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import {vocabulary} from "../../vocabulary";

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    language: state.language.current,
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    pagesCount: state.catalog.totalPagesCount,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, [select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Клик на элемент пагинации
    changePage: useCallback(page => store.actions.catalog.setCurrentPage(page), [store]),
    //Смена языка интерфейса
    switchLanguage: useCallback(() => store.actions.language.switch(),[store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} language={select.language} />;
      },
      [callbacks.addToBasket, select.language],
    ),
  };

  return (
    <PageLayout>
      <Head title={vocabulary.pages.shop[select.language]} switcher={vocabulary.markers[select.language]} onClick={callbacks.switchLanguage} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        language={select.language}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        pagesCount={select.pagesCount}
        currentPage={select.currentPage}
        onClick={callbacks.changePage}
      />
    </PageLayout>
  );
}

export default memo(Main);
