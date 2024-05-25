// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

interface ToggleOpition {
  mode: boolean;
}
const initialState: ToggleOpition = {
  mode: true,
};
const opitionpostSlice = createSlice({
  name: "opition",
  initialState,
  reducers: {
    toggleOpition: (state) => {
      state.mode = state.mode === true ? false : true;
    },
  },
});

export const { toggleOpition } = opitionpostSlice.actions;
export default opitionpostSlice.reducer;
