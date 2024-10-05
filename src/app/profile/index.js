import { memo, useEffect } from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import AuthPanel from '../../containers/auth-panel';
import ProfileCard from '../../components/profile-card';
import { useNavigate } from 'react-router-dom';

/**
 * Страница информации о пользователе
 */
function Profile() {
  const select = useSelector(state => ({
    waiting: state.article.waiting,
    name: state.profile.user?.profile?.name || '',
    phone: state.profile.user?.profile?.phone || '',
    email: state.profile.user?.email || '',
  }));

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
