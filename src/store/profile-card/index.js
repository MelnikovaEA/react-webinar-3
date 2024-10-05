import StoreModule from '../module';

/**
 * Информация о пользователе
 */
class ProfileCardState extends StoreModule {
  initState() {
    return {
      user: {},
      error: '',
      waiting: false,
    };
  }

  /**
   * Загрузка данных профиля пользователя по ID
   * @param userId {String}
   */
  async loadUser(userId) {

    // сброс сообщений о предыдущих ошибках
    this.setState(
      {
        ...this.getState(),
        waiting: true,
        error: '',
      },
      'Начало загрузки данных',
    );

    const token = localStorage.getItem('authToken');

    try {
      const response = await fetch(`/api/v1/users/${userId}?fields=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw data.error;
      }

      this.setState(
        {
          ...this.getState(),
          user: data.result,
          waiting: false,
        },
        'Данные о пользователе загружены',
      );
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          error: error?.data?.issues[0]?.message || 'Ошибка загрузки данных',
          waiting: false,
        },
        'Ошибка загрузки данных',
      );
    }
  }

 resetUser() {
   document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
   this.setState(this.initState());
  }
}

export default ProfileCardState;
