import { memo } from 'react';
import './style.css';

function LoadingPage() {
  return (
    <div className="LoadingPage">
      <div className="LoadingPage-title">Loading...</div>
    </div>
  );
}

export default memo(LoadingPage);
