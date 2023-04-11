import { configureStore } from '@reduxjs/toolkit'
import changeUserReduc from './changeUser'

export default configureStore({
  reducer: {
    changeUser: changeUserReduc,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({})
})