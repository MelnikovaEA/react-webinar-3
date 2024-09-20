import React, { useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import MainPanel from './components/main-panel';
import Modal from './components/modal';
import Controls from './components/controls';
import CartHeadWrapper from './components/cart-head-wrapper';
import CartTotalInfo from './components/cart-total-info';
import Item from './components/item';
import CartItem from "./components/cart-item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [modalActive, setModalActive] = React.useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(
      code => {
        store.addItem(code);
      },
      [store],
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <MainPanel cart={cart} onClick={() => setModalActive(true)} />
        <List list={list} onClick={callbacks.onAddItem} buttonTitle="Добавить" component={Item} />
      </PageLayout>
      <Modal isOpen={modalActive}>
        <CartHeadWrapper>
          <Head title="Корзина" />
          <Controls onClick={() => setModalActive(false)} title="Закрыть" />
        </CartHeadWrapper>
        <List
          list={cart.list}
          onClick={callbacks.onDeleteItem}
          buttonTitle="Удалить"
          isCart={true}
          component={CartItem}
        />
        <CartTotalInfo sum={cart.sum} qty={cart.qty} />
      </Modal>
    </>
  );
}

export default App;
