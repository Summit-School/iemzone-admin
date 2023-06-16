import { ThemeProvider } from "./context/Themes";
import { LoaderProvider } from "./context/Preloader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  // Overview,
  Documentation,
  ChangeLog,
  Error,
} from "./pages/supports";
import {
  Avatars,
  Alerts,
  Buttons,
  Charts,
  Tables,
  Fields,
  Headings,
  Colors,
} from "./pages/blocks";
import {
  Ecommerce,
  Analytics,
  CRM,
  ForgotPassword,
  Register,
  Login,
  UserList,
  UserProfile,
  ShopList,
  ShopProfile,
  MyAccount,
  ProductList,
  ProductView,
  ProductUpload,
  InvoiceList,
  InvoiceDetails,
  OrderList,
  Message,
  Notification,
  BlankPage,
  Settings,
  CategoryList,
  CategoryUpload,
  UpdateShippingFee,
} from "./pages/master";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <ThemeProvider>
      <LoaderProvider>
        <BrowserRouter>
          <Routes>
            {/* master Pages */}
            <Route path="/dashboard" element={<Ecommerce />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/user-profile/:id" element={<UserProfile />} />
            <Route path="/shop-list" element={<ShopList />} />
            <Route path="/shop-profile/:id" element={<ShopProfile />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/product-view/:id" element={<ProductView />} />
            <Route path="/product-upload" element={<ProductUpload />} />

            <Route path="/category-list" element={<CategoryList />} />
            <Route path="/category-upload" element={<CategoryUpload />} />

            <Route
              path="/update-shipping-fee"
              element={<UpdateShippingFee />}
            />

            <Route path="/invoice-list" element={<InvoiceList />} />
            <Route path="/invoice-details/:id" element={<InvoiceDetails />} />
            <Route path="/order-list" element={<OrderList />} />
            <Route path="/message" element={<Message />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/blank-page" element={<BlankPage />} />

            {/* Blocks Pages */}
            <Route path="/headings" element={<Headings />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/colors" element={<Colors />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/fields" element={<Fields />} />
            <Route path="/alerts" element={<Alerts />} />

            {/* Supports Pages */}
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Login />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/changelog" element={<ChangeLog />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </LoaderProvider>
    </ThemeProvider>
  );
}
