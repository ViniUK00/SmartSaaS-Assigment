import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedCurrentUser: null
  };
  
  export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
      setSelectedCurrentUser: (state, action) => {
        state.selectedCurrentUser = action.payload;
      },
    },
  })
  
  export const { setSelectedCurrentUser } = currentUserSlice.actions;
  
  // selectors
  export const selectSelectedCurrentUser = (state) => state.currentUser.selectedCurrentUser;
  

  export default currentUserSlice.reducer;