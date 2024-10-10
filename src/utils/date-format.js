/**
 * Получение данных даты из формата ISO
 * @param value {String}
 * @returns {Object}
 */

export default function dateFormat(value) {
  const date = new Date(value);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.getMonth().toString();
  const year = date.getFullYear();
  const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

  return {
    day,
    month,
    year,
    time,
  };
}
