import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';

// Public Layout & Pages
import { PublicLayout } from './layouts/PublicLayout.jsx';
import { HomePage } from './pages/public/HomePage.jsx';
import { AboutPage } from './pages/public/AboutPage.jsx';
import { ProductsPage } from './pages/public/ProductsPage.jsx';
import { OrderPage } from './pages/public/OrderPage.jsx';
import { ArticlesPage } from './pages/public/ArticlesPage.jsx';
import { ArticleDetailPage } from './pages/public/ArticleDetailPage.jsx';
import { ContactPage } from './pages/public/ContactPage.jsx';

// Admin Layout & Pages
import { AdminLogin } from './pages/admin/AdminLogin.jsx';
import { AdminLayout } from './layouts/AdminLayout.jsx';
import { DashboardOverview } from './pages/admin/DashboardOverview.jsx';
import { ManageProducts } from './pages/admin/ManageProducts.jsx';
import { ManageArticles } from './pages/admin/ManageArticles.jsx';
import { ManageSettings } from './pages/admin/ManageSettings.jsx';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="order" element={<OrderPage />} />
            <Route path="articles" element={<ArticlesPage />} />
            <Route path="articles/:slug" element={<ArticleDetailPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Dashboard Routes (Protected) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="articles" element={<ManageArticles />} />
            <Route path="settings" element={<ManageSettings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
