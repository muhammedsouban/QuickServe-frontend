import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    city:'',
    data:[]
}
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    Location: (state, action) => {
      const { field, value } = action.payload;
      state.data[field] = value;

    }, UpdateCity: (state, action) => {
      state.data = { ...state.data, city: action.payload };
    }
  },
});

export const { Location,UpdateCity } = locationSlice.actions;
export default locationSlice.reducer;
