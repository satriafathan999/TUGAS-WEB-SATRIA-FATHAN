# Tugas JavaScript - Halaman Web Interaktif

Halaman web interaktif yang dibuat dengan HTML, CSS, dan JavaScript (tanpa library tambahan).

## Cara menjalankan
Buka file `index.html` di browser (klik dua kali). Tidak perlu instalasi atau koneksi internet.

## Struktur folder
```
tugas-javascript/
+-- index.html    <-- struktur halaman utama
+-- style.css     <-- semua tampilan
+-- script.js     <-- semua logika JavaScript
+-- README.md     <-- penjelasan program
+-- screenshot/   <-- hasil tampilan program
```

## Fitur program

### Proyek utama: Form Pendaftaran Akun
| Fitur wajib | Penerapan |
|---|---|
| Validasi form | Nama tidak boleh kosong, email harus berformat valid (regex), password minimal 8 karakter. Pesan error tampil di bawah masing-masing kolom (bukan `alert`). |
| Manipulasi DOM | **Ubah teks**: `textContent` dipakai untuk pesan error, hitungan karakter password, kartu pratinjau, dan pesan hasil. **Ubah style**: `style.width` dan `style.backgroundColor` untuk bar kekuatan password dan lingkaran pratinjau; `classList` untuk menandai kolom valid/tidak valid. |
| Event handling | **keyup**: validasi langsung saat mengetik. **click**: tampilkan/sembunyikan password, kosongkan form, tombol Daftar (event `submit`). |
| Tampilan UI/UX | Tata letak dua kolom yang menjadi satu kolom di layar kecil, fokus keyboard terlihat, pesan error jelas, fokus otomatis ke kolom yang salah. |
| Kerapian kode | Indentasi konsisten, komentar pada setiap bagian, nama variabel dan fungsi deskriptif, fungsi bantu dipakai ulang. |

### Latihan 1 - Ubah Warna Background
Tombol "Ganti warna" mengubah `document.body.style.backgroundColor` mengikuti array `warna = ['white', 'lightblue', 'yellow']`. Index warna disimpan di variabel `indexWarna` dan bertambah setiap klik (kembali ke 0 setelah warna terakhir memakai `%`).

### Latihan 2 - Tampilkan Nama Mahasiswa
Input nama dan tombol "Sapa". Saat diklik (atau Enter ditekan), halaman menampilkan `Halo, [nama]!` lewat manipulasi DOM. Jika nama kosong, muncul pesan pengingat.

### Latihan 3 - Validasi Form Login
- Username tidak boleh kosong.
- Password minimal 8 karakter.
- Pesan error tampil di bawah masing-masing field, bukan `alert`.
- Jika valid, halaman menampilkan `Login berhasil!`.

## Catatan keamanan
Teks dari pengguna dimasukkan dengan `textContent`, bukan `innerHTML`, sehingga kode HTML yang diketik pengguna tidak ikut dijalankan.

## Screenshot
Folder `screenshot/` berisi tampilan awal, validasi error, berhasil, Latihan 1, Latihan 3, dan tampilan mobile.
