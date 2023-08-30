import { configureStore } from "@reduxjs/toolkit";
import user from "./User";

const store = configureStore({
  reducer: {
    user: user,

  },
});

export default store;
