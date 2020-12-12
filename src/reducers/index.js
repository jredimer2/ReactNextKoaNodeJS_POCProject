import { combineReducers } from 'redux';
import userReducer from './userReducer'
import selectedUserReducer from './selectedUserReducer'


const allReducers = combineReducers({
  users: userReducer,
  selectedUser: selectedUserReducer
});

export default allReducers;
