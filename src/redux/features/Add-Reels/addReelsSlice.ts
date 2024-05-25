import { createSlice } from "@reduxjs/toolkit";

const addReelsSlice = createSlice({
  name: "addReels",
  initialState: {
    dataAddReels: null,
    isFetching: false,
    errorReels: false,
  },
  reducers: {
    addReelsStart: (state) => {
      state.isFetching = true;
    },
    addReelsSuccess: (state, action) => {
      state.isFetching = false;
      state.dataAddReels = action.payload;
    },
    addReelsFailure: (state) => {
      state.isFetching = false;
      state.errorReels = true;
    },
   
  },
});

export const {
    addReelsStart,
    addReelsSuccess,
    addReelsFailure,

} = addReelsSlice.actions;
export default addReelsSlice.reducer;


