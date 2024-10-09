import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import './style.css';
import { Link } from 'react-router-dom';
import Comment from '../comment';

function Comments(props) {
  const cn = bem('Comments');
  const { t } = useTranslate();

  const [visibleCommentId, setVisibleCommentId] = useState(null); // Хранит id видимого комментария

  const toggleReplyWindow = (id) => {
    setVisibleCommentId((prevId) => (prevId === id ? null : id)); // Переключает видимость окна ответа
  };

  const renderComments = items => {
    return items.map(item => {
      return (
        <div
          className={cn('item')}
          key={item.dateCreate}
          style={{ paddingLeft: `${item.level * 30}px` }}
        >
          <Comment
            id={item._id}
            key={item.dateCreate}
            name={item.author || 'anonymous'}
            dateCreate={item.dateCreate}
            text={item.text}
            style={{ paddingLeft: `${item.level * 10}px` }}
            session={props.session}
            isVisible={visibleCommentId === item.dateCreate} // Передает состояние видимости
            onToggleReply={() => toggleReplyWindow(item.dateCreate)}
          />
        </div>
      );
    });
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <span>{t('comments.title')}</span>
        <span>{` (${props.comments.count || 0})`}</span>
      </div>
      <section className={cn('body')}>
        {props.comments.items && renderComments(props.comments.items)}
      </section>
      {visibleCommentId === null && (
        <div className={cn('footer')}>
          <p className={cn('link')}>
            <Link to={'/login'}>Войдите</Link>, чтобы иметь возможность комментировать
          </p>
        </div>
      )}
    </div>
  );
}

Comments.propTypes = {
  // sum: PropTypes.number,
  // t: PropTypes.func,
};

export default memo(Comments);
