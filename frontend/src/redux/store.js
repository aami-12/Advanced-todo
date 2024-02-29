import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/authSlice";
import todoReducer from "./feature/todoSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
  },
});

export default store;
 