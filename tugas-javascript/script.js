/* =========================================================
   script.js - semua logika JavaScript
   Isi:
   A. Fungsi bantu (dipakai bersama)
   B. Proyek utama: Form Pendaftaran
   C. Latihan 1: Ubah warna background
   D. Latihan 2: Tampilkan nama mahasiswa
   E. Latihan 3: Validasi form login
   ========================================================= */
'use strict';

/* ---------------------------------------------------------
   A. FUNGSI BANTU
   --------------------------------------------------------- */

// Pola email sederhana: ada teks, tanda @, domain, titik, lalu akhiran minimal 2 huruf
const POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_PASSWORD = 8;

// Menampilkan pesan error (atau mengosongkannya) di bawah sebuah input.
// pesan === '' artinya input valid.
function tampilkanPesan(input, elemenPesan, pesan) {
  elemenPesan.textContent = pesan;                                   // ubah teks
  input.classList.toggle('tidak-valid', pesan !== '');               // ubah style (merah)
  input.classList.toggle('valid', pesan === '' && input.value.trim() !== '');
  input.setAttribute('aria-invalid', pesan !== '' ? 'true' : 'false');
}

// Mengembalikan input ke tampilan awal (tanpa error, tanpa warna)
function bersihkanStatus(input, elemenPesan) {
  elemenPesan.textContent = '';
  input.classList.remove('tidak-valid', 'valid');
  input.removeAttribute('aria-invalid');
}

// Tiga fungsi pemeriksa. Masing-masing mengembalikan teks error, atau '' jika valid.
function cekNama(nilai) {
  if (nilai.trim() === '') return 'Nama tidak boleh kosong.';
  return '';
}

function cekEmail(nilai) {
  const email = nilai.trim();
  if (email === '') return 'Email tidak boleh kosong.';
  if (!POLA_EMAIL.test(email)) return 'Format email tidak valid. Contoh: nama@contoh.com';
  return '';
}

function cekPassword(nilai) {
  if (nilai === '') return 'Password tidak boleh kosong.';
  if (nilai.length < MIN_PASSWORD) {
    return 'Password minimal ' + MIN_PASSWORD + ' karakter (sekarang ' + nilai.length + ').';
  }
  return '';
}

// Tombol Tab dan Shift hanya memindahkan fokus, jadi tidak perlu memicu validasi
function tombolPindahFokus(event) {
  return event.key === 'Tab' || event.key === 'Shift';
}

/* ---------------------------------------------------------
   B. PROYEK UTAMA: FORM PENDAFTARAN
   --------------------------------------------------------- */

// Mengambil elemen yang dibutuhkan
const formDaftar = document.getElementById('form-daftar');
const inputNama = document.getElementById('nama');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');

const errorNama = document.getElementById('error-nama');
const errorEmail = document.getElementById('error-email');
const errorPassword = document.getElementById('error-password');

const tombolToggle = document.getElementById('toggle-password');
const tombolKosongkan = document.getElementById('btn-kosongkan');
const hasilDaftar = document.getElementById('hasil-daftar');

const hintJumlah = document.getElementById('hint-jumlah');
const meterBar = document.getElementById('meter-bar');
const meterLabel = document.getElementById('meter-label');

const previewBadge = document.getElementById('preview-badge');
const previewNama = document.getElementById('preview-nama');
const previewEmail = document.getElementById('preview-email');
const previewStatus = document.getElementById('preview-status');

// Warna dan label untuk indikator kekuatan password (indeks = skor 0-4)
const labelKekuatan = ['belum diisi', 'lemah', 'cukup', 'baik', 'kuat'];
const warnaKekuatan = ['#9aa5b8', '#b3261e', '#d97706', '#2f7fc1', '#1c7043'];

// Warna lingkaran pratinjau (indeks = jumlah kolom yang valid, 0-3)
const warnaBadge = ['#9aa5b8', '#d97706', '#d97706', '#1c7043'];

// Menghitung skor kekuatan password (0-4)
function hitungKekuatan(password) {
  if (password === '') return 0;
  if (password.length < MIN_PASSWORD) return 1;   // belum memenuhi syarat minimal

  let skor = 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) skor++;  // huruf besar dan kecil
  if (/\d/.test(password)) skor++;                                // ada angka
  if (/[^A-Za-z0-9]/.test(password)) skor++;                      // ada simbol
  return skor;
}

