import { combineReducers } from 'redux';
import authReducer from './authReducer';
import testReducer from './testReducer';
import UserReducer from './reducer-users'


const rootReducer = combineReducers({
  authentication: authReducer,
  tester: testReducer,
  users: UserReducer
});

export default rootReducer;
