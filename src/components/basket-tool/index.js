import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';

function BasketTool({ sum, amount, language, buttonTitle, infoEmpty, text, onOpen = () => {} }) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{`${text}: `}</span>
      <span className={cn('total')}>
        {!amount ? infoEmpty : language === 'ru'
            ? `${amount} ${plural(amount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${numberFormat(sum)} ₽`
       : `${amount} ${plural(amount, {
        one: 'piece',
        other: 'pieces',
      }, 'en-US')} / ${numberFormat(sum)} ₽`}
      </span>
      <button className={cn('button')} onClick={onOpen}>
        {buttonTitle}
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  buttonTitle: PropTypes.string,
  language: PropTypes.string,
  infoEmpty: PropTypes.string,
  text: PropTypes.string,
};

export default memo(BasketTool);
