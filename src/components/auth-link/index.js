import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function AuthLink({ isAuth, name, loginLink, profileLink }) {
  const cn = bem('AuthLink');
  return (
    isAuth && (
      <div className={cn()}>
        <Link to={isAuth ? loginLink : profileLink}>{name}</Link>
      </div>
    )
  );
}

AuthLink.propTypes = {
  name: PropTypes.string,
  isAuth: PropTypes.bool,
  loginLink: PropTypes.string,
  profileLink: PropTypes.string,
};

export default memo(AuthLink);
