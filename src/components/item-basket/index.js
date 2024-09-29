import { memo } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link
          to={`${props.route}${props.item._id}`}
          className={cn('title-link')}
          onClick={() => props.onClick()}
        >
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)} {props.qtyTitle}
        </div>
        <div className={cn('cell')}>
          <button onClick={() => props.onRemove(props.item._id)}>{props.buttonTitle}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  route: PropTypes.string,
  onRemove: propTypes.func,
  onClick: propTypes.func,
  buttonTitle: PropTypes.string,
  qtyTitle: PropTypes.string,
};

export default memo(ItemBasket);
