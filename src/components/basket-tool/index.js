import { memo } from 'react';
import PropTypes from 'prop-types';
import Navigation from "../navigation";
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import {vocabulary} from "../../vocabulary";

function BasketTool({ sum, amount, language, onOpen = () => {}, onReturn = () => {} }) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <Navigation className={cn('nav')} onClick={onReturn} to="/" language={language}>
        {vocabulary.links.main[language]}
      </Navigation>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${numberFormat(sum)} ₽`
          : `пусто`}
      </span>
      <button className={cn('button')} onClick={onOpen}>
        {vocabulary.buttons.go[language]}
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
