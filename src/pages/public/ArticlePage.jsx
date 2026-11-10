import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { ArticleCard } from '../../components/articles/ArticleCard.jsx';
import {
  Search,
  BookOpen,
  User,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

export const ArticlesPage = () => {
  const { articles, loadingArticles, errorArticles, fetchArticles } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { label: 'Semua Kategori', value: 'all' },
    { label: 'Teknik Budidaya', value: 'Teknik' },
    { label: 'Kualitas Air', value: 'Kualitas' },
    { label: 'Pakan & Nutrisi', value: 'Pakan' },
    { label: 'Panen & Distribusi', value: 'Panen' },
  ];

  const publishedArticles = useMemo(() => {
    return articles.filter((a) => a.status === 'published' || !a.status);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return publishedArticles.filter((art) => {
      const matchSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (art.author && art.author.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory =
        selectedCategory === 'all' ||
        art.category.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchSearch && matchCategory;
    });
  }, [publishedArticles, searchQuery, selectedCategory]);

  const featuredArticle = publishedArticles[0];

  const handleSelectArticle = (art) => {
    navigate(`/articles/${art.slug}`);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* 1. HERO HEADER */}
      <section className="relative py-16 text-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/foto/Article1.jpeg')",
          }}
        />

        {/* Green Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#123F2E]/95 via-[#123F2E]/80 to-[#123F2E]/50" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#78B98B] border border-white/15">
            Pusat Edukasi LeleQu
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Wawasan & Panduan Budidaya Ikan Lele
          </h1>

          <p className="text-sm sm:text-base text-neutral-200 max-w-2xl mx-auto leading-relaxed">
            Kumpulan artikel edukasi seputar pengelolaan kolam, kualitas air, nutrisi pakan, dan standar panen
            yang disusun langsung oleh Tim LeleQu untuk kemajuan perikanan air tawar.
          </p>
        </div>
      </section>

      {/* 2. LOADING STATE */}
      {loadingArticles && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-12 text-center bg-white rounded-3xl border border-neutral-200 shadow-xs space-y-4">
            <RefreshCw className="w-8 h-8 text-[#1B6044] animate-spin mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#202923]">Memuat Artikel Edukasi...</h3>
              <p className="text-xs text-[#6B786F]">
                Mengambil data artikel budidaya ikan lele dari server data LeleQu.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 3. ERROR STATE */}
      {!loadingArticles && errorArticles && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 text-center bg-red-50/70 border border-red-200 rounded-3xl space-y-4 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-red-900">Gagal Mengambil Data Artikel</h3>
              <p className="text-xs text-red-700 leading-relaxed">
                Kendala koneksi: {errorArticles}.
              </p>
            </div>
            <button
              onClick={fetchArticles}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1B6044] hover:bg-[#123F2E] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Muat Ulang Artikel</span>
            </button>
          </div>
        </section>
      )}

      {/* 4. FEATURED SPOTLIGHT ARTICLE (IF NO SEARCH AND SUCCESS) */}
      {!loadingArticles && !errorArticles && !searchQuery && selectedCategory === 'all' && featuredArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            onClick={() => handleSelectArticle(featuredArticle)}
            className="group cursor-pointer bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            <div className="lg:col-span-7 aspect-16/10 lg:aspect-auto relative bg-neutral-100 overflow-hidden">
              <img
                src={featuredArticle.thumbnail}
                alt={featuredArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = '/public/assets/foto/kolam_lele_8e878a5c.jpeg';
                }}
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-lg text-xs font-bold text-[#123F2E] shadow-xs">
                Artikel Pilihan Redaksi
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-medium text-[#6B786F]">
                  <span className="font-bold text-[#1B6044]">{featuredArticle.category}</span>
                  <span>·</span>
                  <span>{featuredArticle.published_at}</span>
                  <span>·</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[#202923] group-hover:text-[#1B6044] transition-colors leading-snug">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#6B786F] line-clamp-4 leading-relaxed">
                  {featuredArticle.content}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#202923] font-medium">
                  <User className="w-4 h-4 text-[#1B6044]" />
                  <span>{featuredArticle.author}</span>
                </div>
                <span className="text-xs font-bold text-[#1B6044] group-hover:underline">
                  Baca Selengkapnya →
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. TOOLBAR (SEARCH & FILTER) */}
      {!loadingArticles && !errorArticles && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full flex-1">
                <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari artikel, pengelolaan kolam, kualitas air, pakan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#F8FAF6] border border-neutral-200 text-sm text-[#202923] placeholder:text-[#6B786F] focus:outline-none focus:border-[#1B6044]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                <span className="text-xs font-bold text-[#6B786F] shrink-0 sm:hidden">Kategori:</span>
                {categories.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setSelectedCategory(c.value)}
                    className={`px-3.5 py-2 text-xs rounded-xl font-medium whitespace-nowrap transition-colors shrink-0 ${
                      selectedCategory === c.value
                        ? 'bg-[#1B6044] text-white font-semibold shadow-xs'
                        : 'bg-[#F8FAF6] text-[#6B786F] hover:bg-neutral-100 hover:text-[#202923] border border-neutral-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. ARTICLES GRID / EMPTY STATE */}
      {!loadingArticles && !errorArticles && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 space-y-4 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#202923]">Belum Ada Artikel yang Sesuai</h3>
              <p className="text-xs text-[#6B786F]">
                Tidak ditemukan artikel dengan kata kunci "{searchQuery}" pada kategori yang dipilih.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#1B6044] text-white rounded-xl hover:bg-[#123F2E] transition-colors"
              >
                Reset Filter Pencarian
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((art) => (
                <ArticleCard
                  key={art.id}
                  article={art}
                  onSelect={handleSelectArticle}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};
