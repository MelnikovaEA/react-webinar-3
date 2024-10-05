import {memo, useCallback} from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import AuthPanel from "../../containers/auth-panel";
import AuthForm from "../../components/auth-form";
import useStore from "../../hooks/use-store";

/**
 * Страница авторизации
 */
function Authentication() {
  const store = useStore();

  const select = useSelector(state => ({
    waiting: state.profile.waiting,
    login: state.profile.login,
    password: state.profile.password,
    error: state.profile.error,
    isAuth: state.profile.isAuth,
    id: state.profile.user?._id || '',
  }));

  const callbacks = {
    // Ввод логина
    onSetLogin: useCallback(login => store.actions.profile.setLogin(login), [store]),
    // Ввод пароля
    onSetPassword: useCallback(password => store.actions.profile.setPassword(password), [store]),
    // Попытка авторизации
    onEnter: useCallback(() => store.actions.profile.enter(), [store]),
    // Очистить сообщение об ошибке
    cleanErrorMessage: useCallback(() => store.actions.profile.cleanError(), [store])
  };

  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
          <AuthForm
            t={t}
            onSetLogin={callbacks.onSetLogin}
            onSetPassword={callbacks.onSetPassword}
            onEnter={callbacks.onEnter}
            cleanErrorMessage={callbacks.cleanErrorMessage}
            login={select.login}
            password={select.password}
            error={select.error}
            isAuth={select.isAuth}
            id={select.id}
          />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Authentication);
