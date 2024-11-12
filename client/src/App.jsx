import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import Cart from "./pages/Cart"
import NoPage from "./pages/NoPage"
import Admin from "./pages/Admin"

function App() {
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
    </Layout>
  </BrowserRouter>
  )
}

export default App

