import React from 'react';
import './ControlMenu.scss';

export const sortOptionList = [
  { value: 'latest', name: '최신순' },
  { value: 'oldest', name: '오래된 순' },
];

export const filterOptionList = [
  { value: 'all', name: '전부다' },
  { value: 'good', name: '좋은감정만' },
  { value: 'bad', name: '안좋은감정만' },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  const handleOptions = (e) => {
    onChange(e.target.value);
  };
  return (
    <select className="ControlMenu" value={value} onChange={handleOptions}>
      {optionList.map((item) => (
        <option key={item.value} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
});

export default ControlMenu;
