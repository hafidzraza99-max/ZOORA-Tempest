# Clottfits.page — E-Commerce Reworked Fashion

Prototype website e-commerce untuk proyek **“Membangun Website E-Commerce Fungsional dengan Integrasi Strategi Bisnis Modern”**. Clottfits.page menjual kemeja preloved yang dirework menjadi koleksi fashion unik, modern, dan terbatas.

## Tautan Proyek

- Repository GitHub: _tambahkan tautan repository di sini_
- GitHub Pages: _tambahkan tautan website aktif di sini_
- Video demo (opsional): _tambahkan tautan video di sini_

## Ikhtisar Bisnis

### Nama dan deskripsi

**Clottfits.page** adalah brand fashion upcycling yang mengolah kemeja bekas pilihan menjadi kemeja boxy, model beraksen Cheongsam, serta koleksi terbatas. Setiap produk dipilih dan dirework untuk memperpanjang masa pakai pakaian sekaligus menghasilkan tampilan baru yang lebih berkarakter.

### Proposisi nilai

> Reworked. Unique. Made to Stand Out.

- Produk terbatas dengan karakter yang berbeda.
- Memadukan fashion modern, thrift, dan upcycling.
- Detail desain khas, termasuk aksen kancing Cheongsam.
- Memberi alternatif fashion yang lebih berkelanjutan.

## Target Pasar dan Analisis Pasar

| Aspek       | Sasaran                                                                           |
| ----------- | --------------------------------------------------------------------------------- |
| Demografis  | Usia 17–30 tahun; pelajar, mahasiswa, dan pekerja muda dengan daya beli menengah. |
| Geografis   | Konsumen di Indonesia yang terbiasa berbelanja online.                            |
| Psikografis | Menyukai thrift, streetwear, vintage, dan produk tidak massal.                    |
| Perilaku    | Aktif di Instagram, TikTok, marketplace, serta tertarik pada tren fashion unik.   |

Peluang utama berasal dari meningkatnya minat terhadap thrift dan produk upcycling. Kompetitor meliputi toko thrift online, brand fashion lokal, penjual vintage, dan UMKM upcycling. Keunggulan Clottfits.page terletak pada proses rework, stok terbatas, identitas visual konsisten, serta detail desain Cheongsam.

## Strategi Bisnis

### Model bisnis dan pendapatan

Clottfits.page menggunakan model **Business to Consumer (B2C)**. Pendapatan berasal dari penjualan langsung koleksi Kemeja Boxy, Kemeja Cheongsam, dan Limited Edition melalui website.

### Manajemen produk dan katalog

Katalog berisi **12 produk** dengan foto, nama, harga, kategori, deskripsi, dan stok. Kategori yang dikelola adalah:

- Kemeja Boxy — potongan modern, santai, dan mudah dipadukan.
- Kemeja Cheongsam — detail kancing khas untuk tampilan unik.
- Limited Edition — koleksi eksklusif dengan jumlah terbatas.

Foto produk berada di folder `image/` dan dinamai konsisten dari `produk-01.jpeg` sampai `produk-12.jpeg`.

### Harga, promosi, dan diskon

Harga menggunakan pendekatan **value-based pricing** dengan mempertimbangkan biaya bahan, proses rework, aksesori, tingkat keunikan, dan margin. Promosi direncanakan melalui konten Instagram/TikTok, OOTD, video proses rework, kolaborasi kreator, flash sale, giveaway, dan diskon musiman.

## Fitur Website

### Akses pengguna dan admin

- Halaman login awal dengan pilihan peran pengguna atau admin.
- Pengguna memasukkan nama untuk masuk ke toko.
- Admin menggunakan akun demo: `admin` / `clottfits123`.
- Halaman admin diproteksi berdasarkan peran login.

### Halaman pembeli

- Navbar, hero banner, banner tentang, benefit, dan footer.
- Katalog 12 produk yang responsif.
- Pencarian produk dan filter kategori.
- Detail produk.
- Tambah ke keranjang, ubah jumlah, hapus item, serta total otomatis.
- Keranjang disimpan di `localStorage`.
- Animasi dan pengguliran halus.

### Checkout dan simulasi pembayaran

Checkout menyediakan validasi data pelanggan, alamat, pengiriman, dan pilihan metode pembayaran. Metode yang disimulasikan meliputi QRIS, GoPay, DANA, OVO, dan transfer bank. Sistem ini adalah **simulasi**, sehingga tidak memproses uang asli atau terhubung ke payment gateway produksi.

Alur transaksi:

