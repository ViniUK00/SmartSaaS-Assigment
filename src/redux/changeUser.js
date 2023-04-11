import { createSlice } from '@reduxjs/toolkit';


export const changeUserSlice = createSlice({
  name: 'changeUser',
  initialState: {
    currentUserIndex: 0,
    showResetComponent: false,
  },
  reducers: {
    changeUserReduc: (state) => {
        state.showResetComponent = false;
        state.currentUserIndex += 1;
        const isUserCardCountLessThan10 = state.currentUserIndex >= 10
             
        if (isUserCardCountLessThan10) {
            state.showResetComponent = true;
            state.currentUserIndex = 0;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeUserReduc } = changeUserSlice.actions;

export default changeUserSlice.reducer;






















