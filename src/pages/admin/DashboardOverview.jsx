import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import {
  Fish,
  FileText,
  Plus,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Package,
} from 'lucide-react';

export const DashboardOverview = () => {
  const { products, articles } = useApp();

  const totalProducts = products.length;
  const freshProducts = products.filter(
    (p) =>
      p.grade &&
      (p.grade.toLowerCase().includes('konsumsi') || p.grade.toLowerCase().includes('super'))
  ).length;
  const processedProducts = products.filter(
    (p) =>
      p.grade &&
      (p.grade.toLowerCase().includes('frozen') ||
        p.grade.toLowerCase().includes('fillet') ||
        p.grade.toLowerCase().includes('olahan'))
  ).length;
  const totalArticles = articles.length;

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#202923] tracking-tight">
            Dashboard Admin Website LeleQu
          </h1>
          <p className="text-xs text-[#6B786F]">
            Pusat pengelolaan data katalog produk dan profil perusahaan untuk website resmi LeleQu.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/products"
            className="px-4 py-2.5 text-xs font-bold text-white bg-[#1B6044] hover:bg-[#123F2E] rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk Baru</span>
          </Link>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <span>Lihat Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Primary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Produk */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B786F]">Total Produk</span>
            <div className="w-8 h-8 rounded-lg bg-[#E8F3E9] text-[#1B6044] flex items-center justify-center">
              <Fish className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#123F2E] font-mono tabular-nums">
            {totalProducts}
          </div>
          <span className="text-[11px] text-[#6B786F] block">Katalog komoditas & olahan</span>
        </div>

        {/* Lele Segar Konsumsi */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B786F]">Lele Segar Hidup</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 font-mono tabular-nums">
            {freshProducts}
          </div>
          <span className="text-[11px] text-[#6B786F] block">Konsumsi & super jumbo</span>
        </div>

        {/* Produk Olahan & Frozen */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B786F]">Olahan & Frozen</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-teal-700 font-mono tabular-nums">
            {processedProducts}
          </div>
          <span className="text-[11px] text-[#6B786F] block">Vacuum & fillet boneless</span>
        </div>

        {/* Total Artikel */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B786F]">Artikel Edukasi</span>
            <div className="w-8 h-8 rounded-lg bg-[#E8F3E9] text-[#1B6044] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#123F2E] font-mono tabular-nums">
            {totalArticles}
          </div>
          <span className="text-[11px] text-[#6B786F] block">Konten edukasi budidaya</span>
        </div>
      </div>

      {/* Catalog Products Table Preview */}
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#202923]">
              Daftar Produk yang Ditampilkan di Website
            </h3>
            <p className="text-xs text-[#6B786F]">
              Katalog resmi yang dapat dipilih pelanggan saat memesan lele.
            </p>
          </div>
          <Link
            to="/admin/products"
            className="text-xs font-bold text-[#1B6044] hover:text-[#123F2E] flex items-center gap-1"
          >
            <span>Buka Halaman CRUD Produk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      