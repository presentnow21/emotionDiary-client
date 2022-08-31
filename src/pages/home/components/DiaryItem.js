import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import './DiaryItem.scss';

const DiaryItem = ({ _id, emotion, content, date }) => {
  const navigate = useNavigate();

  const strDate = new Date(parseInt(date)).toLocaleDateString();
  const goToDetail = () => {
    navigate(`/detail/${_id}`);
  };

  const goToEdit = () => {
    navigate(`/edit/${_id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goToDetail}
        className={[
          'emotion_img_wrapper',
          `emotion_img_wrapper_${emotion}`,
        ].join(' ')}
      >
        <img
          alt="emotion_img"
          src={process.env.PUBLIC_URL + `/assets/emotion${emotion}.png`}
        />
      </div>
      <div className="info_wrapper" onClick={goToDetail}>
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <Button text="수정하기" onClick={goToEdit} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
