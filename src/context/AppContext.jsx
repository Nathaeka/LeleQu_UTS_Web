import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialProducts, initialArticles, initialSettings } from '../data/initialData.js';

const AppContext = createContext(undefined);

// Helper to sanitize product names and descriptions from legacy Sangkuriang/Grade words
const sanitizeLoadedProducts = (items) => {
  return items.map((p) => {
    let cleanName = p.name
      .replace(/Ikan\s*Lele\s*Sangkuriang\s*Segar\s*—\s*(?:Grade\s*)?/gi, 'Ikan Lele ')
      .replace(/Ikan\s*Lele\s*Segar\s*—\s*(?:Ukuran\s*)?/gi, 'Ikan Lele ')
      .replace(/Sangkuriang/gi, '')
      .replace(/Grade/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

    return {
      ...p,
      name: cleanName,
      grade: (p.grade || '').replace(/Grade\s*/gi, '').trim(),
      description: (p.description || '')
        .replace(/Sangkuriang/gi, 'pilihan')
        .replace(/Grade/gi, 'ukuran'),
    };
  });
};

const sanitizeLoadedArticles = (items) => {
  return items.map((a) => ({
    ...a,
    thumbnail: (a.thumbnail || '').replace(/^\/public\//, '/'),
  }));
};

export const AppProvider = ({ children }) => {
  // Products state
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);

  // Articles state
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [errorArticles, setErrorArticles] = useState(null);

  // Settings state (persisted)
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem('lelequ_settings_v3');
      return stored ? JSON.parse(stored) : initialSettings;
    } catch {
      return initialSettings;
    }
  });

  // Admin auth state
  const [currentAdmin, setCurrentAdmin] = useState(() => {
    try {
      const stored = localStorage.getItem('lelequ_admin_session');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Toasts state
  const [toasts, setToasts] = useState([]);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderProduct, setOrderProduct] = useState(null);

  // Fetch Products using Fetch API from /data/products.json
  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    setErrorProducts(null);
    try {
      // First check local edits in localStorage if admin modified them
      const storedEdits = localStorage.getItem('lelequ_products_v4');
      if (storedEdits) {
        setProducts(sanitizeLoadedProducts(JSON.parse(storedEdits)));
        setLoadingProducts(false);
        return;
      }

      // Fetch from public JSON data
      const response = await fetch('/data/products.json');
      if (!response.ok) {
        throw new Error(`Gagal memuat data produk (HTTP ${response.status})`);
      }
      const data = await response.json();
      const sanitized = sanitizeLoadedProducts(data);
      setProducts(sanitized);
      localStorage.setItem('lelequ_products_v4', JSON.stringify(sanitized));
    } catch (err) {
      console.warn('Fetch products failed, using fallback:', err.message);
      setErrorProducts(err.message);
      // Fallback to initial data if fetch error
      const fallback = sanitizeLoadedProducts(initialProducts);
      setProducts(fallback);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // Fetch Articles using Fetch API from /data/articles.json
  const fetchArticles = useCallback(async () => {
    setLoadingArticles(true);
    setErrorArticles(null);
    try {
      const storedEdits = localStorage.getItem('lelequ_articles_v2');
      if (storedEdits) {
        setArticles(JSON.parse(storedEdits));
        setLoadingArticles(false);
        return;
      }

      const response = await fetch('/data/articles.json');
      if (!response.ok) {
        throw new Error(`Gagal memuat data artikel (HTTP ${response.status})`);
      }
      const data = await response.json();
      setArticles(data);
      localStorage.setItem('lelequ_articles_v2', JSON.stringify(data));
    } catch (err) {
      console.warn('Fetch articles failed, using fallback:', err.message);
      setErrorArticles(err.message);
      setArticles(initialArticles);
    } finally {
      setLoadingArticles(false);
    }
  }, []);

  // Initial Data Fetch on Mount
  useEffect(() => {
    fetchProducts();
    fetchArticles();
  }, [fetchProducts, fetchArticles]);

  // Sync products and articles changes to localStorage for local CRUD persistence
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('lelequ_products_v4', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (articles.length > 0) {
      localStorage.setItem('lelequ_articles_v2', JSON.stringify(articles));
    }
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('lelequ_settings_v3', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (currentAdmin) {
      localStorage.setItem('lelequ_admin_session', JSON.stringify(currentAdmin));
    } else {
      localStorage.removeItem('lelequ_admin_session');
    }
  }, [currentAdmin]);

  // Toast helper
  const showToast = (message, type = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(-4);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Products CRUD (Admin only - Frontend simulation)
  const addProduct = (prodData) => {
    const newProduct = {
      ...prodData,
      id: 'prod-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast('Produk lele berhasil ditambahkan.');
  };

  const updateProduct = (id, updated) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
    showToast('Data produk berhasil diperbarui.');
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showToast('Produk telah dihapus dari katalog.', 'info');
  };

  // Articles CRUD (Admin only - Frontend simulation)
  const addArticle = (artData) => {
    const newArticle = {
      ...artData,
      id: 'art-' + Date.now(),
    };
    setArticles((prev) => [newArticle, ...prev]);
    showToast('Artikel edukasi berhasil diterbitkan.');
  };

  const updateArticle = (id, updated) => {
    setArticles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
    showToast('Artikel berhasil diperbarui.');
  };

  const deleteArticle = (id) => {
    setArticles((prev) => prev.filter((item) => item.id !== id));
    showToast('Artikel telah dihapus.', 'info');
  };

  // Public Order Form Simulation (Section H & F: No admin inbox/orders CRUD, simulation for frontend UTS)
  const addOrder = (orderData) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ORD-2024-${randomSuffix}`;
    const newOrder = {
      ...orderData,
      id: 'ord-' + Date.now(),
      order_number: orderNumber,
      status: 'Menunggu Konfirmasi',
      created_at: new Date().toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };
    showToast(`Pesanan #${orderNumber} berhasil dibuat! Silakan konfirmasi via WhatsApp.`);
    return newOrder;
  };

  // Settings
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Pengaturan perusahaan berhasil disimpan.');
  };

  const resetAllData = () => {
    localStorage.removeItem('lelequ_products_v4');
    localStorage.removeItem('lelequ_products_v3');
    localStorage.removeItem('lelequ_articles_v2');
    localStorage.removeItem('lelequ_settings_v3');
    fetchProducts();
    fetchArticles();
    setSettings(initialSettings);
    showToast('Seluruh data berhasil di-reset ke data awal.', 'info');
  };

  // Auth Simulation
  const loginAdmin = (email, pass) => {
    const normalized = email.trim().toLowerCase();
    if (normalized === 'admin@lelequ.com' && pass === 'admin123') {
      const user = {
        name: 'Administrator LeleQu',
        email: 'admin@lelequ.com',
      };
      setCurrentAdmin(user);
      showToast('Login berhasil. Selamat datang di CMS LeleQu!');
      return true;
    }
    if (normalized.includes('@') && pass.length >= 4) {
      const user = {
        name: normalized.split('@')[0],
        email: normalized,
      };
      setCurrentAdmin(user);
      showToast('Login berhasil.');
      return true;
    }
    showToast('Email atau password tidak sesuai.', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setCurrentAdmin(null);
    showToast('Anda telah logout dari Admin Dashboard.', 'info');
  };

  const openOrderModal = (prod) => {
    setOrderProduct(prod || products[0] || null);
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setOrderProduct(null);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        loadingProducts,
        errorProducts,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        articles,
        loadingArticles,
        errorArticles,
        fetchArticles,
        addArticle,
        updateArticle,
        deleteArticle,
        addOrder,
        settings,
        updateSettings,
        resetAllData,
        currentAdmin,
        loginAdmin,
        logoutAdmin,
        toasts,
        showToast,
        removeToast,
        selectedProduct,
        setSelectedProduct,
        isOrderModalOpen,
        orderProduct,
        openOrderModal,
        closeOrderModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
