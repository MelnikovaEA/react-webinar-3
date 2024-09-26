import StoreModule from '../module';

class Languages extends StoreModule {
  initState() {
    return {
      current: 'ru',
    };
  }

  switch() {
    const currentLanguage = this.store.getState().language.current === 'ru' ? 'en' : 'ru';
    this.setState({ current: currentLanguage }, `Смена языка интерфейса`);
  }

}

export default Languages;
