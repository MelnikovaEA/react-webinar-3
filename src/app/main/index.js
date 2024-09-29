import React, { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { vocabulary } from '../../vocabulary';
import Basket from '../basket';
import { translate } from '../../utils';
import ToolsPanel from '../../components/tools-panel';
import Navigation from '../../components/navigation';

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    activeModal: state.modals.name,
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
    switchLanguage: useCallback(() => store.actions.language.switch(), [store]),
    // Возврат на первую страницу
    returnToFirstPage: useCallback(() => store.actions.catalog.setCurrentPage(1), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            route="/item/"
            buttonTitle={translate('buttons.add', select.language, vocabulary)}
          />
        );
      },
      [callbacks.addToBasket, select.language],
    ),
  };

  return (
    <PageLayout>
      {select.activeModal === 'basket' && <Basket />}
      <Head
        title={translate('pages.shop', select.language, vocabulary)}
        switcher={translate('markers', select.language, vocabulary)}
        onClick={callbacks.switchLanguage}
      />
      <ToolsPanel>
        <Navigation
          onClick={callbacks.returnToFirstPage}
          title={translate('links.main', select.language, vocabulary)}
        />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          text={translate('basketInfo.inBasket', select.language, vocabulary)}
          infoEmpty={translate('basketInfo.emptyBasket', select.language, vocabulary)}
          buttonTitle={translate('buttons.go', select.language, vocabulary)}
          language={select.language}
        />
      </ToolsPanel>
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
