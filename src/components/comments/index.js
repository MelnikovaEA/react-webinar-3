import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import './style.css';
import { Link } from 'react-router-dom';
import Comment from '../comment';

function Comments(props) {
  const cn = bem('Comments');
  const { t } = useTranslate();

  const renderComments = (items) => {
    return items.map(item => {
      return <div className={'item'} data-level={item.level} key={item.dateCreate} style={{paddingLeft: `${item.level * 30}px`}}>
        <Comment
          key={item.dateCreate}
          name={item.author || 'anonymous'}
          dateCreate={item.dateCreate}
          text={item.text}
          style={{paddingLeft: `${item.level * 10}px`}}
        />
      </div>
    })
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <span>{t('comments.title')}</span>
        <span>{` (${props.comments.count || 0})`}</span>
      </div>
      <section className={cn('body')}>
        {props.comments.items && renderComments(props.comments.items)}
      </section>
      <p>
        <Link to={'/login'}>Войдите</Link>, чтобы иметь возможность ответить. <span>Отмена</span>
      </p>
    </div>
  );
}

Comments.propTypes = {
  // sum: PropTypes.number,
  // t: PropTypes.func,
};

export default memo(Comments);
