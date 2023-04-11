import { configureStore } from '@reduxjs/toolkit'
import changeUserReduc from './changeUser'



const logUserId = (store) => (next) => (action) => {
    if (action.type === 'changeUser/changeUserReduc') {
      const results = next(action);
      console.log("Middleware" , results);
      return results;
    }
    return next(action);
  };

export default configureStore({
  reducer: {
    changeUser: changeUserReduc,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(logUserId),
})