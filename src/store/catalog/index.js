import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      pageSize: 10,
      totalItemsCount: 0,
      totalPagesCount: 0,
      currentPage: 1,
    };
  }

  async load() {
    const response = await fetch(
      `/api/v1/articles?limit=${this.getState().pageSize}&skip=${(this.getState().currentPage - 1) * 10}&fields=items(_id, title, price),count`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalItemsCount: json.result.count,
        totalPagesCount: Math.ceil(json.result.count / this.getState().pageSize),
      },
      'Загружены товары из АПИ',
    );
  }

  setCurrentPage(page) {
    this.setState(
      {
        ...this.getState(),
        currentPage: page,
      },
      'Выбрана другая страница товаров',
    );
  }
}

export default Catalog;
