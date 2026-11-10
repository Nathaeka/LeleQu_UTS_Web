<<<<<<< HEAD
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
    read_time: '5 menit baca',
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
    read_time: '4 menit baca',
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
    read_time: '6 menit baca',
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
    thumbnail: '/public/assets/foto/Ikan_lele_segar_5b6a360e.jpg',
    read_time: '5 menit baca',
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
=======
export const initialProducts = [
  {
    id: 'prod-1',
    name: 'Ikan Lele Konsumsi (8–10 ekor/kg)',
    slug: 'ikan-lele-konsumsi-8-10',
    description: 'Ikan lele segar pilihan dengan rasio 8–10 ekor per kilogram. Dipanen langsung dari kolam pengelolaan bersih dan sehat. Daging tebal, gurih, padat, dan bebas bau lumpur karena telah melalui proses pembersihan dan karantina air mengalir sebelum ditimbang.',
    grade: 'Konsumsi (8–10 ekor/kg)',
    price_per_kg: 24000,
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
    price_per_kg: 30000,
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
    price_per_kg: 30000,
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
    price_per_kg: 70000,
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
