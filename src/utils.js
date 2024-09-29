/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}


/**
 * Вычисление данных для рендера пагинации
 * @param pagesCount {Number}
 * @param currentPage {Number}
 * @returns {Array}
 */
export const createPaginationScheme = (pagesCount, currentPage) => {
  const pages = [];

  pages.push(1);

  if (currentPage === 1) {
    pages.push(2);
    pages.push(3);
  }

  if (currentPage > 3) {
    pages.push('...');
  }

  if (currentPage > 2) {
    pages.push(currentPage - 1);
  }
  if (currentPage > 1 && currentPage < pagesCount) {
    pages.push(currentPage);
  }
  if (currentPage < pagesCount - 1 && currentPage !== 1) {
    pages.push(currentPage + 1);
  }

  if (currentPage < pagesCount - 2) {
    pages.push('...');
  }

  if (pagesCount > 1) {
    pages.push(pagesCount);
  }

  return pages;
};

/**
 * Получение текста в зависимости от текущего языка приложения
 * @param key {String}
 * @param lang {String}
 * @param database {Object}
 * @returns {String}
 */
export const translate = (key, lang, database) => {

  const keys = key.split('.');
  let text = database;

  for (let k of keys) {
    if (text[k] !== undefined) {
      text = text[k];
    } else {
      return key;
    }
  }

  return text[lang] || '';
};
