import { createSlice } from "@reduxjs/toolkit";

const addCmtSlice = createSlice({
  name: "addCmt",
  initialState: {
    dataAddCmt: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    addCmtStart: (state) => {
      state.isFetching = true;
    },
    addCmtSuccess: (state, action) => {
      state.isFetching = false;
      state.dataAddCmt = action.payload;
    },
    addCmtFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
   
  },
});

export const {
    addCmtStart,
    addCmtSuccess,
    addCmtFailure,

} = addCmtSlice.actions;
export default addCmtSlice.reducer;
