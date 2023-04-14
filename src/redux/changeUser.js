import { createSlice } from '@reduxjs/toolkit';

export const changeUserSlice = createSlice({
  name: 'changeUser',
  initialState: {
    currentUserIndex: 0,
    showResetComponent: false,
    userId: null,
  },
  reducers: {
    changeUser: (state, action) => {
      // console.log("Action type:", action.payload , action.type)

      switch (action.payload) {
        case 'next':
          state.currentUserIndex++;
          state.showResetComponent = false; // Update this line
          if (state.currentUserIndex === 10) {
            state.showResetComponent = false; // Update this line
            state.currentUserIndex = 0;
          }
          break;
        case 'prev':
          if (state.currentUserIndex <= 0) {
            state.showResetComponent = false; // Update this line
            state.currentUserIndex = 0;
          } else {
            state.currentUserIndex--;
           state.showResetComponent = false; // Update this line
          }
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
