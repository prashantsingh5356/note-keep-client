import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folder: [],
  selectedFolder: ""
};

const userFolderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setFolder: (state, action) => {
      state.folder = action.payload;
    },

    clearFolderName: (state, action) => {
      state.folder = state.folder.filter((f) => f !== action.payload);
    },

    addFolderName: (state, action) => {
      state.folder = [...state.folder, action.payload];
    },

    setSelectedFolderName: (state, action) => {
      state.selectedFolder = action.payload;
    },
  },
});

export const { setFolder, clearFolderName, addFolderName, setSelectedFolderName } =
  userFolderSlice.actions;

export default userFolderSlice.reducer;
