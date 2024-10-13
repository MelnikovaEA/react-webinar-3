export default {
  /**
   * Загрузка комментариев для товара
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущего стека комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Комментарии загружены успешно
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },
  /**
   * Ответ на комментарий
   * @param data
   * @return {Function}
   */
  reply: (data) => {
    return async (dispatch, getState, services) => {

      dispatch({ type: 'comments/reply-start' });

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

        console.log(response);

        dispatch({ type: 'comments/reply-success', payload: { data: response.data.result } });
      } catch (error) {
        dispatch({ type: 'comments/reply-error', payload: { error: error.message } });
      }
    };
  },
};
