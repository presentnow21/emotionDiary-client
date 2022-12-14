import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import DiaryItem from './DiaryItem';
import ControlMenu, { sortOptionList, filterOptionList } from './ControlMenu';
import Pagination from './Pagination';
import './DiaryList.scss';

const DiaryList = ({ diaryList, date }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState('latest');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    setPage(1);
  }, [filter, date, sortType]);

  const getProcessedDiaryList = useMemo(() => {
    const filterCallBack = (item) => {
      if (filter === 'good') {
        return parseInt(item.emotion) < 3;
      } else return parseInt(item.emotion) >= 3;
    };

    const compare = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else return parseInt(a.date) - parseInt(b.date);
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === 'all'
        ? copyList
        : copyList.filter((item) => filterCallBack(item));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  }, [diaryList, sortType, filter]);

  const goToNew = useCallback(() => {
    navigate('/new');
  }, []);

  const getItem = useMemo(() => {
    return getProcessedDiaryList.slice(limit * (page - 1), page * limit);
  }, [getProcessedDiaryList, page]);

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <Button type="positive" text={'??? ????????????'} onClick={goToNew} />
        </div>
      </div>

      {getItem.map((item) => {
        return <DiaryItem key={item._id} {...item} />;
      })}

      <Pagination
        totalList={getProcessedDiaryList.length}
        limit={limit}
        setPage={setPage}
      />
    </div>
  );
};

export default DiaryList;
