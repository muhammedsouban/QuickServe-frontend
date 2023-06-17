import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  servicename: "",
  category: "",
  description: "",
  serviceincludes: "",
  price: '',
  image: ''
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    addService: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { addService } = serviceSlice.actions;
export default serviceSlice.reducer;
