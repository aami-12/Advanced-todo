import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
  todo: {},
  todos: [],
  userTodos: [],
  tagTodos:[],
  relatedTodos:[],
  currentPage: 1,
  numberOfPages: null,
  loading: false,
  errors: "",
};

export const createTodo = createAsyncThunk(
  "todo/create",
  async ({ updatedTodoData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTodo(updatedTodoData);
      navigate("/");
      toast.success("Todo created successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTodos = createAsyncThunk(
  "todo/getTodos",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getTodos(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTodo = createAsyncThunk(
  "todo/getTodo",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTodo(id);
    
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const LikeTodo = createAsyncThunk(
  "todo/LikeTodo",
  async ({_id}, { rejectWithValue }) => {
    try {
      const response = await api.likeTodos(_id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const getUsersTodos = createAsyncThunk(
  "todo/getUsersTodo",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getUsersTodo(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUsersTodo = createAsyncThunk(
  "todo/updateUsersTodo",
  async ({ id, updatedTodoData, toast, navigate }, { rejectWithValue }) => {

    try {
      const response = await api.updateTodo(id, updatedTodoData);
      toast.success("Todo updated successfully");
      navigate("/dashboard");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUsersTodo = createAsyncThunk(
  "todo/deleteUsersTodo",
  async ({ id, toast, dispatch, userId }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTodo(id);
      toast.success("Todo deleted successfully");
      dispatch(getUsersTodos(userId))
      // navigate('/dashboard')
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const todosBySearch = createAsyncThunk(
  "todo/getUsersTodoBySearch",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getTodosBySearch(searchQuery);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const todosBytag = createAsyncThunk(
  "todo/getTodoByTag",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getTodosByTag(tag);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRelatedTodos = createAsyncThunk(
  "todo/getRelatedTodos",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedTodos(tags);
  
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers:{
    setCurrentPage:(state,action) => {
      state.currentPage = action.payload
    }
  },
  extraReducers: {
    [createTodo.pending]: (state) => {
      state.loading = true;
    },
    [createTodo.fulfilled]: (state, action) => {
      state.todos = [action.payload];
    },
    [createTodo.rejected]: (state, action) => {
      state.error = action.payload.error;
    },

    [getTodos.pending]: (state) => {
      state.loading = true;
    },
    [getTodos.fulfilled]: (state, action) => {
      state.todos = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.numberOfPages = action.payload.numberOfPages;
      state.loading = false;
    },
    [getTodos.rejected]: (state, action) => {
      state.error = action?.payload?.error;
    },

    [getTodo.pending]: (state) => {
      state.loading = true;
    },
    [getTodo.fulfilled]: (state, action) => {
      state.todo = action.payload;
      state.loading = false;
    },
    [getTodo.rejected]: (state, action) => {
      state.error = action.payload.error;
    },

    [getUsersTodos.pending]: (state) => {
      state.loading = true;
    },
    [getUsersTodos.fulfilled]: (state, action) => {
      state.userTodos = action.payload;
      state.loading = false;
    },
    [getUsersTodos.rejected]: (state, action) => {
      state.error = action.payload.error;
    },

    [updateUsersTodo.pending]: (state) => {
      state.loading = true;
    },
    [updateUsersTodo.fulfilled]: (state, action) => {
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTodos = state.userTodos.todo.map((todo) =>
          todo._id === id ? action.payload : todo
        );
        state.todos = state.todos.map((todo) =>
          todo._id === id ? action.payload : todo
        );
      }
      state.loading = false;
    },
    [updateUsersTodo.rejected]: (state, action) => {
      state.error = action.payload.error;
    },

    [LikeTodo.pending]: (state) => {
      state.loading = true;
    },
    [LikeTodo.fulfilled]: (state, action) => {
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
       
        state.todos = state.todos.map((todo) =>
          todo._id === _id ? action.payload : todo
        );
      }
      state.loading = false;
    },
    [LikeTodo.rejected]: (state, action) => {
      state.error = action.payload.error;
    },

    [deleteUsersTodo.pending]: (state) => {
      state.loading = true;
    },
    [deleteUsersTodo.fulfilled]: (state, action) => {
      state.loading = false;

      const {
        arg: { id },
      } = action.meta;

      if (id) {
        state.userTodos = state.userTodos.todo.filter(
          (item) => item._id !== id
        );
        state.todos = state.todos.filter((item) => item._id !== id);
      }
    },
    [deleteUsersTodo.rejected]: (state, action) => { 
      state.error = action.payload.error;
    },

    [todosBySearch.pending]: (state) => {
      state.loading = true;
    },
    [todosBySearch.fulfilled]: (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    },
    [todosBySearch.rejected]: (state, action) => {
      state.error = action.payload.error;
    },

    [todosBytag.pending]: (state) => {
      state.loading = true;
    },
    [todosBytag.fulfilled]: (state, action) => {
      state.tagTodos = action.payload;
      state.loading = false;
    },
    [todosBytag.rejected]: (state, action) => {
      state.error = action.payload.error;
    },

    [getRelatedTodos.pending]: (state) => {
      state.loading = true;
    },
    [getRelatedTodos.fulfilled]: (state, action) => {
      state.relatedTodos = action.payload;
      state.loading = false;
    },
    [getRelatedTodos.rejected]: (state, action) => {
      state.error = action.payload.error;
    },
  },
});

export const {setCurrentPage} = todoSlice.actions;

export default todoSlice.reducer;
