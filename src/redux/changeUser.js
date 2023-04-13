import { createSlice } from '@reduxjs/toolkit';

export const changeUserSlice = createSlice({
  name: 'changeUser',
  initialState: {
    currentUserIndex: 0,
    // showResetComponent: false,
    userId: null,
  },
  reducers: {
    changeUser: (state, action) => {
      console.log("Action type:", action.payload , action.type)

      switch (action.payload) {
        case 'next':
          state.currentUserIndex++;
          if (state.currentUserIndex === 10) {
            state.currentUserIndex = 0;
          }
          break;
        case 'prev':
          state.currentUserIndex--;
          if (state.currentUserIndex < 0) {
            state.currentUserIndex = 0;
          }
          break;
        default:
          break;
      }
    },
    userId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { changeUser, userId } = changeUserSlice.actions;

export default changeUserSlice.reducer;
