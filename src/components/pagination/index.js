import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import PaginationItem from '../pagination-item';
import { createPaginationScheme } from '../../utils';

function Pagination({ pagesCount, currentPage, onClick }) {
  const pages = createPaginationScheme(pagesCount, currentPage);

  return (
    <div className="Pagination">
      {pages.map((page, index) => (
        <PaginationItem key={index} page={page} currentPage={currentPage} onClick={onClick} />
      ))}
    </div>
  );
}

Pagination.propTypes = {
  pagesCount: PropTypes.number,
  currentPage: PropTypes.number,
  onClick: PropTypes.func,
};

export default memo(Pagination);
