/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cart: {
        list: [],
        sum: 0,
        qty: 0,
      },
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   */
  addItem(code) {
    const newItem = this.state.list.find(item => item.code === code);
    const isInCart = this.state.cart.list.find(item => item.code === newItem.code);

    let updatedCart = { ...this.state.cart };

    if (!isInCart) {
      updatedCart.list = [...updatedCart.list, { ...newItem, qty: 1 }];
    } else {
      updatedCart.list = updatedCart.list.map(item =>
        item.code === newItem.code ? { ...item, qty: item.qty + 1 } : item,
      );
    }

    //подсчет количества уникальных товаров в корзине
    updatedCart.qty = updatedCart.list.length;
    //подсчет реального количества товара в корзине
    //updatedCart.qty = updatedCart.list.reduce((acc, item) => acc + item.qty, 0);
    updatedCart.sum = updatedCart.list.reduce((acc, item) => acc + item.qty * item.price, 0);

    this.setState({
      ...this.state,
      cart: updatedCart,
    });
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItem(code) {
    const deletedItem = this.state.cart.list.find(item => item.code === code);

    let updatedCart = { ...this.state.cart };
    updatedCart.list = updatedCart.list.filter(item => item.code !== deletedItem.code);
    updatedCart.qty = updatedCart.list.length;
    //updatedCart.qty = updatedCart.list.reduce((acc, item) => acc + item.qty, 0);
    updatedCart.sum = updatedCart.list.reduce((acc, item) => acc + item.qty * item.price, 0);

    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: updatedCart,
    });
  }
}

export default Store;
