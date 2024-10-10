import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import commentsActions from '../../store-redux/comments/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Textarea from "../textarea";

function ReplyWindow({ id, name, theme, onToggleReply, onSubmitReply }) {
  const cn = bem('ReplyWindow');
  const dispatch = useDispatch();
  const params = useParams();

  const [comment, setComment] = useState('');

  // Обработчик изменения поля ввода
  const handleTextareaChange = value => {
    setComment(value); // сохраняем введённое значение в стейте
  };

  // Обработчик отправки формы
  const handleSubmit = async event => {
    event.preventDefault();
    if (comment.trim()) {
      onSubmitReply({ text: comment, parent: { _id: id, _type: 'comment' } }); // вызываем экшен для отправки комментария
      setComment('');
      onToggleReply();
      dispatch(commentsActions.load(params.id));
    }
  };

  return (
    <div className={cn()}>
      <form onSubmit={handleSubmit} className={cn('form')}>
        <span className={cn('title')}>Новый ответ</span>
        <Textarea name={name} theme={theme} onChange={handleTextareaChange} value={comment} />
        <div className={cn('controls')}>
          <button type="submit">Отправить</button>
          <button onClick={onToggleReply}>Отмена</button>
        </div>
      </form>
    </div>
  );
}

export default memo(ReplyWindow);