// Memperbarui teks hitungan karakter dan bar kekuatan password
function perbaruiKekuatan() {
  const password = inputPassword.value;
  const skor = hitungKekuatan(password);

  hintJumlah.textContent = password.length + ' dari ' + MIN_PASSWORD + ' karakter minimum';
  meterLabel.textContent = labelKekuatan[skor];
  meterBar.style.width = (skor * 25) + '%';
  meterBar.style.backgroundColor = warnaKekuatan[skor];
}

// Memperbarui kartu pratinjau di samping form
function perbaruiPratinjau() {
  const nama = inputNama.value.trim();
  const email = inputEmail.value.trim();

  // Menghitung kolom valid tanpa menampilkan pesan error
  const jumlahValid = [
    cekNama(inputNama.value) === '',
    cekEmail(inputEmail.value) === '',
    cekPassword(inputPassword.value) === ''
  ].filter(Boolean).length;

  // textContent dipakai (bukan innerHTML) agar input pengguna tidak dibaca sebagai HTML
  previewNama.textContent = nama !== '' ? nama : 'Nama belum diisi';
  previewEmail.textContent = email !== '' ? email : 'Email belum diisi';
  previewStatus.textContent = jumlahValid + ' dari 3 kolom valid';
  previewBadge.textContent = nama !== '' ? nama.charAt(0).toUpperCase() : '?';
  previewBadge.style.backgroundColor = warnaBadge[jumlahValid];
}

// Fungsi validasi per kolom: menampilkan pesan dan mengembalikan true/false
function validasiNama() {
  const pesan = cekNama(inputNama.value);
  tampilkanPesan(inputNama, errorNama, pesan);
  return pesan === '';
}

function validasiEmail() {
  const pesan = cekEmail(inputEmail.value);
  tampilkanPesan(inputEmail, errorEmail, pesan);
  return pesan === '';
}

function validasiPassword() {
  const pesan = cekPassword(inputPassword.value);
  tampilkanPesan(inputPassword, errorPassword, pesan);
  return pesan === '';
}

// Menampilkan kotak hasil dengan jenis 'sukses' atau 'gagal'
function tampilkanHasil(elemen, jenis, teks) {
  elemen.textContent = teks;
  elemen.classList.remove('sukses', 'gagal');
  if (jenis !== '') elemen.classList.add(jenis);
}

/* ----- EVENT: keyup (validasi langsung saat mengetik) ----- */
inputNama.addEventListener('keyup', function (event) {
  if (!tombolPindahFokus(event)) validasiNama();
  perbaruiPratinjau();
});

inputEmail.addEventListener('keyup', function (event) {
  if (!tombolPindahFokus(event)) validasiEmail();
  perbaruiPratinjau();
});

inputPassword.addEventListener('keyup', function (event) {
  if (!tombolPindahFokus(event)) validasiPassword();
  perbaruiKekuatan();
  perbaruiPratinjau();
});

/* ----- EVENT: click (tampilkan/sembunyikan password) ----- */
tombolToggle.addEventListener('click', function () {
  const sedangTersembunyi = inputPassword.type === 'password';
  inputPassword.type = sedangTersembunyi ? 'text' : 'password';
  tombolToggle.textContent = sedangTersembunyi ? 'Sembunyikan' : 'Tampilkan';
});

/* ----- EVENT: submit (terpicu saat tombol Daftar diklik atau Enter ditekan) ----- */
formDaftar.addEventListener('submit', function (event) {
  event.preventDefault();   // cegah halaman memuat ulang

  // Semua kolom diperiksa (tidak berhenti di error pertama) agar semua pesan tampil
  const namaValid = validasiNama();
  const emailValid = validasiEmail();
  const passwordValid = validasiPassword();
  perbaruiPratinjau();

  if (namaValid && emailValid && passwordValid) {
    tampilkanHasil(
      hasilDaftar,
      'sukses',
      'Pendaftaran berhasil! Selamat datang, ' + inputNama.value.trim() + '.'
    );
  } else {
    tampilkanHasil(hasilDaftar, 'gagal', 'Pendaftaran belum berhasil. Perbaiki kolom yang ditandai merah.');

    // Pindahkan fokus ke kolom pertama yang salah
    if (!namaValid) inputNama.focus();
    else if (!emailValid) inputEmail.focus();
    else inputPassword.focus();
  }
});

