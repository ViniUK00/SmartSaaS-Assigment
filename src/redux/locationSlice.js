import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedPlace: null
  };
  
  export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
      setSelectedPlace: (state, action) => {
        state.selectedPlace = action.payload;
      },
    },
  })
  
  export const { setSelectedPlace } = locationSlice.actions;
  
  // selectors
  export const selectSelectedPlace = (state) => state.location.selectedPlace;
  

  export default locationSlice.reducer;