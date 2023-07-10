import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loginUser: null,
  },
  reducers: {
    userData: (state, action) => {
      state.loginUser = action.payload;
    },
  },
});

export const { userData } = userSlice.actions;
export default userSlice.reducer;
