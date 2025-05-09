# Milestones-P.0

# Milestone-Project

# Tastéra Cakery - Milestones Phase 0 Project

Tastéra Cakery adalah website company profile dan pemesanan produk kue berbasis HTML, CSS, JavaScript, dan PHP yang berbasis database lokal.

---

## Fitur Utama

### Halaman Frontend
- `Home (index.php)`: Menampilkan deskripsi toko dan kategori produk
- `Products`: Pilihan menu dengan 3 kategori (Cake, Cookies, Parcel) : masing-masing 3 menu setiap kategori
- `Gallery`: Beberapa Foto kue
- `About Us`: Cerita tentang Tastéra Cakery
- `Contact Us`: Form untuk pelanggan yang mau mengirimkan pesan ke Tastéra Cakery
- `Order`: Form pemesanan dengan slot order tersbatas setiap tanggalnya dan penghitungan total yang dihitung otomatis
- `Login & Register`: Daftar dan login user

### Backend (PHP + MySQL via XAMPP - lokal)
- Form register: Simpan user ke database dengan password hash
- Form login: Verifikasi user
- Contact form: Simpan pesan pelanggan ke database
- Order form: Hitung total harga, tampilkan ringkasan, validasi slot per tanggal (via JavaScript + localStorage - web)

---

## Teknologi yang Digunakan

- **Frontend**: HTML5, Bootstrap 5, Custom CSS
- **Interaktivitas**: JavaScript, localStorage
- **Backend**: PHP (XAMPP)
- **Database**: lokal - MySQL (phpMyAdmin)
- **Deployment**: netlify dan lokal

---

## Struktur Folder
image : untuk databse semua gambar
js : untuk file js
css : untuk file css
File .html atau .php dan readme langsung pada folder tanpa masuk subfolder 


## Cara Menjalankan (Localhost)
1. Buka aplikasi XAMPP
2. Jalankan Apache dan MySQL di xampp
3. Buat folder `tastera-milestones` di dalam `htdocs`
4. Paste local seluruh file ke folder `tastera-milestones`
5. buat dan pakai database `tastera_db` di phpmyadmin
6. Buat table contact_messages dan users
7. buka http://localhost/tastera-milestones/index.php

