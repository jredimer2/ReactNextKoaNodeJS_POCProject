import { combineReducers } from 'redux';
import userReducer from './userReducer'
import selectedUserReducer from './selectedUserReducer'
import labelReducer from './LabelReducer'
import updatedUsersListReducer from './UpdateUsersListReducer'


const allReducers = combineReducers({
  users: userReducer,
  updatedUsers: updatedUsersListReducer,
  selectedUser: selectedUserReducer,
  label: labelReducer
});

export default allReducers;
