export default {
  /**
   * Ответ на комментарий
   * @param data
   * @return {Function}
   */
  reply: (data) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего стека комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comment/reply-start' });

     try {
       const response = await services.api.request({
         url: `/api/v1/comments`,
         method: 'POST',
         body: JSON.stringify({
           text: data.text,
           parent: {
             _id: data.parent._id,
             _type: data.parent._type,
           },
         }),
       });

       dispatch({ type: 'comment/reply-success' });
     } catch (error) {
       dispatch({ type: 'comment/reply-error', payload: { error: error.message } });
     }
    };
  },
};
