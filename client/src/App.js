import { BrowserRouter,Routes, Route } from "react-router-dom";
import LandingPage from './pages/landing_page/LandingPage'
import ProductPage from './pages/products/ProductPage'
import LoginPage from './pages/login_page/LoginPage'
import RegistrationPage from './pages/registration_page/RegistrationPage.js'
import ProductInfoPage from './pages/ProductInfoPage/ProductInfoPage.js'
import CreateProductPage from "./pages/products/CreateProductPage.js";
function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/products" element = {<ProductPage />} />
          <Route path="/login" element = {<LoginPage />} />
          <Route path="/register" element = {<RegistrationPage />} />
          <Route path="/products/:id" element = {<ProductInfoPage />} />
          <Route path = "/create_product" element = {<CreateProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}



export default App
