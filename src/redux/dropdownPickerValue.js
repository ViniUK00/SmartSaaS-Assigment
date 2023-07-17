import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selecteItem: null
  };
  
  export const dropdownPickerValueSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
      setSelectedItem: (state, action) => {
        state.selecteItem = action.payload;
      },
    },
  });  
  
  export const { setSelectedItem } = dropdownPickerValueSlice.actions;
  
  // selectors
  export const selectSelectedItem = (state) => state.item.selecteItem;

  export default dropdownPickerValueSlice.reducer;
