import { createAsyncThunk, createSlice , PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import getFriend from "./getFriendAPI";
interface FriendState {
  friend: any; // Kiểu dữ liệu của info
  isLoadingfriend: boolean;
  isErrorfriend: boolean;
  errorfriend: string;
  reloadTrigger: boolean, 
}
const initialState: FriendState = {
  friend: [],
  isLoadingfriend: false,
  isErrorfriend: false,
  errorfriend: "",
  reloadTrigger: false, 
  
};

// async thunk
export const fetchFriend = createAsyncThunk("friend/fetchInfo", async () => {
  const friend = await getFriend();

  return friend;
});

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    reloadFriend: (state) => {
      state.reloadTrigger = !state.reloadTrigger;
    },
  }, // Thêm reducers nếu cần
  extraReducers: (builder: ActionReducerMapBuilder<FriendState>) => {
    builder
      .addCase(fetchFriend.pending, (state) => {
        state.isErrorfriend = false;
        state.isLoadingfriend = true;
        state.friend =  [];
      })
      .addCase(fetchFriend.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoadingfriend = false;
        state.friend = action.payload;
      })
      .addCase(fetchFriend.rejected, (state) => { // Kiểu dữ liệu của action được xác định tự động
        state.isLoadingfriend = false;
        state.friend =  [];
        state.isErrorfriend = true;
      // Kiểm tra action.error?.message có thể là undefined
      });
  },
});
export const { reloadFriend } = friendSlice.actions;
export default friendSlice.reducer;
