import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DiaryEditor from '../../components/diaryEditor/DiaryEditor';

const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const getDiaryItem = async () => {
    try {
      let res = await fetch(`http://localhost:8000/diary/${id}`);
      let result = await res.json();
      setOriginData(result);
    } catch (err) {
      alert('데이터를 불러오지 못했습니다.\n 다시 시도해주세요');
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    getDiaryItem();
  }, []);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
