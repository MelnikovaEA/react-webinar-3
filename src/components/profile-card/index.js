import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard({ name, phone, email, t }) {
  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <h2 className={cn('description')}>{t('profile.title')}</h2>
      <div className={cn('prop')}>
        <div className={cn('label')}>{`${t('profile.name')}: `}</div>
        <div className={cn('value')}>{name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{`${t('profile.phone')}: `}</div>
        <div className={cn('value')}>{phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{`${t('profile.email')}: `}</div>
        <div className={cn('value')}>{email}</div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  t: PropTypes.func,
};

export default memo(ProfileCard);
