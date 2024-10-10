// Начальное состояние
export const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
  error: null,
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: {}, waiting: true };

    case 'comments/load-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'comments/load-error':
      return { ...state, data: {}, waiting: false, error: action.payload.error }; //текст ошибки может понадобиться для
      // вывода сообщения об ошибке

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
