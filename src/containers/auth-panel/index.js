import {memo, useCallback} from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import SideLayout from '../../components/side-layout';
import AuthLink from "../../components/auth-link";
import AuthButton from "../../components/auth-button";
import useStore from "../../hooks/use-store";
import {useNavigate} from "react-router-dom";
import useInit from "../../hooks/use-init";

/**
 * Контейнер с панелью авторизациии
 */
function AuthPanel() {

  const store = useStore();

  useInit(
    () => {
      store.actions.profile.checkAuth();
    },
    [],
    true,
  );

  const navigate = useNavigate();

  const select = useSelector(state => ({
    isAuth: state.profile.isAuth,
    name: state.profile.user?.profile?.name || '',
    id: state.profile.user?._id || '',
  }));

  const callbacks = {
    // Выход из личного кабинета
    onExit: useCallback(async() => {
      await store.actions.profile.exit();
      navigate(`/login`);
    }, [store, navigate]),
  };

  // Функция для локализации текстов
  const { t } = useTranslate();

  return (
    <SideLayout side="end">
      <AuthLink isAuth={select.isAuth} name={select.name} loginLink={`/login`} profileLink={`/profile/${select.id}`} />
      <AuthButton t={t} isAuth={select.isAuth} onExit={callbacks.onExit} link={`/login`} />
    </SideLayout>
  );
}

export default memo(AuthPanel);
