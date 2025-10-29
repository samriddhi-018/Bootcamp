import React, { createContext, useReducer } from 'react';

const UserContext = createContext();

const initialState = [
  {
    id: 1,
    name: "Samriddhi Gupta",
    bio: "Software Developer passionate about creating apps.",
    avatar: null,
  },
  {
    id: 2,
    name: "Khushi Goyal",
    bio: "Data Analyst passionate about analysing data",
    avatar: null,
  }
];

const userReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return state.map(user =>
        user.id === action.payload.id ? { ...user, ...action.payload } : user
      );
    case 'ADD_USER':
      return [...state, action.payload];
    case 'REMOVE_USER':
      return state.filter(user => user.id !== action.payload);
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [users, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ users, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;