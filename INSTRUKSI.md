# Instruksi Menjalankan WebGIS Indonesia

## Persiapan

### Instalasi Dependensi React

1. Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (versi 14 atau lebih baru)
2. Buka terminal dan arahkan ke direktori proyek
3. Install dependensi dengan menjalankan perintah:
   ```
   npm install
   ```
4. Tunggu hingga proses instalasi selesai

### Instalasi Dependensi Python (untuk Scraping Data)

1. Pastikan Anda telah menginstal [Python](https://www.python.org/) (versi 3.6 atau lebih baru)
2. Install dependensi Python dengan menjalankan:
   ```
   cd scripts
   pip install -r requirements.txt
   ```

## Memulai Aplikasi

### Mengumpulkan Data (Opsional)

1. Untuk mengumpulkan data simulasi, jalankan script Python:
   ```
   cd scripts
   python scrape_bps_data.py
   ```
2. Script ini akan membuat data simulasi di folder `src/data/bps`

### Menjalankan Aplikasi Web

1. Kembali ke direktori utama proyek
2. Jalankan server development dengan perintah:
   ```
   npm start
   ```
3. Aplikasi akan otomatis terbuka di browser Anda pada alamat [http://localhost:3000](http://localhost:3000)

## Struktur Proyek

- `/src/components` - Komponen UI reusable
- `/src/pages` - Halaman utama
- `/src/assets` - Gambar, icon, dan resource statis
- `/src/data` - Data GeoJSON dan sumber data lainnya
- `/src/styles` - Style global dan tema
- `/src/utils` - Fungsi utilitas
- `/scripts` - Script Python untuk scraping data

## Membangun untuk Produksi

Untuk membuat versi produksi:

1. Jalankan perintah build:
   ```
   npm run build
   ```
2. Folder `build` akan dibuat dengan file-file yang dioptimalkan

## Troubleshooting

- Jika Anda mengalami masalah dengan Leaflet, pastikan file CSS Leaflet telah diimpor dengan benar
- Jika peta tidak muncul, periksa koneksi internet Anda (peta menggunakan tile dari OpenStreetMap)
- Untuk masalah lainnya, lihat error di console browser atau terminal 