import {memo, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
//import './style.css';
import PageLayout from "../page-layout";
import Input from "../input";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";

function AuthForm({ t }) {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    login: state.profile.login,
    password: state.profile.password,
    error: state.profile.error,
    isAuth: state.profile.isAuth,
    id: state.profile.user?._id || ''
  }));

  useEffect(() => {
    if(select.isAuth && select.id){
      navigate(`/profile/${select.id}`)
    }
  }, [select.isAuth, select.id]);

  const callbacks = {
    // Ввод логина
    onSetLogin: useCallback(login => store.actions.profile.setLogin(login), [store]),
    // Ввод пароля
    onSetPassword: useCallback(password => store.actions.profile.setPassword(password), [store]),
    // Попытка авторизации
    onEnter: useCallback(
      () => store.actions.profile.enter(), [store],),
  };

  const cn = bem('Input');
  return (
    <PageLayout>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          callbacks.onEnter();
        }}
      >
        <header>Вход</header>
        <Input
          value={select.login}
          onChange={callbacks.onSetLogin}
          placeholder={'Логин'}
          type='text'
          delay={1000}
        />
        <Input
          value={select.password}
          onChange={callbacks.onSetPassword}
          placeholder={'Пароль'}
          type='password'
          delay={1000}
        />
      </form>
      <button onClick={callbacks.onEnter}>{t('auth.enter')}</button>
      <div>{select.error}</div>
    </PageLayout>
  );
}

AuthForm.propTypes = {
  t: PropTypes.func.isRequired,
};


export default memo(AuthForm);
