import { createSlice } from "@reduxjs/toolkit";

const addInfoSlice = createSlice({
  name: "addInfo",
  initialState: {
    dataAddInfo: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    addInfoStart: (state) => {
      state.isFetching = true;
    },
    addInfoSuccess: (state, action) => {
      state.isFetching = false;
      state.dataAddInfo = action.payload;
    },
    addInfoFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
   
  },
});

export const {
    addInfoStart,
    addInfoSuccess,
    addInfoFailure,

} = addInfoSlice.actions;
export default addInfoSlice.reducer;
