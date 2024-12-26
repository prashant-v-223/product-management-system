import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';
import { useSelector } from 'react-redux';
import Cart from './components/Products/Cart';

// Lazy load components
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));
const ProductList = lazy(() => import('./components/Products/ProductList'));

// Loading component to display while components are loading
const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log("isAuthenticated", isAuthenticated, user);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {isAuthenticated ? (
            <>
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<ProductList />} />
            </>
          ) : (
            <Route
              path="*"
              element={<Login />}
            />
          )}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
