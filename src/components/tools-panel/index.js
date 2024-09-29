import React, { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ToolsPanel({ children }) {
  const cn = bem('ToolsPanel');

  return <div className={cn()}>{children}</div>;
}

export default memo(ToolsPanel);
