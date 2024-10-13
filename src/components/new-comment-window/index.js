import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { useParams } from 'react-router-dom';
import Textarea from '../textarea';
import useTranslate from '../../hooks/use-translate';

function NewCommentWindow({ name, placeholder, theme, onSubmitReply }) {
  const cn = bem('NewCommentWindow');
  const params = useParams();
  const { t } = useTranslate();

  const [comment, setComment] = useState('');

  // Обработчик изменения поля ввода
  const handleTextareaChange = value => {
    setComment(value); // сохраняем введённое значение в стейте
  };

  // Обработчик отправки формы
  const handleSubmit = async event => {
    event.preventDefault();
    if (comment.trim()) {
      onSubmitReply({ text: comment, parent: { _id: params.id, _type: 'article' } }); // вызываем экшен для отправки комментария
      setComment('');
    }
  };

  return (
    <div className={cn()}>
      <form onSubmit={handleSubmit} className={cn('form')}>
        <span className={cn('title')}>{t('comments.newComment')}</span>
        <Textarea name={name} theme={theme} placeholder={placeholder} onChange={handleTextareaChange} value={comment} />
        <div className={cn('controls')}>
          <button type="submit" disabled={!comment} className={!comment ? cn('disabled') : ''}>{t('comments.send')}</button>
        </div>
      </form>
    </div>
  );
}

export default memo(NewCommentWindow);
