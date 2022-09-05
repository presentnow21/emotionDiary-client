import React from 'react';
import Button from '../../../components/button/Button';
import './Pagination.scss';

const Pagination = ({ totalList, limit, setPage }) => {
  let pageNum = [];

  for (let i = 0; i < Math.ceil(totalList / limit); i++) {
    pageNum.push(i + 1);
  }

  const handlePage = (e) => {
    setPage(parseInt(e.target.innerText));
  };

  return (
    <div className="Pagination">
      {pageNum.map((number) => {
        return (
          <Button key={'page' + number} text={number} onClick={handlePage} />
        );
      })}
    </div>
  );
};

export default React.memo(Pagination);
