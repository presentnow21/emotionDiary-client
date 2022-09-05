import React, { useContext, useEffect, useState, useCallback } from 'react';
import { DiaryContext } from '../../App';
import Button from '../../components/button/Button';
import Header from '../../components/header/Header';
import DiaryList from './components/DiaryList';

const Home = () => {
  const diaryList = useContext(DiaryContext).data;
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const nowDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;

  useEffect(() => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    setData(
      diaryList.filter((item) => item.date >= firstDay && item.date <= lastDay)
    );
  }, [date, diaryList]);

  const decreaseDate = useCallback(() => {
    setDate((date) => {
      return new Date(date.getFullYear(), date.getMonth() - 1);
    });
  }, []);

  const increaseDate = useCallback(() => {
    setDate((date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1);
    });
  }, []);

  return (
    <div className="Home">
      <Header
        headText={nowDate}
        leftChild={<Button text="<" onClick={decreaseDate} />}
        rightChild={<Button text=">" onClick={increaseDate} />}
      />
      <DiaryList diaryList={data} date={date} />
    </div>
  );
};

export default Home;
