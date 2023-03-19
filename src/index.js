import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import ErrorPage from "./pages/error/Error";
import Layout from "./components/Layout";
import Profile from "./pages/profile/Profile";
import OrderList from "./pages/orderList/OrderList";
import Order from "./pages/order/Order";
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/users",
        element: <UserList />,
      },
      {
        path: "/user/:userId",
        element: <User />,
      },
      {
        path: "/new-user",
        element: <NewUser />,
      },
      {
        path: "/products",
        element: <ProductList />,
      },
      {
        path: "/product/:productId",
        element: <Product />,
      },
      {
        path: "/new-product",
        element: <NewProduct />,
      },
      {
        path: "/orders",
        element: <OrderList />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <PersistGate loading="null" persistor={persistor}>
          <App />
        </PersistGate>
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
