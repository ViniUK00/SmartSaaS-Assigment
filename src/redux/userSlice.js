import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userObject: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserObject: (state,action) => {
            state.userObject = action.payload;
        },
       
    }
})

export const { setUserObject } = userSlice.actions;

// selectors
export const selectUser = (state)=> state.user.userObject;


export default userSlice.reducer;
