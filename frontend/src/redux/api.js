import axios from "axios";

const API = axios.create({ baseURL: "https://advancedtodo-api.onrender.com" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("advancedtodo")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("advancedtodo")).token
      }`;
    }
    return req;
  });

export const Signin = (formData) =>
  API.post("/user/signin", formData, { headers: {}, withCredentials: true });
export const Signup = (formData) => API.post("/user/signup", formData);
export const GoogleSignIn = (data) =>
  API.post("/user/googleSignIn", data, { headers: {}, withCredentials: true }); 

// Todos
export const createTodo = (tododata) => API.post("/todo/add-todo", tododata);
export const getTodos = (page) => API.get(`/todo/get-todos?page=${page}`);
export const getTodo = (id) => API.get(`/todo/get-todo/${id}`);
export const getUsersTodo = (id) => API.get(`/todo/get-usersTodo/${id}`);
export const updateTodo = (id, updatedTodoData) => API.patch(`/todo/get-userstodo/${id}`, updatedTodoData);
export const deleteTodo = (id) => API.delete(`/todo/get-userstodo/${id}`);

export const getTodosBySearch = (searchQuery) => API.get(`/todo/get-todos/search?searchQuery=${searchQuery}`);
export const getTodosByTag = (tag) => API.get(`/todo/tags/${tag}`);
export const getRelatedTodos = (tags) => API.post(`/todo/relatedTodos`, tags);
export const likeTodos = (like) => API.patch(`/todo/like/${like}`);
