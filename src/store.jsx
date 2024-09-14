import React, { createContext, useContext, useReducer } from 'react';

// 初始状态
const initialState = {
  history: [],
  chartData: []
};

// Action 类型
const ADD_CALCULATION = 'ADD_CALCULATION';
const CLEAR_HISTORY = 'CLEAR_HISTORY';

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case ADD_CALCULATION:
      const newHistory = [...state.history, action.payload];
      const newChartData = [
        ...state.chartData,
        {
          birthYear: new Date(action.payload.birthDate).getFullYear(),
          retirementAge: parseInt(action.payload.retirementAge)
        }
      ];
      return {
        ...state,
        history: newHistory,
        chartData: newChartData
      };
    case CLEAR_HISTORY:
      return {
        ...state,
        history: [],
        chartData: []
      };
    default:
      return state;
  }
}

// 创建 Context
const StoreContext = createContext();

// Provider 组件
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

// 自定义 Hook 用于访问 store
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

// Action 创建函数
export function addCalculation(calculation) {
  return { type: ADD_CALCULATION, payload: calculation };
}

export function clearHistory() {
  return { type: CLEAR_HISTORY };
}