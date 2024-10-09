import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import dateFormat from '../../utils/date-format';
import './style.css';
import { Link } from 'react-router-dom';
import ReplyWindow from '../reply-window';

function Comment({ id, name, dateCreate, text, session, isVisible, onToggleReply }) {
  const cn = bem('Comment');
  const { t } = useTranslate();

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
              onToggleReply={onToggleReply}
              theme="fullWidth"
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

Comment.propTypes = {
  // sum: PropTypes.number,
  // t: PropTypes.func,
};

export default memo(Comment);
