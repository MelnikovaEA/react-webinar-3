import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Navigation({ onClick, title }) {
  const cn = bem('Navigation');

  return (
    <div className={cn()}>
      <Link className={cn('item')} onClick={onClick} to="/">
        {title}
      </Link>
    </div>
  );
}

Navigation.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
};

export default memo(Navigation);
