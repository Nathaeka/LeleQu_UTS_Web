import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import {
  MapPin,
  Clock,
  Phone,
  Scale,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Calendar,
} from 'lucide-react';

export const OrderPage = () => {
  const { products, addOrder, settings, showToast, orderProduct } = useApp();

  const [selectedProductId, setSelectedProductId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [quantityKg, setQuantityKg] = useState(10);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('16:00 WIB');
  const [notes, setNotes] = useState('');

  // Field errors state for frontend validation (Section F)
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [createdOrder, setCreatedOrder] = useState(null);

  // Today's date in YYYY-MM-DD for min date
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (orderProduct) {
      setSelectedProductId(orderProduct.id);
    } else if (products.length > 0 && !selectedProductId) {
      setSelectedProductId(products[0].id);
    }

    if (!pickupDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setPickupDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [orderProduct, products, selectedProductId, pickupDate]);

  const currentProduct =
    products.find((p) => p.id === selectedProductId) || products[0];

  const pricePerKg = currentProduct ? currentProduct.price_per_kg : 25000;
  const subtotal = (quantityKg || 0) * pricePerKg;

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  // Validation function
  const validate = () => {
    const errs = {};

    // 1. Customer Name
    const trimmedName = customerName.trim();
    if (!trimmedName) {
      errs.customerName = 'Nama pemesan wajib diisi.';
    } else if (trimmedName.length < 3) {
      errs.customerName = 'Nama pemesan minimal 3 karakter.';
    }

    // 2. WhatsApp Phone
    const cleanedPhone = customerPhone.replace(/[\s\-()]/g, '');
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,11}$/;
    if (!customerPhone.trim()) {
      errs.customerPhone = 'Nomor WhatsApp wajib diisi.';
    } else if (!phoneRegex.test(cleanedPhone)) {
      errs.customerPhone =
        'Format nomor tidak valid. Gunakan format Indonesia (contoh: 081234567890 atau +6281234567890).';
    }

    // 3. Product Selection
    if (!currentProduct || !selectedProductId) {
      errs.product = 'Produk lele wajib dipilih.';
    }

    // 4. Quantity
    const qty = Number(quantityKg);
    if (!quantityKg || isNaN(qty) || qty <= 0) {
      errs.quantity = 'Jumlah pesanan harus berupa angka lebih dari 0 kg.';
    } else if (qty > 1000) {
      errs.quantity = 'Untuk pesanan di atas 1.000 kg, silakan hubungi langsung via WhatsApp.';
    }

    // 5. Pickup Date
    if (!pickupDate) {
      errs.pickupDate = 'Tanggal pengambilan di kolam wajib diisi.';
    } else if (pickupDate < todayStr) {
      errs.pickupDate = 'Tanggal pengambilan tidak boleh di masa lampau.';
    }

    // 6. Pickup Time
    if (!pickupTime) {
      errs.pickupTime = 'Jam pengambilan wajib dipilih.';
    }

    return errs;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validationErrors = validate();
    setErrors(validationErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({
      customerName: true,
      customerPhone: true,
      product: true,
      quantity: true,
      pickupDate: true,
      pickupTime: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      showToast('Mohon perbaiki isian formulir yang belum sesuai.', 'error');
      return;
    }

    // Process order simulation (frontend UTS)
    const orderResult = addOrder({
      customer_name: customerName.trim(),
      customer_phone: customerPhone.trim(),
      product_id: currentProduct.id,
      product_name: currentProduct.name,
      product_grade: currentProduct.grade,
      price_per_kg: currentProduct.price_per_kg,
      quantity_kg: Number(quantityKg),
      total_price: subtotal,
      pickup_date: pickupDate,
      pickup_time: pickupTime,
      notes: notes.trim(),
      pickup_location: settings.pickup_address,
    });

    setCreatedOrder(orderResult);
    showToast('Pesanan berhasil dibuat! Silakan konfirmasi via WhatsApp.', 'success');
  };

  const getWhatsAppUrl = () => {
    if (!createdOrder) return '#';
    const msg = encodeURIComponent(
      `Halo LeleQu, saya telah membuat pesanan melalui website:\n\n*Nomor Pesanan:* ${createdOrder.order_number}\n*Nama:* ${createdOrder.customer_name}\n*Nomor WA:* ${createdOrder.customer_phone}\n*Produk:* ${createdOrder.product_name}\n*Ukuran:* ${createdOrder.product_grade}\n*Jumlah:* ${createdOrder.quantity_kg} kg\n*Total:* ${formatRupiah(createdOrder.total_price)}\n*Rencana Ambil:* ${createdOrder.pickup_date} (${createdOrder.pickup_time})\n*Metode:* Pengambilan Langsung (Pickup Only)\n\nMohon konfirmasi kesiapan pesanan di kolam. Terima kasih!`
    );
    return `https://wa.me/${settings.whatsapp}?text=${msg}`;
  };

  return (
    <div className="space-y-10 pb-20">
      {/* 1. HERO HEADER */}
      <section className="relative py-12 bg-[#123F2E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#78B98B] border border-white/15">
            Sistem Pemesanan Mandiri (Pickup Only)
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Formulir Pemesanan Ikan Lele
          </h1>
          <p className="text-sm sm:text-base text-neutral-200 max-w-2xl mx-auto leading-relaxed">
            Pesan ikan lele segar siap panen langsung dari kolam LeleQu. Seluruh pesanan disiapkan
            segar untuk diambil langsung di fasilitas budidaya kami.
          </p>
        </div>
      </section>

      {/* 2. WIDE HORIZONTAL FORM CONTAINER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
          {createdOrder ? (
            /* Confirmation Screen */
            <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      Pesanan Berhasil Disimpan
                    </span>
                    <h3 className="text-xl font-extrabold text-[#202923]">
                      Kode: <span className="text-[#1B6044] font-mono">{createdOrder.order_number}</span>
                    </h3>
                  </div>
                </div>

                <div className="bg-[#F8FAF6] p-4 rounded-2xl border border-neutral-200 text-xs space-y-2.5">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Pemesan:</span>
                    <span className="font-bold text-[#202923]">{createdOrder.customer_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Nomor WhatsApp:</span>
                    <span className="font-mono font-medium text-[#202923]">{createdOrder.customer_phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Jadwal Pengambilan:</span>
                    <span className="font-bold text-[#123F2E]">
                      {createdOrder.pickup_date} · {createdOrder.pickup_time}
                    </span>
                  </div>
                  {createdOrder.notes && (
                    <div className="pt-1.5 border-t border-neutral-200 text-[11px] text-neutral-600">
                      <span className="text-neutral-500 block">Catatan Petugas:</span>
                      <span className="italic">"{createdOrder.notes}"</span>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p>
                    Ikan dipuasakan dalam air mengalir agar bebas bau lumpur dan dipersiapkan hidup saat jam penjemputan di kolam.
                  </p>
                </div>
              </div>

              <div className="md:col-span-6 bg-[#F8FAF6] p-6 rounded-2xl border border-neutral-200 space-y-5">
                <div className="border-b border-neutral-200 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6B786F] block">
                    Ringkasan Komoditas
                  </span>
                  <h4 className="text-base font-bold text-[#202923] mt-1">
                    {createdOrder.product_name}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-neutral-600 mt-1">
                    <span>Ukuran: <strong>{createdOrder.product_grade}</strong></span>
                    <span className="font-mono font-bold text-[#123F2E]">{createdOrder.quantity_kg} kg</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-[#202923]">Total Pembayaran:</span>
                  <span className="text-xl font-extrabold text-[#123F2E] font-mono tabular-nums">
                    {formatRupiah(createdOrder.total_price)}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-neutral-200 text-xs space-y-1">
                  <span className="font-bold text-[#123F2E] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#1B6044]" />
                    Lokasi Pengambilan di Kolam:
                  </span>
                  <p className="text-neutral-600 leading-relaxed pl-5">
                    {createdOrder.pickup_location}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#1B6044] hover:bg-[#123F2E] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors text-center"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Konfirmasi via WhatsApp Sekarang</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setCreatedOrder(null)}
                    className="w-full py-2.5 px-4 rounded-xl border border-neutral-300 text-neutral-700 text-xs font-semibold hover:bg-white transition-colors"
                  >
                    Buat Pesanan Baru
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Input Form */
            <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Form Fields */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-5 border-b lg:border-b-0 lg:border-r border-neutral-100">
                {/* 1. Produk & Volume */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B6044]">
                    <Scale className="w-4 h-4" />
                    <span>1. Pilihan Produk & Jumlah</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-8">
                      <label htmlFor="productSelect" className="block text-xs font-medium text-[#6B786F] mb-1">
                        Pilihan Produk Ikan Lele <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="productSelect"
                        value={selectedProductId}
                        onChange={(e) => {
                          setSelectedProductId(e.target.value);
                          if (errors.product) setErrors((prev) => ({ ...prev, product: null }));
                        }}
                        onBlur={() => handleBlur('product')}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-[#202923] font-medium focus:outline-none bg-white transition-colors ${
                          errors.product && touched.product
                            ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                            : 'border-neutral-300 focus:border-[#1B6044]'
                        }`}
                        aria-invalid={Boolean(errors.product && touched.product)}
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({formatRupiah(p.price_per_kg)}/kg)
                          </option>
                        ))}
                      </select>
                      {errors.product && touched.product && (
                        <p className="text-red-600 text-[11px] flex items-center gap-1 mt-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.product}</span>
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="quantityInput" className="block text-xs font-medium text-[#6B786F] mb-1">
                        Kuantitas (Kg) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="quantityInput"
                          type="number"
                          min="1"
                          required
                          value={quantityKg}
                          onChange={(e) => {
                            setQuantityKg(e.target.value);
                            if (errors.quantity) setErrors((prev) => ({ ...prev, quantity: null }));
                          }}
                          onBlur={() => handleBlur('quantity')}
                          className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl border text-xs font-bold font-mono text-[#202923] focus:outline-none transition-colors ${
                            errors.quantity && touched.quantity
                              ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                              : 'border-neutral-300 focus:border-[#1B6044]'
                          }`}
                          aria-invalid={Boolean(errors.quantity && touched.quantity)}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 pointer-events-none">
                          KG
                        </span>
                      </div>
                      {errors.quantity && touched.quantity && (
                        <p className="text-red-600 text-[11px] flex items-center gap-1 mt-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.quantity}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Pilihan Cepat */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-[#6B786F]">Pilihan cepat:</span>
                    {[5, 10, 20, 25, 50].map((kg) => (
                      <button
                        key={kg}
                        type="button"
                        onClick={() => {
                          setQuantityKg(kg);
                          if (errors.quantity) setErrors((prev) => ({ ...prev, quantity: null }));
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                          Number(quantityKg) === kg
                            ? 'bg-[#123F2E] text-white shadow-2xs'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {kg} kg
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Data Pemesan */}
                <div className="space-y-2.5 pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B6044]">
                    <Phone className="w-4 h-4" />
                    <span>2. Data Pemesan</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="customerNameInput" className="block text-xs font-medium text-[#6B786F] mb-1">
                        Nama Lengkap Pemesan <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="customerNameInput"
                        type="text"
                        placeholder="Contoh: Budi Santoso"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                          if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: null }));
                        }}
                        onBlur={() => handleBlur('customerName')}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-[#202923] focus:outline-none transition-colors ${
                          errors.customerName && touched.customerName
                            ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                            : 'border-neutral-300 focus:border-[#1B6044]'
                        }`}
                        aria-invalid={Boolean(errors.customerName && touched.customerName)}
                      />
                      {errors.customerName && touched.customerName && (
                        <p className="text-red-600 text-[11px] flex items-center gap-1 mt-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.customerName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="customerPhoneInput" className="block text-xs font-medium text-[#6B786F] mb-1">
                        Nomor WhatsApp Aktif <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="customerPhoneInput"
                        type="tel"
                        placeholder="081234567890 atau +628123456789"
                        value={customerPhone}
                        onChange={(e) => {
                          setCustomerPhone(e.target.value);
                          if (errors.customerPhone) setErrors((prev) => ({ ...prev, customerPhone: null }));
                        }}
                        onBlur={() => handleBlur('customerPhone')}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-[#202923] focus:outline-none font-mono transition-colors ${
                          errors.customerPhone && touched.customerPhone
                            ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                            : 'border-neutral-300 focus:border-[#1B6044]'
                        }`}
                        aria-invalid={Boolean(errors.customerPhone && touched.customerPhone)}
                      />
                      {errors.customerPhone && touched.customerPhone && (
                        <p className="text-red-600 text-[11px] flex items-center gap-1 mt-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.customerPhone}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Jadwal Pengambilan */}
                <div className="space-y-2.5 pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B6044]">
                    <Clock className="w-4 h-4" />
                    <span>3. Jadwal Pengambilan di Kolam</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="pickupDateInput" className="block text-xs font-medium text-[#6B786F] mb-1">
                        Tanggal Pengambilan <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="pickupDateInput"
                          type="date"
                          min={todayStr}
                          value={pickupDate}
                          onChange={(e) => {
                            setPickupDate(e.target.value);
                            if (errors.pickupDate) setErrors((prev) => ({ ...prev, pickupDate: null }));
                          }}
                          onBlur={() => handleBlur('pickupDate')}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-[#202923] focus:outline-none bg-white transition-colors ${
                            errors.pickupDate && touched.pickupDate
                              ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                              : 'border-neutral-300 focus:border-[#1B6044]'
                          }`}
                          aria-invalid={Boolean(errors.pickupDate && touched.pickupDate)}
                        />
                      </div>
                      {errors.pickupDate && touched.pickupDate && (
                        <p className="text-red-600 text-[11px] flex items-center gap-1 mt-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.pickupDate}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="pickupTimeSelect" className="block text-xs font-medium text-[#6B786F] mb-1">
                        Jam Pengambilan <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="pickupTimeSelect"
                        value={pickupTime}
                        onChange={(e) => {
                          setPickupTime(e.target.value);
                          if (errors.pickupTime) setErrors((prev) => ({ ...prev, pickupTime: null }));
                        }}
                        onBlur={() => handleBlur('pickupTime')}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-[#202923] focus:outline-none bg-white transition-colors ${
                          errors.pickupTime && touched.pickupTime
                            ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                            : 'border-neutral-300 focus:border-[#1B6044]'
                        }`}
                        aria-invalid={Boolean(errors.pickupTime && touched.pickupTime)}
                      >
                        <option value="08:30 WIB">Pagi: 08:30 WIB</option>
                        <option value="10:00 WIB">Pagi: 10:00 WIB</option>
                        <option value="13:30 WIB">Siang: 13:30 WIB</option>
                        <option value="15:30 WIB">Sore: 15:30 WIB (Waktu Panen Ideal)</option>
                        <option value="16:00 WIB">Sore: 16:00 WIB (Waktu Panen Ideal)</option>
                        <option value="16:30 WIB">Sore: 16:30 WIB (Waktu Panen Ideal)</option>
                        <option value="17:00 WIB">Sore: 17:00 WIB</option>
                      </select>
                      {errors.pickupTime && touched.pickupTime && (
                        <p className="text-red-600 text-[11px] flex items-center gap-1 mt-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.pickupTime}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 4. Catatan Opsional */}
                <div className="pt-3 border-t border-neutral-100">
                  <label htmlFor="notesInput" className="block text-xs font-medium text-[#6B786F] mb-1">
                    Catatan Tambahan untuk Petugas Kolam (Opsional)
                  </label>
                  <input
                    id="notesInput"
                    type="text"
                    placeholder="Contoh: Disiangi bersih / minta lele yang lincah siap olah..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-[#202923] focus:border-[#1B6044] focus:outline-none"
                  />
                </div>
              </div>

              {/* Right Column: Preview, Location, Summary, and Submit */}
              <div className="lg:col-span-5 p-6 sm:p-8 bg-[#F8FAF6]/80 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  {/* Product Snapshot */}
                  <div className="bg-white p-3.5 rounded-2xl border border-neutral-200 flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                      <img
                        src={currentProduct?.image_url}
                        alt={currentProduct?.name || 'Ikan lele'}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/public/assets/foto/Ikan_lele_segar_5b6a360e.jpg';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#1B6044] bg-[#E8F3E9] px-2 py-0.5 rounded">
                        Ukuran: {currentProduct?.grade}
                      </span>
                      <h5 className="text-xs font-bold text-[#202923] truncate mt-1">
                        {currentProduct?.name}
                      </h5>
                      <span className="text-xs font-mono font-bold text-[#123F2E]">
                        {formatRupiah(pricePerKg)} / kg
                      </span>
                    </div>
                  </div>

                  {/* Pickup Location Info */}
                  <div className="p-3.5 rounded-2xl bg-white border border-neutral-200 text-xs space-y-1">
                    <span className="font-bold text-[#123F2E] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#1B6044]" />
                      Titik Pengambilan di Lokasi Usaha:
                    </span>
                    <p className="text-[11px] text-neutral-600 leading-relaxed pl-5">
                      {settings.pickup_address}
                    </p>
                    <p className="text-[10px] text-amber-800 bg-amber-50 px-2 py-1 rounded mt-1.5 font-medium">
                      * Seluruh pesanan menggunakan sistem pickup only / ambil di lokasi kolam.
                    </p>
                  </div>

                  {/* Price Breakdown */}
                  <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B786F] block">
                      Ringkasan Biaya Pesanan
                    </span>
                    <div className="flex items-center justify-between text-xs text-neutral-600">
                      <span>Harga Satuan:</span>
                      <span className="font-mono font-medium">{formatRupiah(pricePerKg)} / kg</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-neutral-600">
                      <span>Kuantitas Pesanan:</span>
                      <span className="font-mono font-bold text-[#123F2E]">{Number(quantityKg) || 0} kg</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-neutral-600">
                      <span>Layanan Pengiriman:</span>
                      <span className="font-bold text-[#1B6044]">Rp 0 (Ambil di Kolam)</span>
                    </div>
                    <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#202923]">Estimasi Total:</span>
                      <span className="text-lg font-extrabold text-[#123F2E] font-mono tabular-nums">
                        {formatRupiah(subtotal)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="space-y-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#1B6044] hover:bg-[#123F2E] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Kirim Pesanan Sekarang</span>
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6B786F] pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1B6044]" />
                    <span>Diteruskan langsung ke sistem operasional LeleQu</span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
