import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { ArticleCard } from '../../components/articles/ArticleCard.jsx';
import {
  ArrowLeft,
  Clock,
  User,
  Share2,
  Check,
  Calendar,
  AlertCircle,
  RefreshCw,
  BookOpen,
} from 'lucide-react';

export const ArticleDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { articles, loadingArticles, errorArticles, fetchArticles } = useApp();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Loading State
  if (loadingArticles) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 animate-pulse">
        <div className="h-6 w-36 bg-neutral-200 rounded-lg" />
        <div className="space-y-3">
          <div className="h-4 w-24 bg-neutral-200 rounded" />
          <div className="h-10 w-3/4 bg-neutral-200 rounded-xl" />
          <div className="h-4 w-1/2 bg-neutral-200 rounded" />
        </div>
        <div className="aspect-16/9 rounded-3xl bg-neutral-200" />
        <div className="space-y-4">
          <div className="h-4 bg-neutral-200 rounded w-full" />
          <div className="h-4 bg-neutral-200 rounded w-5/6" />
          <div className="h-4 bg-neutral-200 rounded w-4/6" />
        </div>
      </div>
    );
  }

  // Error State
  if (errorArticles) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-[#202923]">Gagal Memuat Detail Artikel</h2>
        <p className="text-xs text-[#6B786F] leading-relaxed">
          Terjadi kendala saat mengambil data artikel dari server: {errorArticles}. Silakan coba muat ulang.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={fetchArticles}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#1B6044] hover:bg-[#123F2E] rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Coba Lagi</span>
          </button>
          <Link
            to="/articles"
            className="px-4 py-2.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
          >
            Daftar Artikel
          </Link>
        </div>
      </div>
    );
  }

  // Find article by slug or id
  const article = articles.find((a) => a.slug === slug || a.id === slug);

  // Not Found / Empty State
  if (!article) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <BookOpen className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-[#202923]">Artikel Tidak Ditemukan</h2>
        <p className="text-xs text-[#6B786F] leading-relaxed">
          Artikel dengan tautan "{slug}" tidak ditemukan atau telah dipindahkan oleh pengelola konten.
        </p>
        <div className="pt-2">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#1B6044] hover:bg-[#123F2E] rounded-xl shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Halaman Artikel</span>
          </Link>
        </div>
      </div>
    );
  }

  // Related articles
  const relatedArticles = articles
    .filter((a) => a.id !== article.id && (a.status === 'published' || !a.status))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Breadcrumb / Back button */}
      <div>
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#1B6044] hover:text-[#123F2E] transition-colors p-1 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Semua Artikel</span>
        </Link>
      </div>

      {/* Header Info */}
      <header className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-lg bg-[#E8F3E9] text-xs font-bold text-[#123F2E] tracking-wide">
          {article.category}
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#202923] tracking-tight leading-snug">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 border-y border-neutral-200 text-xs text-[#6B786F]">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 font-bold text-[#202923]">
              <User className="w-4 h-4 text-[#1B6044]" />
              <span>{article.author}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#1B6044]" />
              <span>{article.published_at}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#1B6044]" />
              <span>{article.read_time}</span>
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-xs font-semibold text-neutral-700 transition-colors cursor-pointer"
            title="Salin tautan artikel"
            aria-label="Bagikan artikel"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Share2 className="w-3.5 h-3.5 text-neutral-500" />
            )}
            <span>{copied ? 'Tautan Disalin!' : 'Bagikan'}</span>
          </button>
        </div>
      </header>

      {/* Featured Thumbnail */}
      <figure className="aspect-16/9 rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm">
        <img
          src={article.thumbnail}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/public/assets/foto/kolam_lele_8e878a5c.jpeg';
          }}
        />
      </figure>

      {/* Article Body Content */}
      <div className="prose max-w-none text-[#202923] text-sm sm:text-base leading-relaxed space-y-6 whitespace-pre-line font-normal">
        {article.content}
      </div>

      {/* Author Profile Card */}
      <div className="p-6 rounded-3xl bg-[#F8FAF6] border border-neutral-200 flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#1B6044] text-white flex items-center justify-center font-extrabold text-base shrink-0 shadow-xs">
          {article.author ? article.author.charAt(0) : 'L'}
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-[#202923]">{article.author}</h4>
          <p className="text-xs text-[#6B786F] leading-relaxed">
            Praktisi & pemerhati budidaya perikanan air tawar di LeleQu. Berkomitmen membagikan
            wawasan berbasis praktik lapangan untuk mendukung kemajuan budidaya lele nusantara yang bersih dan higienis.
          </p>
        </div>
      </div>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="space-y-6 pt-10 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#202923]">Artikel Edukasi Terkait Lainnya</h3>
            <Link
              to="/articles"
              className="text-xs font-bold text-[#1B6044] hover:underline"
            >
              Lihat Semua Artikel →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relArt) => (
              <ArticleCard
                key={relArt.id}
                article={relArt}
                onSelect={(selected) => {
                  navigate(`/articles/${selected.slug}`);
                }}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
