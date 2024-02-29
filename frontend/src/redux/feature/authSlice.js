import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
  users: null,
  errors: "",
  loading: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.Signin(formValue);
      toast.success("Login Successful");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.Signup(formValue);
      toast.success("Registered Successful");
      navigate("/login");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
    
      const response = await api.GoogleSignIn(result);
      toast.success("Logged in Successful");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
    },
    setLogout: (state) => {
      state.users = null;
      localStorage.clear()
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem(
        "advancedtodo",
        JSON.stringify({ ...action.payload })
      );
      state.users = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action?.payload?.error;
    },

    // Register
    [signup.pending]: (state) => {
      state.loading = true;
    },
    [signup.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem(
        "advancedtodo",
        JSON.stringify({ ...action.payload })
      );
    
      state.users = action.payload;
    },
    [signup.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action?.payload?.error;
    },
    // Google Log in
    [googleLogin.pending]: (state) => {
      state.loading = true;
    },
    [googleLogin.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem(
        "advancedtodo",
        JSON.stringify({ ...action.payload })
      );
      state.users = action.payload;
    },
    [googleLogin.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action?.payload?.error;
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
