import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUserApi: null
  };
  
  export const UserApiSlice = createSlice({
    name: 'userAPI',
    initialState,
    reducers: {
      setselectedUserApi: (state, action) => {
        state.selectedUserApi = action.payload;
      },
    },
  })
  
  export const { setselectedUserApi } = UserApiSlice.actions;
  
  // selectors
  export const selectSelectedUserApi = (state) => state.userAPI.selectedUserApi;

  export default UserApiSlice.reducer;
