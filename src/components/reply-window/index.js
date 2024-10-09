import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Input from '../input';

function ReplyWindow({ name, theme, onToggleReply }) {
  const cn = bem('ReplyWindow');

  return (
    <div className={cn()}>
      <form onSubmit={()=>{}} className={cn('form')}>
        <span className={cn('title')}>Новый ответ</span>
        <Input
          name={name}
          theme={theme}
          onChange={()=>{}}
        />
        <div className={cn('controls')}>
          <button onSubmit={()=>{}}>Отправить</button>
          <button onClick={onToggleReply}>Отмена</button>
        </div>
      </form>
    </div>
  );
}

ReplyWindow.propTypes = {
  data: PropTypes.object.isRequired,
};

export default memo(ReplyWindow);
