import { memo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Input from '../input';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';

function AuthForm({ t }) {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    login: state.profile.login,
    password: state.profile.password,
    error: state.profile.error,
    isAuth: state.profile.isAuth,
    id: state.profile.user?._id || '',
  }));

  useEffect(() => {
    if (select.isAuth && select.id) {
      navigate(`/profile/${select.id}`);
    }
  }, [select.isAuth, select.id]);

  const callbacks = {
    // Ввод логина
    onSetLogin: useCallback(login => store.actions.profile.setLogin(login), [store]),
    // Ввод пароля
    onSetPassword: useCallback(password => store.actions.profile.setPassword(password), [store]),
    // Попытка авторизации
    onEnter: useCallback(() => store.actions.profile.enter(), [store]),
  };

  const cn = bem('AuthForm');
  return (
    <div className={cn()}>
      <form
        className={cn('form')}
        onSubmit={e => {
          e.preventDefault();
          callbacks.onEnter();
        }}
      >
        <h2 className={cn('header')}>{t('auth.title')}</h2>
        <div className={cn('item')}>
          <span className={cn('item-title')}>{t('auth.login')}</span>
          <Input
            theme="small"
            value={select.login}
            onChange={callbacks.onSetLogin}
            type="text"
            delay={1000}
          />
        </div>
        <div className={cn('item')}>
          <span className={cn('item-title')}>{t('auth.password')}</span>
          <Input
            theme="small"
            value={select.password}
            onChange={callbacks.onSetPassword}
            type="password"
            delay={1000}
          />
        </div>
        {select.error && <div className={cn('error')}>{select.error}</div>}
        <button onClick={callbacks.onEnter}>{t('auth.enter')}</button>
      </form>
    </div>
  );
}

AuthForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default memo(AuthForm);
