import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ItemDescriptionLayout({ head, footer, children }) {
  const cn = bem('ItemDescriptionLayout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>{head}</div>
      <div className={cn('center')}>{children}</div>
      <div className={cn('footer')}>{footer}</div>
    </div>
  );
}

ItemDescriptionLayout.propTypes = {
  children: PropTypes.node,
};

export default memo(ItemDescriptionLayout);
