import {memo, useEffect } from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import AuthPanel from '../../containers/auth-panel';
import ProfileCard from '../../components/profile-card';
import {useNavigate, useParams} from 'react-router-dom';
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";

/**
 * Страница информации о пользователе
 */
function Profile() {
  const store = useStore();
  const params = useParams();
  const navigate = useNavigate();

  useInit(() => {
    const id = params.id;
    store.actions.profileCard.loadUser(id);
  }, []);

  const select = useSelector(state => ({
    isAuth: state.profile.isAuth,
    waiting: state.profileCard.waiting,
    name: state.profileCard.user?.profile?.name || '',
    phone: state.profileCard.user?.profile?.phone || '',
    email: state.profileCard.user?.email || '',
  }));

  //если пользователь не авторизован - перенаправление на страницу авторизации
  useEffect(() => {
    if (!select.isAuth && select.waiting) {
      navigate('/login');
    }
  }, [select.isAuth]);

  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard t={t} name={select.name} phone={select.phone} email={select.email} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
