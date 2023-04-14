import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fName: null,
    lName: null,
    uid: null,
    email: null,
    phoneNumber: null,
    avatar: null,
    coordinates: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setFirstName: (state,action) => {
            state.fName = action.payload;
        },
        setLastName: (state,action) => {
            state.lName = action.payload;
        },
        setUid: (state,action) => {
            state.uid = action.payload;
        },
        setEmail: (state,action) => {
            state.email = action.payload;
        },
        setPhoneNumber: (state,action) => {
            state.phoneNumber = action.payload;
        },
        setAvatar: (state,action) => {
            state.avatar = action.payload;
        },
        setCoordinates: (state,action) => {
            state.coordinates = action.payload
        }
    }
})

export const { setFirstName,setLastName,setUid,
    setEmail,setPhoneNumber, setAvatar, setCoordinates } = userSlice.actions;

// selectors
export const selectFirstName = (state)=>state.user.fName;
export const selectLastName = (state)=>state.user.lName;
export const selectUID = (state)=>state.user.uid;
export const selectEmail = (state)=>state.user.email;
export const selectPhoneNumber = (state)=>state.user.phoneNumber;
export const selectAvatar = (state)=>state.user.avatar;
export const selectCoordinates = (state)=>state.user.coordinates;


export default userSlice.reducer;
