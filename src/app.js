import React, { useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartPanel from "./components/cart-panel";
import CartModal from "./components/cart-modal";
import Controls from "./components/controls";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),
  };

  return (
    <>
    <PageLayout>
      <Head title="Магазин" />
      <CartPanel cart={cart} onClick={callbacks.onAddItem} />
      <List list={list} onClick={callbacks.onAddItem} buttonTitle="Добавить" />
    </PageLayout>
      <CartModal>
        <div className="top">
          <Head title="Корзина"/>
          <Controls onClick={() => {}} title="Закрыть"/>
        </div>
        <List list={cart.list} onClick={callbacks.onDeleteItem} buttonTitle="Удалить" />
      </CartModal>
    </>
  );
}

export default App;
