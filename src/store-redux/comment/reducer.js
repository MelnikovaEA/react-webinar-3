// Начальное состояние
export const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
  error: null
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comment/reply-start':
      return { ...state, data: {}, waiting: true };

    case 'comment/reply-success':
      return { ...state, waiting: false };

    case 'comment/reply-error':
      return { ...state, data: {}, waiting: false, error: action.payload.error };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
