import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import Cart from "./pages/Cart"
import NoPage from "./pages/NoPage"
import AdminLayout from "./pages/AdminLayout"
import AdminProduct from "@/pages/AdminProduct"

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
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

