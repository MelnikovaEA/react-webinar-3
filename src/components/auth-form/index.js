import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Input from '../input';
import { useNavigate } from 'react-router-dom';

function AuthForm( props ) {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.isAuth && props.id) {
      navigate(`/profile/${props.id}`);
    }
  }, [props.isAuth, props.id]);

  const cn = bem('AuthForm');
  return (
    <div className={cn()}>
      <form
        className={cn('form')}
        onSubmit={e => {
          e.preventDefault();
          props.onEnter();
        }}
      >
        <h2 className={cn('header')}>{props.t('auth.title')}</h2>
        <div className={cn('item')}>
          <span className={cn('item-title')}>{props.t('auth.login')}</span>
          <Input
            theme="small"
            value={props.login}
            onChange={props.onSetLogin}
            type="text"
            delay={1000}
          />
        </div>
        <div className={cn('item')}>
          <span className={cn('item-title')}>{props.t('auth.password')}</span>
          <Input
            theme="small"
            value={props.password}
            onChange={props.onSetPassword}
            type="password"
            delay={1000}
          />
        </div>
        {props.error && <div className={cn('error')}>{props.error}</div>}
        <button onClick={props.onEnter}>{props.t('auth.enter')}</button>
      </form>
    </div>
  );
}

AuthForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default memo(AuthForm);
