import React, { useEffect, useReducer, useRef, useState } from 'react';
import Router from './Router';
import './App.scss';

const reducer = (state, action) => {
  let newSate = [];
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE': {
      newSate = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newSate = state.filter((item) => item._id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newSate = state.map((item) =>
        item._id === action.data._id ? { ...action.data } : item
      );
      break;
    }
    default:
      return state;
  }
  return newSate;
};

export const DiaryContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    getDiaryList();
  }, []);

  const getDiaryList = async () => {
    try {
      let res = await fetch('http://localhost:8000/diary');
      let result = await res.json();
      dispatch({ type: 'INIT', data: result });
    } catch (err) {
      alert('diary를 불러오지 못했습니다. 다시 시도해주세요');
      return;
    }
  };

  const postDiary = async (diaryItem) => {
    try {
      let res = await fetch('http://localhost:8000/diary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(diaryItem),
      });
      return await res.json();
    } catch (err) {
      throw new Error('post fail');
    }
  };

  const onCreate = async (date, content, emotion) => {
    const diaryItem = {
      date: new Date(date).getTime(),
      emotion,
      content,
    };
    try {
      let result = await postDiary(diaryItem);
      let id = result._id;

      dispatch({
        type: 'CREATE',
        data: {
          _id: id,
          ...diaryItem,
        },
      });
    } catch (err) {
      alert('저장에 실패했습니다. 다시 시도해주세요');
    }
  };

  const onRemove = async (targetId, navigate) => {
    try {
      let res = await fetch(`http://localhost:8000/diary/${targetId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        dispatch({ type: 'REMOVE', targetId });
        navigate('/', { replace: true });
      }
    } catch (err) {
      alert('일기를 삭제하지 못했습니다. \n 다시 시도해주세요');
    }
  };

  const onEdit = async (targetId, content, emotion, date, navigate) => {
    const diary = {
      date: new Date(date).getTime(),
      _id: targetId,
      content,
      emotion,
    };

    try {
      let res = await fetch(`http://localhost:8000/diary/${targetId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(diary),
      });

      if (res.ok) {
        dispatch({
          type: 'EDIT',
          data: diary,
        });
        navigate('/', { replace: true });
      }
    } catch (err) {
      alert('일기 수정에 실패했습니다');
    }
  };

  if (data.length > 0) {
    return (
      <div className="App">
        <DiaryContext.Provider value={{ data, onCreate, onRemove, onEdit }}>
          <Router />
        </DiaryContext.Provider>
      </div>
    );
  }
}

export default App;
