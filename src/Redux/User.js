/* The code is creating a Redux slice using the `createSlice` function from the `@reduxjs/toolkit`
library. */
import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    userData: [],
  },
  reducers: {
    setUserData: (state ,action) => {
      state.userData =action.payload;
    },
  },
});

export const { setUserData } = user.actions;
export default user.reducer;
