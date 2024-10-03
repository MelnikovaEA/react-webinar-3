import StoreModule from '../module';

/**
 * Информация о пользователе и авторизации
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      login: '',
      password: '',
      isAuth: false,
      //token: '',
      error: '',
      waiting: false,
      user: {},
    };
  }

  /**
   * Установка логина
   * @param login {String}
   */
  setLogin(login) {
    this.setState(
      {
        ...this.getState(),
        login: login,
      },
      'Установка логина',
    );
  }

  /**
   * Установка пароля
   * @param password {String}
   */
  setPassword(password) {
    this.setState(
      {
        ...this.getState(),
        password: password,
      },
      'Установка пароля',
    );
  }

  // сохранение данных после успешной авторизации
  setSuccessData(data) {
    this.setState(
      {
        ...this.getState(),
        user: data,
        isAuth: true,
        waiting: false,
      },
      'Авторизация успешна',
    );
  }

  // сохранение информации об ошибке в случае неудачной попытки авторизации
  setErrorData(error) {
    this.setState(
      {
        ...this.getState(),
        isAuth: false,
        error: error.message,
        waiting: false,
      },
      'Ошибка авторизации',
    );
  }

  /**
   * Проверка авторизации по токену
   * @return {Promise<void>}
   */
  async checkAuth() {
    const token = localStorage.getItem('authToken');

    if (!token) return;

    try {
      const response = await fetch(`/api/v1/users/self?fields=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });

      const data = await response.json();

      this.setSuccessData(data.result);
      console.log('Авторизация по токену успешна');
    } catch (error) {
      this.setErrorData(error);
    }
  }

  /**
   * Выход из учетной записи и сброс токена
   * @return {Promise<void>}
   */
  async exit() {
    // проверка хранится ли в local storage токен
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const response = await fetch(`/api/v1/users/sign`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-Token': token,
          },
        });

        // удаляем токен из local storage
        localStorage.removeItem('authToken');
        // возвращаем стейт к начальному состоянию
        this.setState(this.initState(), 'Выход выполнен');
      } catch (error) {
        this.setErrorData(error);
      }
    }
  }

  /**
   * Авторизация по логину и паролю
   * @return {Promise<void>}
   */
  async enter() {
    const { login, password } = this.getState();

    // сброс сообщений о предыдущих ошибках
    this.setState(
      {
        ...this.getState(),
        waiting: true,
        error: '',
      },
      'Начало авторизации',
    );

    // ошибка если не введены логин или пароль
    if (!login || !password) {
      this.setState(
        {
          ...this.getState(),
          error: 'Логин и пароль обязательны.',
          waiting: false,
        },
        'Валидация не пройдена',
      );
      return;
    }

    // запрос к АПИ
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        throw new Error('Ошибка авторизации');
      }

      const data = await response.json();

      // Сохраняем токен в localStorage
      localStorage.setItem('authToken', data.result.token);

      // Вход выполнен успешно
      this.setSuccessData(data.result.user);
    } catch (error) {
      // Ошибка при загрузке
      this.setErrorData(error);
    }
  }
}

export default ProfileState;
