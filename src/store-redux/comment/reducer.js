// Начальное состояние
export const initialState = {
  data: {
    text: '',
    parent: {
      _id: '',
      _type: '',
    },
  },
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comment/reply-start':
      return { ...state, data: initialState.data, waiting: true };

    case 'comment/reply-success':
      return { ...state, waiting: false };

    case 'comment/reply-error':
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
