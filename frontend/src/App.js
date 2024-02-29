import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/feature/authSlice";
import AddEditTodo from "./pages/AddEditTodo";

import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import TagTodos from "./pages/TagTodos";
import SingleTodo from "./pages/SingleTodo";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("advancedtodo"));

  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/todo/search" element={<Home />}></Route>
        <Route path="/todo/tags/:tag" element={<TagTodos />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/add-todo"
          element={
            <PrivateRoute>
              {" "}
              <AddEditTodo />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/edit-todo/:id"
          element={
            <PrivateRoute>
              <AddEditTodo />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/todo/:id" element={<SingleTodo />}></Route>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {" "}
              <Dashboard />
            </PrivateRoute>
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
