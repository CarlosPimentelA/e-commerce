import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import { Products } from "./pages/Products";
import { HomePage } from "./HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import ProductCategory from "./pages/ProductCategory";
import AdminPanel from "./components/AdminPanel";
import { FiltersProvider } from "./context/FiltersContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/products"
          element={
            <FiltersProvider>
              <Products />
            </FiltersProvider>
          }
        ></Route>
        <Route path="/products/:category" element={<ProductCategory />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/adminpanel" element={<AdminPanel />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
