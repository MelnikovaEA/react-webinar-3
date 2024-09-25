import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function PaginationItem(props) {
  return (
    <div
      className={`PaginationItem
      ${props.page === props.currentPage ? 'PaginationItem_selected' : ''}
      ${props.page === '...' ? 'PaginationItem_disabled' : ''}`}
      onClick={() => props.onClick(props.page)}
    >
      <span>{props.page}</span>
    </div>
  );
}

PaginationItem.propTypes = {
  page: PropTypes.number || PropTypes.string,
  currentPage: PropTypes.number,
  onClick: PropTypes.func,
};

export default memo(PaginationItem);
