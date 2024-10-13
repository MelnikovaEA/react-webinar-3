import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import dateFormat from '../../utils/date-format';
import './style.css';
import { Link, useLocation } from 'react-router-dom';
import ReplyWindow from '../reply-window';

function Comment({ id, name, dateCreate, text, session, isVisible, onToggleReply, onSubmit, userId }) {
  const cn = bem('Comment');
  const { t } = useTranslate();
  const location = useLocation();

  return (
    <div className={cn()}>
      <div>
        <span className={cn('author')}>{name}</span>
        <span className={cn('dateCreate')}>
          {dateFormat(dateCreate).day} {t(dateFormat(dateCreate).month)}{' '}
          {dateFormat(dateCreate).year} {t('prepositions.atTime')} {dateFormat(dateCreate).time}
        </span>
      </div>
      <article className={cn('text')}>{text}</article>
      <div className={cn('action')} onClick={() => onToggleReply(id)}>
        {t('comments.reply')}
      </div>
      {isVisible &&
        (session ? (
          <div className={cn('reply')}>
            <ReplyWindow
              id={id}
              onToggleReply={onToggleReply}
              theme="medium"
              placeholder={`Мой ответ для ${name}`}
              onSubmitReply={onSubmit}
              userId={userId}
            />
          </div>
        ) : (
          <div className={cn('reply')}>
            <p className={cn('link')}>
              <Link to={'/login'} state={{ back: location.pathname }}>
                {t('comments.enter')}
              </Link>
              , {t('comments.toBeAbleAnswer')}.{' '}
              <span onClick={onToggleReply}>{t('comments.cancel')}</span>
            </p>
          </div>
        ))}
    </div>
  );
}

export default memo(Comment);
