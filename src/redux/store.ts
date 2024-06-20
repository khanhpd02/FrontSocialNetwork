// import { configureStore, ThunkAction, Action,combineReducers } from "@reduxjs/toolkit";
// import opitionpostSlice from "./opitionpostSlice";

// import userReducer from "./features/login/loginSlice";
// import addInfoSlice from "./features/Add-Info/addInfoSlice"
// import getInfoSlice from "./features/info/infoSlice"
// import addPostSlice from "./features/Add-Post/addPostSlice"
// import getPostSlice from "./features/post/postSlice"
// import addReelsSlice from "./features/Add-Reels/addReelsSlice";
// import addCmtSlice from "./features/Add-Cmt/addCmtSlice";
// import friendSlice from "./features/Not-Friend/friendSlice";
// import storage from "redux-persist/lib/storage";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
//   stateReconciler: autoMergeLevel2,
//   whitelist: ["info"],
// };

// const rootReducer = combineReducers({  
//   user: userReducer,
  
//   info:getInfoSlice,
//   opition: opitionpostSlice,

//   post:getPostSlice, 

//   getFrined: friendSlice,
//   addPost:addPostSlice,
//   addInfo:addInfoSlice,
//  addCmt:addCmtSlice,
//  addReels:addReelsSlice
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// export const store = configureStore({
 
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export const persistor = persistStore(store);
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import opitionpostSlice from "./opitionpostSlice";
import userReducer from "./features/login/loginSlice";
import addInfoSlice from "./features/Add-Info/addInfoSlice";
import getInfoSlice from "./features/info/infoSlice";
import addPostSlice from "./features/Add-Post/addPostSlice";
import addReelsSlice from "./features/Add-Reels/addReelsSlice";
import addCmtSlice from "./features/Add-Cmt/addCmtSlice";
import friendSlice from "./features/Not-Friend/friendSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import loadingReducer from "./features/loading/loadingSlice"
// Define the root state type
const rootReducer = combineReducers({
  user: userReducer,
  info: getInfoSlice,
  opition: opitionpostSlice,

  getFrined: friendSlice,
  addPost: addPostSlice,
  addInfo: addInfoSlice,
  addCmt: addCmtSlice,
  addReels: addReelsSlice,
  loading: loadingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["info"],
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