1. Pengguna login dan memilih produk.
2. Produk dimasukkan ke keranjang dan disimpan di `localStorage`.
3. Pengguna mengisi formulir checkout serta memilih pengiriman dan pembayaran.
4. Formulir divalidasi, lalu pesanan disimpan secara lokal.
5. Pesanan dapat dipantau di dashboard admin.

### Dashboard admin

- Statistik produk, pesanan, pelanggan, dan pendapatan.
- Tambah, edit, dan hapus produk.
- Pemulihan katalog bawaan untuk data lama.
- Daftar pesanan, detail pesanan, dan perubahan status pesanan.
- Data pelanggan dari pesanan yang masuk.

## Analitik, SEO, Keamanan, dan Pemeliharaan

### Google Analytics

Script Google Analytics dummy tersedia pada halaman utama sebagai placeholder integrasi. Saat website dipublikasikan, ID dummy perlu diganti dengan Measurement ID Google Analytics yang valid.

Metrik yang akan dipantau:

- Jumlah pengunjung dan sumber trafik.
- Bounce rate / engagement rate.
- Produk dan kategori yang paling sering dilihat.
- Penggunaan pencarian dan filter.
- Konversi dari katalog ke keranjang, checkout, hingga pesanan.
- Perangkat yang digunakan pengunjung untuk evaluasi responsivitas.

### SEO

- Judul halaman yang relevan dan deskriptif.
- Struktur HTML semantik.
- Teks alternatif pada gambar produk dan banner.
- Kata kunci relevan: `reworked fashion`, `upcycle fashion`, `kemeja boxy`, dan `fashion preloved`.
- Rencana lanjutan: sitemap, meta description per halaman, dan Open Graph untuk media sosial.

### Keamanan dan pemeliharaan

Versi prototype menggunakan `localStorage`; akun admin dan pembayaran bersifat demo. Pada versi produksi, autentikasi harus memakai server, password yang di-hash, koneksi HTTPS, validasi input sisi server, database, serta payment gateway resmi seperti Midtrans atau Xendit. Pemeliharaan meliputi pembaruan katalog, pengecekan stok, backup data, pengujian lintas perangkat, dan evaluasi analitik berkala.

## Teknologi dan Implementasi

- HTML5
- CSS3, Flexbox, CSS Grid, dan media query
- JavaScript modern (ES6+)
- `localStorage` untuk data login demo, keranjang, katalog, dan pesanan
- Google Analytics dummy
- Git, GitHub, dan GitHub Pages

Website dibuat dengan HTML, CSS, dan JavaScript vanilla tanpa framework agar implementasi dasar front-end dapat dipahami langsung.

## Responsivitas

Tampilan dirancang untuk desktop, tablet, dan seluler. Layout katalog, checkout, detail produk, dashboard admin, navigasi, banner, dan formulir menggunakan breakpoint media query agar tetap mudah digunakan pada layar kecil.

## Struktur Folder

```text
CLOTTFITS.PAGE/
├── index.html              # Halaman toko dan katalog
├── detail.html             # Halaman detail produk
├── checkout.html           # Halaman checkout
├── login.html              # Login pengguna dan admin
├── admin.html              # Dashboard admin
├── README.md
├── css/
│   ├── style.css            # Gaya halaman toko
│   └── admin.css            # Gaya dashboard admin
├── js/
│   ├── auth.js              # Proteksi akses berdasarkan peran
│   ├── script.js            # Katalog dan keranjang
│   └── admin.js             # Manajemen katalog dan pesanan
└── image/
    ├── logo .jpeg
    ├── banner.jpeg
    ├── banner tentang.jpeg
    └── produk-01.jpeg ... produk-12.jpeg
```

## Cara Menjalankan

1. Unduh atau clone repository.
2. Buka `login.html` melalui browser atau Live Server.
3. Masuk sebagai pengguna untuk mengakses toko, atau gunakan akun admin demo untuk dashboard.

## Dokumentasi Pengumpulan

Sebelum dikumpulkan, lengkapi bagian berikut:

- [ ] Tautan repository GitHub pada bagian **Tautan Proyek**.
- [ ] Tautan GitHub Pages yang aktif.
- [ ] Minimal 8–10 commit Git yang bermakna.
- [ ] Minimal empat screenshot: beranda desktop, katalog/keranjang, checkout, dan tampilan mobile.
- [ ] Video demo 2–3 menit (opsional).

## Catatan

Proyek ini dibuat untuk kebutuhan pembelajaran dan demonstrasi e-commerce. Gambar dan data transaksi digunakan untuk prototype, bukan sistem penjualan produksi.
