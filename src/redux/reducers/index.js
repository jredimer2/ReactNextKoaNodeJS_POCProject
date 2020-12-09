import { combineReducers } from 'redux';
import authReducer from './authReducer';
import testReducer from './testReducer';


const rootReducer = combineReducers({
  authentication: authReducer,
  tester: testReducer
});

export default rootReducer;
