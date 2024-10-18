import { useEffect, useState } from 'react';
import useServices from '../hooks/use-services';

export default function useTranslate() {
  const { i18n, api } = useServices();
  const [language, setLanguage] = useState(i18n.currentLanguage);

  // Слушаем изменения языка
  useEffect(() => {
    const updateLanguage = newLang => {
      setLanguage(newLang);
    };

    i18n.subscribe(updateLanguage); // Подписываемся на изменения языка

    return () => {
      i18n.unsubscribe(updateLanguage); // Отписываемся при размонтировании
    };
  }, [i18n]);

  const t = (text, plural) => i18n.translate(text, plural);

  const changeLanguage = newLang => {
    i18n.setLanguage(newLang);
    api.setHeader('Accept-Language', newLang);
  };

  return { t, language, changeLanguage };
}
