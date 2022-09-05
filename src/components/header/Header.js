import React from 'react';
import './Header.scss';

const Header = ({ headText, leftChild, rightChild }) => {
  return (
    <header className="Header">
      <div className="head_btn_left">{leftChild}</div>
      <div className="head_text">{headText}</div>
      <div className="head_btn_right">{rightChild}</div>
    </header>
  );
};

export default Header;