/* ----- EVENT: click (kosongkan form) ----- */
tombolKosongkan.addEventListener('click', function () {
  formDaftar.reset();
  bersihkanStatus(inputNama, errorNama);
  bersihkanStatus(inputEmail, errorEmail);
  bersihkanStatus(inputPassword, errorPassword);

  // Kembalikan password ke mode tersembunyi
  inputPassword.type = 'password';
  tombolToggle.textContent = 'Tampilkan';

  tampilkanHasil(hasilDaftar, '', '');
  perbaruiKekuatan();
  perbaruiPratinjau();
  inputNama.focus();
});

/* ---------------------------------------------------------
   C. LATIHAN 1: UBAH WARNA BACKGROUND
   --------------------------------------------------------- */
const tombolWarna = document.getElementById('btn-warna');
const teksWarna = document.getElementById('teks-warna');

const warna = ['white', 'lightblue', 'yellow'];          // daftar warna (minimal 3)
const namaWarna = ['Putih', 'Biru muda', 'Kuning'];       // nama untuk ditampilkan
let indexWarna = 0;                                       // index warna yang sedang aktif

tombolWarna.addEventListener('click', function () {
  // Tambah index; operator % membuat index kembali ke 0 setelah warna terakhir
  indexWarna = (indexWarna + 1) % warna.length;

  document.body.style.backgroundColor = warna[indexWarna];
  teksWarna.textContent = 'Warna aktif: ' + namaWarna[indexWarna];
});

/* ---------------------------------------------------------
   D. LATIHAN 2: TAMPILKAN NAMA MAHASISWA
   --------------------------------------------------------- */
const inputMhs = document.getElementById('input-mhs');
const tombolSapa = document.getElementById('btn-sapa');
const teksSapaan = document.getElementById('teks-sapaan');

function tampilkanSapaan() {
  const nama = inputMhs.value.trim();

  if (nama === '') {
    tampilkanHasil(teksSapaan, 'gagal', 'Nama belum diisi. Ketik nama dulu, lalu klik Sapa.');
    inputMhs.focus();
    return;
  }

  tampilkanHasil(teksSapaan, 'sukses', 'Halo, ' + nama + '!');
}

tombolSapa.addEventListener('click', tampilkanSapaan);

// Tombol Enter di kolom nama bekerja sama seperti klik tombol Sapa
inputMhs.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') tampilkanSapaan();
});

/* ---------------------------------------------------------
   E. LATIHAN 3: VALIDASI FORM LOGIN
   --------------------------------------------------------- */
const formLogin = document.getElementById('form-login');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const errorLoginUsername = document.getElementById('error-login-username');
const errorLoginPassword = document.getElementById('error-login-password');
const hasilLogin = document.getElementById('hasil-login');

let sudahCobaLogin = false;   // validasi langsung baru aktif setelah pengguna menekan Masuk

function validasiLoginUsername() {
  const pesan = loginUsername.value.trim() === '' ? 'Username tidak boleh kosong.' : '';
  tampilkanPesan(loginUsername, errorLoginUsername, pesan);
  return pesan === '';
}

function validasiLoginPassword() {
  const pesan = cekPassword(loginPassword.value);
  tampilkanPesan(loginPassword, errorLoginPassword, pesan);
  return pesan === '';
}

formLogin.addEventListener('submit', function (event) {
  event.preventDefault();
  sudahCobaLogin = true;

  const usernameValid = validasiLoginUsername();
  const passwordValid = validasiLoginPassword();

  if (usernameValid && passwordValid) {
    tampilkanHasil(hasilLogin, 'sukses', 'Login berhasil!');
  } else {
    tampilkanHasil(hasilLogin, '', '');   // sembunyikan pesan sukses jika masih ada error
    if (!usernameValid) loginUsername.focus();
    else loginPassword.focus();
  }
});

// Setelah percobaan pertama, error diperbarui langsung saat pengguna mengetik
loginUsername.addEventListener('keyup', function (event) {
  if (sudahCobaLogin && !tombolPindahFokus(event)) validasiLoginUsername();
});

loginPassword.addEventListener('keyup', function (event) {
  if (sudahCobaLogin && !tombolPindahFokus(event)) validasiLoginPassword();
});

/* ---------------------------------------------------------
   Keadaan awal halaman
   --------------------------------------------------------- */
perbaruiKekuatan();
perbaruiPratinjau();
