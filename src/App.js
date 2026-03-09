import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/config";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

// Pages
import Login from "./Login";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import TextileDashboard from "./TextileDashboard";
import HomePage from "./components/HomePage";
import ProductsPage from "./components/ProductsPage";
import CartPage from "./components/CartPage";
import Checkout from "./components/Checkout";
import OrdersPage from "./components/OrdersPage";
import ProfilePage from "./components/ProfilePage";

// Cart Context
import { CartProvider } from "./context/CartContext";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const ref = doc(db, "users", u.uid);
        const snap = await getDoc(ref);
        setUser(u);
        setRole(snap.data()?.role);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <h2>Loading...</h2>;


  console.log({
    Login,
    UserDashboard,
    AdminDashboard,
    TextileDashboard,
    HomePage,
    ProductsPage,
    CartPage,
    Checkout,
    OrdersPage,
    ProfilePage
  });
  return (
  <CartProvider>
    <BrowserRouter>
      <Routes>

        {/* Home page FIRST */}
        <Route path="/" element={<HomePage />} />

        {/* Login page */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={`/${role}`} />}
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            user && role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />
          }
        />

        {/* Textile */}
        <Route path="/textiles" element={<TextileDashboard />} />

        {/* USER DASHBOARD */}
        <Route
          path="/user/*"
          element={
            user && role === "user" ? <UserDashboard /> : <Navigate to="/login" />
          }
        >
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  </CartProvider>
);
}

export default App;