import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { HelmetProvider } from "react-helmet-async";
import store from "./redux/store.js";

import {
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Shipping from "./pages/Shipping.jsx";
import Payment from "./pages/Payment.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Cart from "./pages/Cart.jsx";
import Order from "./pages/Order.jsx";
import Profile from "./pages/Profile.jsx";

import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";
import ProductsList from "./pages/Admin/ProductsList.jsx";
import EditProduct from "./pages/Admin/EditProduct.jsx";
import UsersList from "./pages/Admin/UsersList.jsx";
import EditUser from "./pages/Admin/EditUser.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/search/:keyword" element={<Home />} />
      <Route path="/page/:pageNumber" element={<Home />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/order-list" element={<OrderList />} />
        <Route path="/admin/product-list" element={<ProductsList />} />
        <Route
          path="/admin/product-list/:pageNumber"
          element={<ProductsList />}
        />
        <Route path="/admin/product/:id/edit" element={<EditProduct />} />
        <Route path="/admin/users" element={<UsersList />} />
        <Route path="/admin/user/:id/edit" element={<EditUser />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </HelmetProvider>
);
