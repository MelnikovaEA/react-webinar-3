import { memo } from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import { cn as bem } from '@bem-react/classname';
import './style.css';
import {vocabulary} from "../../vocabulary";

function Navigation({language, onClick}) {
  const cn = bem('Navigation');

  return (
    <div className={cn()}>
      <Link className={cn('item')} onClick={onClick} to="/" >
        {vocabulary.links.main[language]}
      </Link>
    </div>
  );
}

Navigation.propTypes = {
  onClick: PropTypes.func,
  language: PropTypes.string.isRequired,
};

export default memo(Navigation);
