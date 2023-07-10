import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./slices/userAuthSlice.js";
import userFolderSlice from "./slices/userFolderSlice.js";

const store = configureStore({
  reducer: {
    auth: userAuthSlice,
    folder: userFolderSlice,
  },
});

export default store;
