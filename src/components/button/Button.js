import React from 'react';
import './Button.scss';

const Button = ({ text, onClick, type }) => {
  const btnType = ['positive', 'negative'].includes(type) ? type : 'default';

  return (
    <button
      className={['Button', `btn_${btnType}`].join(' ')}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default React.memo(Button);
