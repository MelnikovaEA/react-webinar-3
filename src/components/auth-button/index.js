import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import {useNavigate} from "react-router-dom";

function AuthButton({ link, t, isAuth, onExit }) {
  const cn = bem('AuthButton');
  const navigate = useNavigate();

  return (
    <div className={cn()}>
      {isAuth ? (
        <button onClick={onExit}>{t('auth.exit')}</button>
      ) : (
        <button onClick={() => navigate(link)}>{t('auth.enter')}</button>
      )}
    </div>
  );
}

AuthButton.propTypes = {
  t: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  onExit: PropTypes.func.isRequired,
};

export default memo(AuthButton);
