import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { vocabulary } from '../../vocabulary';
import { translate } from '../../utils';

function Basket() {
  const store = useStore();

  const select = useSelector(state => ({
    language: state.language.current,
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return (
          <ItemBasket
            item={item}
            onRemove={callbacks.removeFromBasket}
            onClick={callbacks.closeModal}
            route="/item/"
            buttonTitle={translate('buttons.delete', select.language, vocabulary)}
            qtyTitle={translate('itemInfo.qty', select.language, vocabulary)}
          />
        );
      },
      [callbacks.removeFromBasket, select.language],
    ),
  };

  return (
    <ModalLayout
      title={translate('pages.basket', select.language, vocabulary)}
      onClose={callbacks.closeModal}
      buttonTitle={translate('buttons.close', select.language, vocabulary)}
    >
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal
        sum={select.sum}
        title={translate('basketInfo.totalPrice', select.language, vocabulary)}
      />
    </ModalLayout>
  );
}

export default memo(Basket);
