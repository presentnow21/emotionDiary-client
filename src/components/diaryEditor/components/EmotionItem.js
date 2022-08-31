import React from 'react';
import './EmotionItem.scss';

const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_description,
  onClick,
  isSelected,
}) => {
  return (
    <div
      className={[
        'EmotionItem',
        isSelected ? `EmotionItem_on${emotion_id}` : `EmotionItem_off`,
      ].join(' ')}
      onClick={() => {
        onClick(emotion_id);
      }}
    >
      <img alt="emotion_img" src={emotion_img} />
      <span>{emotion_description}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
