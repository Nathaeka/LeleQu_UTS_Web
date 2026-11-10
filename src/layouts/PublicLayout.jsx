import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { ToastContainer } from '../components/common/Toast.jsx';
import { ProductDetailModal } from '../components/products/ProductDetailModal.jsx';
import { OrderModal } from '../components/orders/OrderModal.jsx';

export const PublicLayout = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF6] text-[#202923]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ProductDetailModal />
      <OrderModal />
      <ToastContainer />
    </div>
  );
};
