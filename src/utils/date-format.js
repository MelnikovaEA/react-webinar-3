/**
 * Получение данных даты из формата ISO
 * @param value {String}
 * @returns {Object}
 */

const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export default function dateFormat(value) {
  const date = new Date(value);
  const fullDate = `${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()} `;
  const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

  return {
    fullDate,
    time,
  };
}
