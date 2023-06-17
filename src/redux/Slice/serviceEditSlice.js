import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  servicename: "",
  category: "",
  description: "",
  serviceincludes: "",
  price: "",
  image: "",
};

const serviceEditSlice = createSlice({
  name: "editservice",
  initialState,
  reducers: {
    EditService: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    UpdateService: (state, action) => {
      return initialState;
    },
  },
});

export const { EditService, UpdateService } = serviceEditSlice.actions;
export default serviceEditSlice.reducer;
