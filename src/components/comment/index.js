import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useTranslate from "../../hooks/use-translate";
import './style.css';

function Comment({ name, dateCreate, key, text }) {
  const cn = bem('Comment');
  const { t } = useTranslate();

  return (
    <div className={cn()}>
      <div>
        <span className={cn('author')}>{name}</span>
        <span className={cn('dateCreate')}>{dateCreate}</span>
      </div>
      <article className={cn('text')}>{text}</article>
      <div className={cn('action')}>Ответить</div>
    </div>
  );
}

Comment.propTypes = {
  // sum: PropTypes.number,
  // t: PropTypes.func,
};

export default memo(Comment);
