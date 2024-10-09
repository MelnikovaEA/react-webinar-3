import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import dateFormat from '../../utils/date-format';
import './style.css';
import { Link } from 'react-router-dom';
import ReplyWindow from '../reply-window';
import {useDispatch} from "react-redux";
import commentActions from '../../store-redux/comment/actions';

function Comment({ id, name, dateCreate, text, session, isVisible, onToggleReply }) {
  const cn = bem('Comment');
  const { t } = useTranslate();

  const dispatch = useDispatch();

  // Функция для отправки комментария
  const handleReplySubmit = (data) => {
    dispatch(commentActions.reply(data)); // Отправляем комментарий через Redux action
  };

  return (
    <div className={cn()}>
      <div>
        <span className={cn('author')}>{name}</span>
        <span className={cn('dateCreate')}>
          {dateFormat(dateCreate).fullDate} в {dateFormat(dateCreate).time}
        </span>
      </div>
      <article className={cn('text')}>{text}</article>
      <div className={cn('action')} onClick={() => onToggleReply(id)}>
        Ответить
      </div>
      {isVisible &&
        (session ? (
          <div className={cn('reply')}>
            <ReplyWindow
              id={id}
              onToggleReply={onToggleReply}
              theme="fullWidth"
              onSubmitReply={handleReplySubmit}
            />
          </div>
        ) : (
          <div className={cn('reply')}>
            <p className={cn('link')}>
              <Link to={'/login'}>Войдите</Link>, чтобы иметь возможность ответить.{' '}
              <span onClick={onToggleReply}>Отмена</span>
            </p>
          </div>
        ))}
    </div>
  );
}

export default memo(Comment);
