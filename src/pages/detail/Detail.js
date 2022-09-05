import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import Header from '../../components/header/Header';
import { emotionList } from '../../utile/emotionList';
import { toStringDate } from '../../utile/toStringDate';
import './Detail.scss';

const Detail = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getDiaryDetail();
  }, []);

  const getDiaryDetail = async () => {
    let res = await fetch(`http://localhost:8000/diary/${id}`);
    try {
      let result = await res.json();
      setData(result);
    } catch (err) {
      alert('없는 일기입니다.');
      navigate('/', { replace: true });
    }
  };

  if (!data) {
    return <div>로딩중 입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (item) => parseInt(item.emotion_id) === parseInt(data.emotion)
    );

    return (
      <div className="Detail">
        <Header
          headText={`${toStringDate(new Date(data.date))} 기록`}
          leftChild={<Button text="< 뒤로가기" onClick={() => navigate('/')} />}
          rightChild={
            <Button
              text="수정하기"
              onClick={() => navigate(`/edit/${data._id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                'emotion_img_wrapper',
                `detail_img_${curEmotionData.emotion_id}`,
              ].join(' ')}
            >
              <img alt="emotion_img" src={curEmotionData.emotion_img} />
              <div>{curEmotionData.emotion_description}</div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Detail;
