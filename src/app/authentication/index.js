import { memo } from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import AuthPanel from "../../containers/auth-panel";
import AuthForm from "../../components/auth-form";

/**
 * Страница авторизации
 */
function Authentication() {
  const select = useSelector(state => ({
    waiting: state.article.waiting,
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
        <AuthForm t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Authentication);
