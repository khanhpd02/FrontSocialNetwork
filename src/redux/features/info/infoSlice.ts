import { createAsyncThunk, createSlice , PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import getInfo from "./getInfoAPI";
interface InfoState {
  info: any; // Kiểu dữ liệu của info
  isLoading: boolean;
  isError: boolean;
  error: string;
}
const initialState: InfoState = {
  info: [],
  isLoading: false,
  isError: false,
  error: "",
};

// async thunk
export const fetchInfo = createAsyncThunk("info/fetchInfo", async () => {
  const info = await getInfo();
  return info;
});

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {}, // Thêm reducers nếu cần
  extraReducers: (builder: ActionReducerMapBuilder<InfoState>) => {
    builder
      .addCase(fetchInfo.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.info =  [];
      })
      .addCase(fetchInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.info = action.payload;
      })
      .addCase(fetchInfo.rejected, (state, action) => { // Kiểu dữ liệu của action được xác định tự động
        state.isLoading = false;
        state.info =  [];
        state.isError = true;
        state.error = action.error?.message || ""; // Kiểm tra action.error?.message có thể là undefined
      });
  },
});
export default infoSlice.reducer;
