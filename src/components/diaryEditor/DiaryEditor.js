import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import Header from '../header/Header';
import EmotionItem from './components/EmotionItem';
import { DiaryContext } from '../../App';
import { toStringDate } from '../../utile/toStringDate';
import { emotionList } from '../../utile/emotionList';
import './DiaryEditor.scss';

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(toStringDate(new Date()));
  const navigate = useNavigate();
  const { onCreate, onEdit, onRemove } = useContext(DiaryContext);

  

  useEffect(() => {
    if (isEdit) {
      setDate(toStringDate(new Date(originData.date)));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (
      window.confirm(
        isEdit ? '일기를 수정하시겠습니까?' : '새로운 일기를 작성하시겠습니까?'
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
        navigate('/', { replace: true });
      } else {
        onEdit(originData._id, content, emotion, date,navigate);
      }
    }
  };

  const handleRemove = useCallback(() => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onRemove(originData._id,navigate);
    }
  },[]);

  const goBack = useCallback(()=>{
    navigate(-1)
  },[])

  return (
    <div className="DiaryEditor">
      <Header
        headText={isEdit ? '일기 수정하기' : '새 일기쓰기'}
        leftChild={
          <Button
            text="< 뒤로가기"
            onClick={goBack}
          />
        }
        rightChild={
          isEdit && (
            <Button text="삭제" type="negative" onClick={handleRemove} />
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((item) => (
              <EmotionItem
                key={item.emotion_id}
                {...item}
                onClick={handleClickEmote}
                isSelected={item.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              value={content}
              ref={contentRef}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <Button text={'취소하기'} onClick={() => navigate(-1)} />
            <Button text={isEdit ? '수정완료':'저장완료'} type="positive" onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
