import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetUserState: () => initialState
  }
});

export const { userData, resetUserState } = userSlice.actions;
export default userSlice.reducer;
