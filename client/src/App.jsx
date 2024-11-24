import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import Cart from "./pages/Cart"
import NoPage from "./pages/NoPage"
import AdminLayout from "./pages/AdminLayout"
import AdminProduct from "@/pages/AdminProduct"
import AdminProductForm from "@/pages/AdminProductForm"

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const role = userRole();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}> 
          <Route path="product" element={<AdminProduct />} />
          <Route path="product/:action/:id?" element={<AdminProductForm />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

