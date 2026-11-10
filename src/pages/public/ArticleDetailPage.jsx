<<<<<<< HEAD
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
=======
export const initialProducts = [
  {
    id: 'prod-1',
    name: 'Ikan Lele Konsumsi (8–10 ekor/kg)',
    slug: 'ikan-lele-konsumsi-8-10',
    description: 'Ikan lele segar pilihan dengan rasio 8–10 ekor per kilogram. Dipanen langsung dari kolam pengelolaan bersih dan sehat. Daging tebal, gurih, padat, dan bebas bau lumpur karena telah melalui proses pembersihan dan karantina air mengalir sebelum ditimbang.',
    grade: 'Konsumsi (8–10 ekor/kg)',
    price_per_kg: 25000,
    image_url: '/public/assets/foto/Ikan_lele_segar_5b6a360e.jpg',
    is_available: true,
    min_order: '3 kg',
    characteristics: ['Ukuran seragam 8-10 ekor/kg', 'Daging padat & kenyal', 'Bebas bau lumpur', 'Dipanen langsung saat order'],
    created_at: '2026-10-20T08:00:00Z',
  },
  {
    id: 'prod-3',
    name: 'Ikan Lele Super / Besar (6–8 ekor/kg)',
    slug: 'ikan-lele-super-besar-6-8',
    description: 'Ikan lele ukuran jumbo dengan bobot 6–8 ekor per kilogram. Rendemen daging sangat tebal, cocok untuk olahan lele bakar madu, lele asap, mangut lele, atau di-fillet tanpa duri untuk masakan keluarga.',
    grade: 'Super / Besar (6–8 ekor/kg)',
    price_per_kg: 24000,
    image_url: '/public/assets/foto/Ikan_lele_segar_5b6a360e.jpg',
    is_available: true,
    min_order: '3 kg',
    characteristics: ['Ukuran jumbo 6-8 ekor/kg', 'Daging tebal memuaskan', 'Kadar lemak seimbang', 'Kondisi ikan bugar & sehat'],
    created_at: '2026-10-25T08:00:00Z',
  },
  {
    id: 'prod-4',
    name: 'Ikan Lele Frozen Siap Masak',
    slug: 'ikan-lele-frozen-vacuum',
    description: 'Ikan lele segar yang telah disiangi bersih (dibuang isi perut dan insang), dicuci higienis, lalu dibekukan cepat (air blast frozen) dan dikemas rapat kedap udara (vacuum pack). Siap langsung dibumbui atau digoreng kapan saja tanpa repot membersihkan ikan.',
    grade: 'Frozen Siap Masak (Pack 1 kg)',
    price_per_kg: 28000,
    image_url: '/public/assets/foto/lele_frozen_577f6962.jpg',
    is_available: true,
    min_order: '2 kg (2 pack)',
    characteristics: ['Sudah disiangi & bersih', 'Kemasan vacuum pack higienis', 'Tahan lama dalam freezer', 'Praktis tanpa repot'],
    created_at: '2026-10-28T08:00:00Z',
  },
  {
    id: 'prod-5',
    name: 'Fillet Daging Ikan Lele (Boneless / Tanpa Duri)',
    slug: 'fillet-ikan-lele-boneless',
    description: 'Potongan daging murni ikan lele tanpa tulang/duri dan kulit. Diproses dari lele ukuran super segar berbobot tinggi. Sangat higienis, bergizi tinggi untuk anak-anak, nugget ikan, fish & chips, atau masakan diet sehat.',
    grade: 'Fillet Daging Murni (Pack 500 gr)',
    price_per_kg: 45000,
    image_url: '/public/assets/foto/lele_fillet_ab2007db.jpg',
    is_available: true,
    min_order: '1 kg',
    characteristics: ['100% daging murni tanpa duri', 'Bebas pengawet kimiawi', 'Kemasan food grade vacuum', 'Tinggi protein berkualitas'],
    created_at: '2026-10-29T08:00:00Z',
  },
  {
    id: 'prod-6',
    name: 'Rolade Ikan Lele Siap Masak',
    slug: 'rolade-ikan-lele',
    description: 'Produk olahan ikan lele pilihan yang dicincang lembut bersama bumbu rempah alami lalu digulung dengan lapisan telur dadar lezat. Gurih, bergizi, cocok untuk lauk harian keluarga, bekal anak, dan katering.',
    grade: 'Olahan Lele (Roll)',
    price_per_kg: 35000,
    image_url: '/public/assets/foto/Rolade_lele_1c433422.jpg',
    is_available: true,
    min_order: '2 roll',
    characteristics: ['Olahan daging lele asli', 'Kaya rempah nusantara', 'Tinggal iris & goreng/kukus', 'Disukai anak & dewasa'],
    created_at: '2026-10-30T08:00:00Z',
  },
];

