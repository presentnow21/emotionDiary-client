import React, { useEffect, useReducer, useRef } from 'react';
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
      newSate = state.filter((item) => item.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newSate = state.map((item) =>
        item.id === action.data.id ? { ...action.data } : item
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
  const dateId = useRef(0);

  useEffect(() => {
    getDiaryList();
  }, []);

  const getDiaryList = async () => {
    try {
      // let res = await fetch('/data/diaryList.json');
      let res = await fetch('http://localhost:8000/diary');
      let result = await res.json();
      dispatch({ type: 'INIT', data: result });
    } catch (err) {
      alert('다시 시도해주세요');
      return;
    }
  };

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dateId.current,
        date: new Date(date).getTime(),
        emotion,
        content,
      },
    });
    dateId.current += 1;
  };

  const onRemove = (targetId) => {
    dispatch({ type: 'REMOVE', targetId });
  };

  const onEdit = (targetId, content, emotion, date) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        emotion,
        content,
      },
    });
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
