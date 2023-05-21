import { configureStore } from '@reduxjs/toolkit'
import changeUserReduc from './changeUser'
import { userId } from './changeUser';
import userReducer from '../redux/userSlice';
import locationReducer from './locationSlice';
import userApiReducer from './userApiSlice';

const logUserId = (store) => (next) => (action) => {
  if (action.type === 'changeUser/changeUserReduc') {
    const result = next(action);
    console.log("Middleware", result);

    const uid = action.payload.uid;
    
    store.dispatch(userId(uid));

    return result;
  }
  return next(action);
};


export default configureStore({
  reducer: {
    changeUser: changeUserReduc,
    user: userReducer,
    location: locationReducer,
    userAPI: userApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(logUserId),
})