export const initialArticles = [
  {
    id: 'art-1',
    title: 'Teknik Budidaya Ikan Lele Kolam Terencana: Menjaga Pertumbuhan & Daya Tahan Ikan',
    slug: 'teknik-budidaya-ikan-lele-kolam-terencana',
    category: 'Teknik Budidaya',
    thumbnail: '/public/assets/foto/kolam_lele_8e878a5c.jpeg',
    content: `Budidaya ikan lele memerlukan perencanaan kolam dan manajemen harian yang disiplin. Dengan pengelolaan sirkulasi air yang teratur dan pengaturan kepadatan tebar yang proporsional, ikan dapat tumbuh secara seragam tanpa stres.

Kunci Sukses Budidaya Kolam:
1. Pemilihan Bibit Lele Sehat: Pastikan bibit memiliki postur lincah, warna cerah, dan tidak memiliki luka atau bercak putih pada tubuh.
2. Sirkulasi Oksigen Optimal: Aerasi yang cukup menjaga ikan tetap aktif dan merangsang metabolisme penyerapan nutrisi pakan.
3. Kontrol Kepadatan Kolam: Jaga jumlah populasi per meter persegi agar ruang gerak ikan leluasa dan kompetisi makanan tidak berlebihan.

Dengan perawatan kolam yang higienis, tingkat kelangsungan hidup (survival rate) ikan lele dapat dipertahankan optimal hingga waktu panen tiba.`,
    author: 'Tim LeleQu',
    status: 'published',
    published_at: '20 Oktober 2026',
  },
  {
    id: 'art-2',
    title: 'Manajemen Kualitas Air Kolam: Menjaga Suhu dan Derajat Keasaman (pH) Stabil',
    slug: 'manajemen-kualitas-air-kolam',
    category: 'Kualitas Air',
    thumbnail: '/public/assets/foto/kolam_lele_tok_18245844.jpeg',
    content: `Kondisi air adalah habitat utama yang menentukan kesehatan ikan lele. Perubahan cuaca ekstrem seperti hujan lebat atau panas terik dapat memicu perubahan mendadak pada suhu dan pH air.

Panduan Pemantauan Parameter Air:
- Suhu Ideal: Berada pada rentang 27°C hingga 30°C. Penggunaan naungan peneduh seperti paranet sangat membantu mengurangi paparan terik matahari langsung ke permukaan kolam.
- Nilai Derajat Keasaman (pH): Pertahankan pH air pada rentang netral 7.0 hingga 8.0. Jika air terlalu asam setelah hujan, lakukan pemulihan alami secara bertahap.
- Kebersihan Dasar Kolam: Buang endapan kotoran dasar secara berkala melalui saluran pembuangan tengah (central drain) agar tidak menjadi amonia berbahaya.

Pemantauan harian membuat kondisi fisik lele tetap segar, bugar, dan terbebas dari serangan parasit.`,
    author: 'Tim LeleQu',
    status: 'published',
    published_at: '24 Oktober 2026',
  },
  {
    id: 'art-3',
    title: 'Pemberian Pakan Terjadwal: Strategi Nutrisi Tinggi untuk Pertumbuhan Cepat',
    slug: 'pemberian-pakan-terjadwal-ikan-lele',
    category: 'Pakan & Nutrisi',
    thumbnail: '/public/assets/foto/image_60f36d86.png',
    content: `Pakan merupakan komponen penting dalam budidaya lele. Memahami jenis pakan dan jadwal pemberian yang tepat sangat menentukan kecepatan pertumbuhan dan bobot panen ikan.

Jenis Pakan yang Diberikan:
1. Pakan Buatan (Pelet Berkualitas): Pilih pelet dengan kandungan protein yang sesuai dengan fase pertumbuhan ikan lele, aroma disukai ikan, dan daya apung yang baik di air.
2. Pakan Alami & Tambahan: Variasi pakan alami bernutrisi tinggi dapat memperkaya asupan mikro dan menjaga nafsu makan lele.
3. Syarat Utama Pakan: Pakan tidak boleh lekas hancur mencemari air kolam, bermutu baik, bebas racun, dan diproduksi secara teruji.

Aturan Waktu Makan:
Berikan pakan pada jam-jam tetap setiap hari, biasanya pada pagi hari setelah suhu kolam stabil dan sore hari saat lele aktif mencari makan. Jangan berikan pakan berlebih agar dasar kolam tetap bersih.`,
    author: 'Tim LeleQu',
    status: 'published',
    published_at: '28 Oktober 2026',
  },
  {
    id: 'art-4',
    title: 'SOP Panen dan Pemberokan Ikan Lele: Menghasilkan Daging Bersih Bebas Bau Lumpur',
    slug: 'sop-panen-pemberokan-lele-bebas-bau',
    category: 'Panen & Distribusi',
    content: `Kualitas daging lele sangat ditentukan oleh penanganan pasca-panen. Di LeleQu, setiap ikan yang selesai dipanen menjalani tahap pemberokan terlebih dahulu.

Tahapan SOP Panen LeleQu:
- Sortir Ukuran Presisi: Ikan dipilah berdasarkan kategori ukuran konsumsi (8-10 ekor/kg) dan super jumbo (6-8 ekor/kg).
- Pemberokan Air Mengalir 24 Jam: Ikan dipuasakan dalam bak penampungan khusus dengan air bersih mengalir untuk membersihkan saluran pencernaan ikan dari sisa pakan dan kotoran.
- Hasil Daging Bersih: Proses ini menjamin daging ikan lele memiliki tekstur kenyal gurih dan tidak berbau lumpur saat diolah oleh konsumen.
- Pengambilan Langsung di Lokasi: Ikan lele ditimbang secara langsung di depan pelanggan saat jadwal pengambilan, menjamin keakuratan bobot dan kesegaran terbaik.`,
    author: 'Tim LeleQu',
    status: 'published',
    published_at: '01 November 2026',
  },
];



