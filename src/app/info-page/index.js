import React, { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDescriptionLayout from '../../components/item-description-layout';
import ItemDescription from '../../components/item-description';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import LoadingPage from '../../components/loading-page';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { vocabulary } from '../../vocabulary';
import { translate } from '../../utils';
import Basket from '../basket';
import Navigation from "../../components/navigation";
import ToolsPanel from "../../components/tools-panel";

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
    switchLanguage: useCallback(() => store.actions.language.switch(), [store]),
    // Возврат на первую страницу
    returnToFirstPage: useCallback(() => store.actions.catalog.setCurrentPage(1), [store]),
  };

  return (
    <>
      {(select.status === 'loading' || select.status === 'idle') && <LoadingPage />}
      {select.status === 'fulfilled' && (
        <ItemDescriptionLayout>
          {select.activeModal === 'basket' && <Basket />}
          <Head
            title={select.item.title}
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
          <ItemDescription
            item={select.item}
            onClick={callbacks.addToBasket}
            language={select.language}
            country={translate('itemInfo.country', select.language, vocabulary)}
            category={translate('itemInfo.category', select.language, vocabulary)}
            dateOfIssue={translate('itemInfo.dateOfIssue', select.language, vocabulary)}
            price={translate('itemInfo.price', select.language, vocabulary)}
            buttonTitle={translate('buttons.add', select.language, vocabulary)}
          />
        </ItemDescriptionLayout>
      )}
    </>
  );
}

export default memo(InfoPage);
