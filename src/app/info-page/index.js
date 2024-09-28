import React, { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDescriptionLayout from '../../components/item-description-layout';
import ItemDescription from '../../components/item-description';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import LoadingPage from '../../components/loading-page';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import {vocabulary} from "../../vocabulary";
import Basket from "../basket";

function InfoPage() {
  const store = useStore();
  //извлекаем id товара из поисковой строки
  const { _id } = useParams();

  useEffect(() => {
    //загрузка информации о товаре из API
    if (_id) {
      store.actions.info.loadItem(_id);
    }

    //функция очистки удаляет данные о предыдущем товаре перед рендером компонента
    return () => {
      store.actions.info.resetItem();
    };
  }, [_id]);

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    language: state.language.current,
    item: state.info.item,
    status: state.info.status,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    //Смена языка интерфейса
    switchLanguage: useCallback(() => store.actions.language.switch(),[store]),
    // Возврат на первую страницу
    returnToFirstPage: useCallback(() => store.actions.catalog.setCurrentPage(1), [store]),
  };

  return (
    <>
      {(select.status === 'loading' || select.status === 'idle') && <LoadingPage />}
      {select.status === 'fulfilled' && (
        <ItemDescriptionLayout>
          {select.activeModal === 'basket' && <Basket />}
          <Head title={select.item.title} switcher={vocabulary.markers[select.language]} onClick={callbacks.switchLanguage} />
          <BasketTool onOpen={callbacks.openModalBasket} onReturn={callbacks.returnToFirstPage} amount={select.amount} sum={select.sum} language={select.language} />
          <ItemDescription item={select.item} onClick={callbacks.addToBasket} language={select.language}/>
        </ItemDescriptionLayout>
      )}
    </>
  );
}

export default memo(InfoPage);
