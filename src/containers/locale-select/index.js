import { memo, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';

function LocaleSelect() {
  const { _, language, changeLanguage } = useTranslate();

  const options = {
    lang: useMemo(
      () => [
        { value: 'ru', title: 'Русский' },
        { value: 'en', title: 'English' },
      ],
      [],
    ),
  };

  return <Select onChange={changeLanguage} value={language} options={options.lang} />;
}

export default memo(LocaleSelect);
