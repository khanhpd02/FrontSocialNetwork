import { createSlice } from "@reduxjs/toolkit";

const addPostSlice = createSlice({
  name: "addIPost",
  initialState: {
    dataAddPost: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    addPostStart: (state) => {
      state.isFetching = true;
    },
    addPostSuccess: (state, action) => {
      state.isFetching = false;
      state.dataAddPost = action.payload;
    },
    addPostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
   
  },
});

export const {
    addPostStart,
    addPostSuccess,
    addPostFailure,

} = addPostSlice.actions;
export default addPostSlice.reducer;