export const initialSettings = {
  company_name: 'LeleQu',
  tagline: 'Dibudidayakan dengan Baik, Dihadirkan dengan Kualitas.',
  headline: 'Pengelolaan Kolam & Pasokan Ikan Lele Berkualitas',
  description: 'LeleQu menghadirkan produk ikan lele berkualitas melalui pengelolaan budidaya kolam yang terencana, standar mutu terjaga, dan proses pembersihan higienis untuk kebutuhan rumah tangga dan usaha kuliner.',
  whatsapp: '6281234567890',
  phone_display: '+62 xxx-xxxx-xxxx',
  email: 'kontak@xxxxxx.com',
  address: 'Jl. Raya Kolam Berkah No. 18, Bobotsari, Purbalingga, Jawa Tengah',
  pickup_address: 'Kolam LeleQu Bobotsari — Jl. Raya Kolam Berkah No. 18, Bobotsari, Purbalingga (Lokasi Penimbangan & Pengambilan Langsung)',
  instagram: '@xxxxxxxxx',
  facebook: 'xxxxxxxxxxxx',
  stat_ponds: '9+ Kolam',
  stat_harvest: '1+ Ton/Bulan',
  stat_orders: '150+ Pesanan',
  stat_quality: '100% Higienis',
};
>>>>>>> origin/develop
