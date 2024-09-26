import StoreModule from '../module';

class ItemInfo extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      item: {},
      status: 'idle',
    };
  }

  //функция загрузки определенного товара с API по _id
  async loadItem(_id) {
    this.setState(
      {
        ...this.getState(),
        status: 'loading'
      }, 'Загрузка товара...');

    const response = await fetch(
      `/api/v1/articles/${_id}?fields=_id, title, price, description, edition, madeIn(title,code),category(title)`,
    );
    const json = await response.json();
    this.setState(
      {
        item: json.result,
        status: 'fulfilled',
      },
      'Загружена информация о товаре из АПИ',
    );
  }

  //функция очистки состояния
 resetItem() {
    this.setState(this.initState(), 'Сброс состояния товара');
  }
}

export default ItemInfo;
