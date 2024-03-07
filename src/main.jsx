import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import AuthLayout from "./Components/AuthLayout.jsx";
import SignUp from "./Components/Pages/SignUp.jsx";
import Home from "./Components/Pages/Home.jsx";
import Login from "./Components/Pages/Login.jsx";
import { Post } from "./Components/index.js";
import AddPost from "./Components/Pages/AddPost.jsx";
import EditPost from "./Components/Pages/EditPost.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path=""
        element={<AuthLayout children={<Home />} authentication={false} />}
      />
      <Route
        path="/login"
        element={<AuthLayout children={<Login />} authentication={false} />}
      />
      <Route
        path="/signup"
        element={<AuthLayout children={<SignUp />} authentication={false} />}
      />
      <Route
        path="/add-post"
        element={<AuthLayout children={<AddPost />} authentication={true} />}
      />
      <Route
        path="/Edit-post/:slug"
        element={<AuthLayout children={<EditPost />} authentication={true} />}
      />
      <Route
        path="/post/:slug"
        element={<AuthLayout children={<Post />} authentication={true} />}
      />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
