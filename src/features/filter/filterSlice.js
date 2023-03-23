import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selects: [],
  search: "",
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addSearch: (state, action) => {
      state.search = action.payload;
    },
    addSelects: (state, action) => {
      state.selects = action.payload;
    },
    toogleSelects: (state, action) => {
      const index = state.selects.findIndex((val) => val === action.payload);
      if (index > -1) {
        state.selects.splice(index, 1);
      } else {
        state.selects.push(action.payload);
      }
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { addSearch, addSelects, toogleSelects } = filterSlice.actions;
