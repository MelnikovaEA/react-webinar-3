import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Select(props) {
  const [isOpen, setIsOpen] = useState(false);

  const onSelect = (value) => {
    props.onChange(value);
    setIsOpen(false);
  };

  const toggleList = () => {
    setIsOpen(prev => !prev);
  };

  const cn = bem('Select');

  return (
    <div className={cn()} style={props.style}>
      <div className={cn('main')} onClick={toggleList}>
        {props.options.find(item => item.value === props.value)?.title || props.options[0]?.title}
      </div>
      {isOpen && (
        <ul className={cn('list')}>
          {props.options.map(item => (
            <li key={item.value} onClick={() => onSelect(item.value)}>
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf({}).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  style: PropTypes.object,
};

export default memo(Select);
