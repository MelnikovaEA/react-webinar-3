import StoreModule from '../module';

/**
 * Состояние полученных от АПИ категорий товаров
 */
class CategoryState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      waiting: false,
    };
  }

  /**
   * функция группировки категорий, полученных от АПИ.
   * @param [response] {Array}
   * @return {Array}
   */

  sortCategories(response) {
    const itemMap = new Map();
    let result = [];

    response.forEach(item => {
      item.children = [];
      itemMap.set(item._id, item);
    });

    response.forEach(item => {
      if (item.parent && item.parent._id) {
        const parent = itemMap.get(item.parent._id);
        if (parent) {
          parent.children.push(item);
        }
      } else {
        result.push(item);
      }
    });

    return result;
  }

  /**
   * функция формирования массива категорий для рендера
   * @param [result] {Array}
   * @param [depth] {Number}
   * @param [includeAll] {boolean}
   * @return {Array}
   */
  getCategories (result, depth = 0, includeAll = true) {
    let categories = [];

    // Добавляем "Все" только при первом вызове функции
    if (includeAll) {
      categories.push({ value: '', title: 'Все' });
    }

    result.forEach(item => {
      categories.push({ value: item._id, title: '-'.repeat(depth) + item.title});

      if (item.children.length > 0) {
        categories = categories.concat(this.getCategories(item.children, depth + 1, false));
      }
    });

    return categories;
  }

  /**
   * Загрузка списка категорий из АПИ
   * @returns {Promise<void>}
   */
  async setCategories() {

    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    const items = json.result.items;
    const receivedCategories = this.sortCategories(items);
    const categories = this.getCategories(receivedCategories);

    this.setState(
      {
        ...this.getState(),
        categories: categories,
        waiting: false,
      },
      'Загружен список категорий из АПИ',
    );
  }

}

export default CategoryState;
