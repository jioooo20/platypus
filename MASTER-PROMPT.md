# MASTER PROMPT — PENGEMBANGAN GAME BROWSER 2.5D SHOOT-'EM-UP DENGAN THREE.JS

## 1. Peran dan tujuan

Bertindak sebagai Senior Game Developer, 3D Technical Artist, Backend Developer, QA Engineer, dan Autonomous Coding Agent.

Tugasmu adalah membangun game browser bergenre 2.5D shoot-'em-up yang terinspirasi oleh permainan klasik seperti Platypus, tetapi memiliki identitas visual, desain karakter, level, efek, dan aset yang orisinal.

Kamu bertanggung jawab atas seluruh proses pengembangan:

1. Memeriksa lingkungan dan ruang kerja.
2. Merancang arsitektur proyek.
3. Membuat aset 3D langsung melalui kode Three.js.
4. Mengimplementasikan mekanika permainan.
5. Membangun backend dan papan peringkat.
6. Membuat antarmuka, audio, dan efek visual.
7. Menguji, memperbaiki, dan memverifikasi hasil.
8. Menyiapkan dokumentasi serta instruksi menjalankan proyek.

**Jangan berhenti pada perencanaan, prototipe kosong, atau kode yang belum terintegrasi.** Implementasikan proyek secara langsung di ruang kerja yang tersedia. Ambil keputusan teknis yang masuk akal tanpa terus-menerus meminta persetujuan untuk keputusan implementasi rutin.

Jika suatu alat atau kemampuan tidak tersedia, gunakan alternatif yang layak dan lanjutkan pekerjaan. Jangan mengklaim fitur, aset, pengujian, atau deployment berhasil sebelum hasilnya benar-benar diverifikasi.

---

## 2. Visi dan identitas game

Buat game dengan karakteristik berikut:

- Platform: browser desktop modern.
- Genre: shoot-'em-up dengan pesawat yang bergerak horizontal dan vertikal.
- Dimensi visual: 2.5D, menggunakan objek 3D dengan gameplay pada bidang dua dimensi.
- Teknologi rendering: Three.js secara langsung.
- Bahasa pemrograman utama: TypeScript.
- Gaya visual: modern, ilustratif, berwarna, kaya detail, dan memiliki identitas artistik yang konsisten.
- Mode: pemain tunggal.
- Bahasa antarmuka: Bahasa Indonesia.
- Referensi: permainan klasik seperti Platypus sebagai inspirasi umum, bukan sebagai sumber aset atau desain yang disalin.

Hasil akhir harus terasa seperti game yang dirancang oleh tim pengembang game, bukan sekadar demonstrasi teknologi atau kumpulan objek primitif berwarna.

Prioritaskan siluet karakter yang kuat, desain musuh yang mudah dibedakan, animasi yang meyakinkan, efek tembakan yang memuaskan, dan lingkungan yang memiliki kedalaman visual.

Jangan menyalin karakter, aset, logo, musik, level, atau desain khas milik game komersial yang sudah ada.

---

## 3. Teknologi wajib

### 3.1 Frontend dan game engine

Gunakan:

- Three.js untuk seluruh rendering dan pembuatan aset 3D.
- TypeScript untuk logika permainan dan pembuatan model prosedural.
- Vite sebagai server pengembangan dan alat build frontend.
- HTML dan CSS untuk menu, HUD, layar akhir, serta elemen antarmuka.
- Web Audio API atau pendekatan audio browser yang sesuai.
- Vitest untuk pengujian unit.

Gunakan Three.js secara langsung, bukan melalui mesin game lain.

**Jangan menggunakan Blender desktop, Unity, Godot, Phaser, PlayCanvas, atau mesin game lain sebagai bagian wajib dari proyek.**

Tidak boleh ada ketergantungan pada aplikasi pemodelan 3D eksternal untuk membuat, mengubah, atau menjalankan aset permainan.

### 3.2 Backend

Gunakan:

- Node.js.
- TypeScript.
- Fastify sebagai server API HTTP.
- Penyimpanan papan peringkat dalam memori proses backend.
- Vitest atau alat pengujian yang sesuai.

### 3.3 Prinsip arsitektur

1. Pisahkan frontend dan backend dalam satu repositori.
2. Pisahkan rendering, gameplay, aset, antarmuka, audio, dan komunikasi API.
3. Hindari satu file besar yang menampung seluruh logika.
4. Gunakan tipe TypeScript secara konsisten dan hindari `any` tanpa alasan yang kuat.
5. Hindari dependensi yang tidak diperlukan.
6. Jangan menggunakan basis data atau layanan penyimpanan eksternal.
7. Jangan menambahkan sistem akun atau autentikasi.
8. Pastikan game inti tetap bisa dimainkan ketika backend tidak tersedia.
9. Sediakan perintah tingkat akar proyek untuk menjalankan frontend dan backend, pengujian, pemeriksaan tipe, serta build produksi.
10. Pilih versi paket yang stabil dan kompatibel, lalu dokumentasikan keputusan teknis yang penting.

---

## 4. Pemeriksaan lingkungan dan kemampuan agen

Sebelum mengimplementasikan proyek, periksa lingkungan kerja secara nyata.

Periksa:

- Sistem operasi dan direktori kerja.
- Ketersediaan Node.js dan npm atau package manager yang sesuai.
- Ketersediaan terminal dan izin membaca serta menulis berkas.
- Kondisi repositori dan berkas yang sudah tersedia.
- Kemampuan menjalankan server lokal.
- Ketersediaan browser dan otomasi browser.
- Ketersediaan alat pembuatan gambar AI jika diperlukan untuk referensi artistik.
- Kemampuan menjalankan perintah build dan pengujian.

Jangan menjadikan Blender, Python untuk pemodelan 3D, generator model 3D eksternal, layanan AI berbayar, atau akses internet sebagai prasyarat pembuatan aset.

Pembuatan model 3D harus tetap dapat dilakukan menggunakan Three.js dan kode TypeScript di dalam proyek.

Setelah pemeriksaan, susun rencana kerja singkat dan langsung lanjutkan implementasi. Jangan menghabiskan waktu mencoba alat eksternal yang tidak diperlukan.

---

## 5. Sistem pembuatan aset 3D langsung dengan Three.js

Bagian ini merupakan persyaratan utama proyek.

**Seluruh model 3D utama harus dibuat secara prosedural menggunakan Three.js.** Model dibuat melalui kode TypeScript, bukan melalui aplikasi pemodelan eksternal.

Aset yang dibuat harus berupa objek 3D yang benar-benar dapat dirender, diberi material, dianimasikan, dan diintegrasikan dengan gameplay.

### 5.1 Teknik pemodelan

Gunakan kombinasi teknik berikut sesuai kebutuhan:

- `BufferGeometry` untuk geometri khusus.
- `Shape` dan `ExtrudeGeometry` untuk bentuk dengan kontur yang dirancang.
- `LatheGeometry` untuk bentuk yang memiliki simetri putar.
- `TubeGeometry` untuk pipa, kabel, atau elemen melengkung.
- `CylinderGeometry`, `SphereGeometry`, dan geometri bawaan lainnya sebagai komponen pendukung.
- `MeshStandardMaterial` atau material lain yang sesuai.
- Shader khusus jika benar-benar meningkatkan hasil visual.
- `Group` untuk menyusun komponen model.
- Transformasi geometri dan mesh untuk menghasilkan bentuk kompleks.
- Tekstur prosedural melalui Canvas API jika diperlukan dan sesuai.
- Normal, pencahayaan, serta material yang dirancang untuk menghasilkan kedalaman visual.

Jangan membatasi diri pada geometri bawaan. Buat geometri khusus ketika bentuk pesawat, sayap, badan musuh, atau bagian bos membutuhkannya.

Gunakan objek primitif sebagai bahan penyusun, bukan sebagai hasil akhir yang dibiarkan tanpa pengolahan artistik.

### 5.2 Standar artistik

Setiap model harus dirancang dengan memperhatikan:

1. **Siluet:** bentuk tetap mudah dikenali ketika dilihat dari ukuran permainan yang sebenarnya.
2. **Proporsi:** bagian-bagian model memiliki hubungan ukuran yang disengaja.
3. **Lapisan bentuk:** gunakan komponen utama, panel, pelindung, mesin, sirip, atau elemen pendukung untuk menciptakan kompleksitas visual.
4. **Material:** bedakan permukaan logam, kaca, bagian bercahaya, dan bagian berwarna.
5. **Warna:** gunakan palet yang konsisten dan identitas warna untuk setiap jenis entitas.
6. **Pencahayaan:** manfaatkan pencahayaan dan bayangan secara proporsional agar bentuk terbaca.
7. **Animasi:** tambahkan gerakan pada bagian yang relevan, misalnya mesin, sayap mekanis, bagian bos, atau komponen bercahaya.
8. **Keterbacaan gameplay:** detail tidak boleh membuat proyektil, musuh, atau pemain sulit dibedakan.
9. **Performa:** batasi kompleksitas geometri dan jumlah objek sesuai kebutuhan.

Jangan menganggap model selesai hanya karena dapat ditampilkan di layar.

### 5.3 Model pesawat pemain

Buat satu pesawat pemain dengan identitas visual orisinal.

Model minimal memiliki:

- Badan utama dengan bentuk khusus.
- Sayap dengan proporsi yang jelas.
- Kokpit atau bagian kepala pesawat.
- Mesin atau pendorong.
- Detail permukaan atau panel.
- Elemen bercahaya pada bagian yang sesuai.
- Animasi mesin atau efek pendorong.

Gunakan beberapa lapisan geometri dan material. Hindari desain yang hanya terdiri dari satu kerucut atau beberapa kotak.

Buat fungsi atau kelas pembuat model yang memungkinkan perubahan warna, ukuran, dan variasi visual tanpa mengubah sistem gameplay.

### 5.4 Model musuh

Buat sedikitnya tiga tipe musuh dengan siluet dan karakter visual yang berbeda.

Contoh arah desain:

- Musuh kecil dan lincah dengan badan ramping.
- Musuh penembak dengan badan lebar dan komponen senjata yang terlihat.
- Musuh berat dengan lapisan pelindung dan struktur yang lebih masif.

Contoh tersebut bukan batasan mutlak. Kembangkan desain yang lebih menarik jika sesuai dengan arah artistik.

Setiap tipe musuh harus mempunyai:

- Geometri dan proporsi yang berbeda.
- Palet warna atau material yang membedakan.
- Identitas animasi yang sesuai.
- Titik tembak yang sesuai dengan model.
- Bentuk tabrakan yang sesuai dengan area gameplay.

Jangan hanya menduplikasi model yang sama dan mengganti warnanya.

### 5.5 Model bos

Buat satu bos dengan kompleksitas visual yang jelas lebih tinggi daripada musuh biasa.

Bos harus memiliki:

- Siluet yang besar dan mudah dikenali.
- Badan utama dengan beberapa lapisan geometri.
- Komponen senjata atau titik serangan yang terlihat.
- Bagian tambahan seperti sayap, pelindung, meriam, mesin, atau struktur mekanis.
- Material dan warna yang konsisten.
- Animasi idle atau gerakan yang memberi kesan hidup.
- Efek visual ketika menyerang atau menerima kerusakan.

Jika desain mendukungnya, buat beberapa bagian bos sebagai objek terpisah agar dapat dianimasikan atau digunakan untuk memberikan umpan balik visual.

Pastikan bos tidak sekadar menjadi pesawat biasa yang diperbesar.

### 5.6 Proyektil dan efek visual

Buat aset prosedural untuk:

- Proyektil pemain.
- Proyektil musuh.
- Efek pendorong.
- Ledakan.
- Kilatan tembakan.
- Percikan benturan.
- Efek kerusakan bos.
- Efek transisi atau kemunculan musuh.

Gunakan kombinasi geometri, material bercahaya, partikel, animasi skala, transparansi, dan shader jika sesuai.

Efek harus memberikan umpan balik yang jelas tanpa menutupi area permainan secara berlebihan.

### 5.7 Lingkungan dan latar

Buat lingkungan yang memberikan kesan kedalaman dan gerakan.

Gunakan:

- Beberapa lapisan parallax.
- Bentuk latar prosedural.
- Objek lingkungan dengan variasi ukuran dan jarak.
- Kabut, cahaya, atau partikel jika sesuai.
- Variasi warna dan pencahayaan antarbagian permainan.

Latar harus mendukung objek gameplay, bukan mengalahkan keterbacaannya.

Hindari latar statis berupa satu warna polos sebagai hasil akhir.

### 5.8 Organisasi kode aset

Buat modul pembuat aset yang terpisah, misalnya:

- `createPlayerModel.ts`
- `createScoutEnemyModel.ts`
- `createShooterEnemyModel.ts`
- `createHeavyEnemyModel.ts`
- `createBossModel.ts`
- `createProjectileModel.ts`
- `createExplosionEffect.ts`
- `createEnvironment.ts`

Nama dan jumlah berkas dapat disesuaikan dengan arsitektur aktual.

Setiap modul harus mempunyai tanggung jawab yang jelas. Hindari membuat satu fungsi raksasa yang menghasilkan seluruh aset game.

Pisahkan data visual dari logika gameplay sejauh masuk akal. Sistem kesehatan dan tabrakan tidak boleh bergantung pada detail implementasi material.

Jika sebuah model terdiri dari beberapa bagian, gunakan struktur `Group` yang mudah dipahami dan dianimasikan.

Buat fungsi pembersihan sumber daya untuk geometri, material, tekstur, dan objek sementara yang tidak lagi digunakan.

### 5.9 Pemeriksaan aset

Setiap aset harus diperiksa setelah dibuat.

Verifikasi:

- Model tampil dengan benar di scene.
- Orientasi dan skalanya sesuai.
- Material dan warna tidak rusak.
- Siluet terlihat jelas dari kamera gameplay.
- Animasi berjalan sebagaimana mestinya.
- Efek tidak menimbulkan kesalahan rendering.
- Model tetap terbaca pada ukuran permainan yang sebenarnya.
- Jumlah objek dan kompleksitas geometri masih masuk akal.

Jika browser dan alat tangkapan layar tersedia, periksa hasil visual melalui browser. Perbaiki bentuk yang tampak generik, tidak proporsional, atau sulit dibedakan.

Jika pembuatan gambar AI tersedia, gambar hanya boleh digunakan sebagai referensi artistik opsional. Gambar konsep bukan model 3D dan tidak boleh dianggap sebagai pengganti implementasi aset.

Jangan mewajibkan GLB atau ekspor model eksternal. Selama model dapat dibuat dan dirender langsung melalui kode Three.js, tidak diperlukan berkas model 3D terpisah.

---

## 6. Desain gameplay 2.5D

Gunakan kamera ortografis untuk mempertahankan konsistensi visual dan menghindari perubahan perspektif yang mengganggu gameplay.

### 6.1 Sistem koordinat

- Gameplay berlangsung pada bidang X dan Y.
- Sumbu Z digunakan untuk kedalaman visual dan pemisahan lapisan.
- Kamera harus mempertahankan orientasi yang konsisten.
- Tabrakan menggunakan koordinat gameplay yang konsisten.
- Gerakan visual pada sumbu Z tidak boleh mengubah hasil tabrakan secara tidak sengaja.

Tentukan orientasi kamera dan arah pergerakan pada tahap awal, kemudian gunakan secara konsisten pada seluruh sistem.

### 6.2 Kontrol

Gunakan kontrol berikut:

- `W`, `A`, `S`, `D` atau tombol panah untuk bergerak.
- Spasi untuk menembak.
- `Esc` untuk menjeda atau melanjutkan permainan.
- Tombol pada antarmuka untuk memulai ulang setelah permainan berakhir.

Tambahkan penanganan kehilangan fokus jendela agar permainan tidak terus berjalan secara tidak terkendali ketika pengguna berpindah tab.

Cegah tombol gameplay menyebabkan halaman browser bergulir. Sediakan petunjuk kontrol pada menu atau layar jeda.

### 6.3 Mekanika inti

Implementasikan:

1. Pergerakan pemain dengan batas area permainan.
2. Tembakan pemain yang responsif.
3. Sedikitnya tiga tipe musuh.
4. Beberapa pola pergerakan musuh.
5. Proyektil musuh.
6. Deteksi tabrakan pemain, proyektil, dan musuh.
7. Sistem kesehatan atau nyawa.
8. Penghitungan skor.
9. Sistem gelombang musuh.
10. Pertarungan bos.
11. Kondisi menang dan kalah.
12. Jeda dan melanjutkan permainan.
13. Mulai ulang tanpa memuat ulang halaman.
14. Efek suara dan visual untuk kejadian penting.

Jangan membuat seluruh musuh bergerak dengan pola yang sama. Variasikan arah gerakan, kecepatan, formasi, dan cara menyerang.

### 6.4 Siklus permainan

Buat satu sesi permainan yang utuh:

Menu utama → mulai permainan → beberapa gelombang musuh → pertarungan bos → kemenangan atau kekalahan → pengiriman skor → papan peringkat.

Pemain harus dapat mengulang permainan melalui antarmuka tanpa memuat ulang halaman.

Buat kurva kesulitan yang masuk akal. Pusatkan parameter penting seperti kesehatan musuh, laju proyektil, jeda antargelombang, dan kesehatan bos dalam konfigurasi yang mudah diubah.

---

## 7. Antarmuka dan pengalaman pengguna

Gunakan antarmuka yang konsisten dengan arah artistik game.

### 7.1 Menu utama

Sediakan:

- Judul dan identitas game.
- Tombol mulai.
- Tombol papan peringkat.
- Pengaturan suara.
- Petunjuk kontrol.

Tambahkan indikator pemuatan jika proses inisialisasi memang memerlukannya.

### 7.2 HUD

Tampilkan:

- Skor saat ini.
- Kesehatan atau jumlah nyawa.
- Gelombang atau progres permainan.
- Indikator bos ketika pertarungan bos berlangsung.
- Status jeda.

### 7.3 Layar akhir

Ketika pemain menang atau kalah:

- Tampilkan hasil permainan.
- Tampilkan skor akhir.
- Minta nama pemain.
- Sediakan tombol pengiriman skor.
- Tampilkan status pengiriman.
- Sediakan tombol bermain kembali.
- Sediakan akses ke papan peringkat.

Jangan menampilkan tombol dekoratif yang tidak berfungsi. Semua tindakan yang ditampilkan harus memiliki perilaku yang nyata.

### 7.4 Standar antarmuka

- Gunakan hierarki visual dan tipografi yang konsisten.
- Pastikan teks tetap terbaca di atas latar permainan.
- Tangani perubahan ukuran jendela.
- Pastikan tata letak sesuai untuk desktop.
- Hindari animasi antarmuka yang mengganggu kontrol.
- Sediakan status memuat, berhasil, dan gagal pada operasi yang membutuhkan waktu.
- Pastikan pengguna dapat memahami tindakan yang harus dilakukan tanpa instruksi tambahan.

---

## 8. Backend dan papan peringkat

Papan peringkat wajib menggunakan backend Fastify yang benar-benar berfungsi melalui HTTP.

### 8.1 Data yang diperbolehkan

Setiap entri hanya menyimpan:

- Nama pemain.
- Skor.

Jangan menyimpan akun, kata sandi, alamat surel, nomor telepon, tanggal lahir, alamat rumah, atau informasi pribadi lainnya.

Nama pemain hanya merupakan label yang ditampilkan. Nama tidak harus unik dan tidak berfungsi sebagai identitas akun.

### 8.2 Penyimpanan dalam memori

Gunakan array atau struktur data dalam memori proses backend.

Ketentuannya:

- Saat backend baru dijalankan, papan peringkat kosong.
- Skor yang berhasil dikirim tersimpan selama proses backend yang sama masih berjalan.
- Menghentikan dan memulai kembali proses backend menghapus seluruh papan peringkat.
- Memuat ulang frontend tidak menghapus papan peringkat.
- Memulai ulang frontend tidak menghapus papan peringkat.
- Beberapa proses backend terpisah tidak dijamin memiliki papan peringkat yang sama.

Jangan menggunakan MySQL, PostgreSQL, SQLite, berkas JSON persisten, local storage sebagai sumber utama papan peringkat, atau layanan penyimpanan eksternal.

### 8.3 API wajib

#### `GET /api/leaderboard`

- Mengembalikan daftar skor yang tersimpan.
- Mengembalikan daftar kosong jika belum ada skor.
- Mengurutkan skor dari tertinggi ke terendah.
- Menghasilkan urutan yang konsisten ketika skor sama.
- Membatasi hasil, misalnya maksimal 100 entri.

#### `POST /api/leaderboard`

Menerima nama pemain dan skor, lalu melakukan validasi di sisi server.

Aturan validasi:

- Nama tidak boleh kosong atau hanya berisi spasi.
- Nama tidak boleh melebihi 20 karakter.
- Nama harus dibersihkan atau ditolak jika mengandung karakter kontrol yang tidak diperlukan.
- Skor harus berupa bilangan bulat yang valid.
- Skor tidak boleh negatif, `NaN`, tak hingga, atau melebihi batas maksimum yang ditentukan.
- Struktur permintaan harus sesuai dengan skema API.
- Permintaan tidak valid harus ditolak dengan status HTTP dan pesan yang sesuai.
- Entri hanya disimpan setelah validasi berhasil.

Tetapkan batas skor maksimum yang konsisten dengan sistem skor game.

### 8.4 Pengiriman skor

- Kirim skor melalui API ketika sesi permainan mencapai kondisi akhir.
- Cegah klik berulang menghasilkan pengiriman ganda yang tidak disengaja.
- Tampilkan status pengiriman yang jelas.
- Jika pengiriman gagal, sediakan kesempatan mencoba kembali.
- Jangan mengklaim skor tersimpan sebelum server mengonfirmasi keberhasilan.
- Jika backend tidak tersedia, game inti harus tetap dapat dimainkan.

Jika mendukung percobaan ulang permintaan, rancang mekanisme untuk menghindari duplikasi entri akibat pengulangan pengiriman dari sesi yang sama.

Skor yang dikirim melalui browser masih dapat dimanipulasi. Implementasikan validasi server yang wajar, tetapi jangan mengklaim sistem tahan kecurangan. Jangan menambahkan autentikasi atau infrastruktur tambahan yang tidak diminta.

---

## 9. Struktur proyek

Gunakan struktur modular yang sesuai dengan kebutuhan aktual.

Contoh:

```text
project-root/
├── frontend/
│   ├── src/
│   │   ├── core/
│   │   ├── render/
│   │   ├── assets/
│   │   │   ├── models/
│   │   │   ├── materials/
│   │   │   └── environment/
│   │   ├── entities/
│   │   ├── gameplay/
│   │   ├── effects/
│   │   ├── audio/
│   │   ├── ui/
│   │   ├── services/
│   │   └── main.ts
│   └── tests/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── schemas/
│   │   └── server.ts
│   └── tests/
├── docs/
├── package.json
├── README.md
└── .gitignore
```

Tidak perlu membuat direktori kosong hanya untuk mengikuti contoh ini. Sesuaikan nama dan struktur dengan implementasi nyata.

Seluruh kode pembuat model prosedural harus berada di dalam proyek. Jangan membuat direktori khusus Blender atau menambahkan langkah ekspor GLB sebagai prasyarat.

Pisahkan tanggung jawab untuk:

- Siklus hidup permainan.
- Kamera, pencahayaan, dan rendering.
- Input.
- Model dan entitas pemain.
- Model dan entitas musuh.
- Proyektil dan tabrakan.
- Gelombang dan bos.
- Skor dan kesehatan.
- Efek partikel.
- Audio.
- Antarmuka.
- Klien API.
- Validasi dan penyimpanan papan peringkat.

Hindari ketergantungan melingkar, kode duplikat, dan konfigurasi yang tersebar.

---

## 10. Tahapan implementasi

Kerjakan tahap berikut secara berurutan. Setelah setiap tahap, verifikasi hasilnya sebelum melanjutkan.

### Tahap 1 — Pemeriksaan dan perencanaan

- Periksa lingkungan.
- Tentukan versi teknologi yang kompatibel.
- Tetapkan arah artistik.
- Rancang arsitektur dan struktur proyek.
- Tentukan pendekatan pembuatan model prosedural.
- Identifikasi risiko utama.

Keluaran: rencana singkat dan fondasi proyek yang jelas.

### Tahap 2 — Fondasi proyek

- Siapkan TypeScript, Vite, Three.js, Fastify, dan Vitest.
- Siapkan perintah tingkat akar proyek.
- Buat scene Three.js dengan kamera dan pencahayaan.
- Buat backend dengan endpoint pemeriksaan kesehatan.
- Jalankan frontend dan backend lokal.

Keluaran: frontend dapat menampilkan scene 3D dan backend merespons permintaan HTTP.

### Tahap 3 — Prototipe gameplay

- Buat pemain.
- Implementasikan pergerakan dan tembakan.
- Implementasikan musuh dan proyektil.
- Tambahkan tabrakan, kesehatan, dan skor.
- Implementasikan status permainan.

Keluaran: gameplay inti dapat dimainkan meskipun model belum mencapai kualitas akhir.

### Tahap 4 — Produksi model 3D

- Tetapkan panduan visual.
- Buat model pesawat pemain menggunakan kode Three.js.
- Buat tiga tipe musuh yang berbeda.
- Buat model bos.
- Buat proyektil, efek, dan lingkungan.
- Tambahkan material, detail, pencahayaan, serta animasi.
- Periksa hasil model di browser.
- Perbaiki model yang terlihat generik atau tidak proporsional.

Keluaran: seluruh model utama tersedia sebagai aset prosedural yang terintegrasi, bukan hanya konsep visual.

### Tahap 5 — Penyelesaian permainan

- Implementasikan gelombang musuh.
- Implementasikan variasi serangan.
- Selesaikan pertarungan bos.
- Tambahkan efek visual dan audio.
- Selesaikan kondisi menang, kalah, jeda, dan mulai ulang.
- Sesuaikan keseimbangan permainan.

Keluaran: satu sesi permainan lengkap dari menu sampai hasil akhir.

### Tahap 6 — Antarmuka dan papan peringkat

- Selesaikan menu utama dan HUD.
- Selesaikan layar akhir.
- Implementasikan API papan peringkat.
- Implementasikan validasi server.
- Hubungkan frontend dan backend.
- Uji pengiriman serta pembacaan skor.
- Verifikasi perilaku reset setelah backend dimulai ulang.

Keluaran: papan peringkat benar-benar berfungsi melalui HTTP.

### Tahap 7 — Pengujian dan perbaikan

- Jalankan pengujian unit.
- Jalankan pengujian integrasi API.
- Jalankan pemeriksaan tipe.
- Jalankan build produksi.
- Uji game melalui browser jika tersedia.
- Periksa kesalahan rendering dan permintaan jaringan.
- Perbaiki masalah yang ditemukan.

Keluaran: hasil pengujian berdasarkan bukti nyata.

### Tahap 8 — Dokumentasi dan penyerahan

- Tulis README dalam Bahasa Indonesia.
- Dokumentasikan cara memasang dependensi.
- Dokumentasikan perintah menjalankan, menguji, dan membangun proyek.
- Jelaskan struktur dan arsitektur.
- Dokumentasikan sistem model prosedural.
- Dokumentasikan API papan peringkat.
- Jelaskan deployment frontend dan backend.
- Catat keterbatasan yang belum terselesaikan.

Keluaran: proyek yang dapat dijalankan dan dilanjutkan oleh pengembang lain.

---

## 11. Pengujian wajib

### 11.1 Pengujian logika permainan

Uji setidaknya:

- Perhitungan skor.
- Perubahan kesehatan.
- Batas pergerakan pemain.
- Logika tabrakan.
- Perubahan status permainan.
- Kemunculan gelombang.
- Kondisi kemenangan dan kekalahan.
- Validasi data sebelum dikirim ke API.

Pisahkan logika yang dapat diuji dari rendering Three.js agar pengujian lebih sederhana.

### 11.2 Pengujian backend

Uji:

- Papan peringkat awal kosong.
- Pengiriman nama dan skor valid.
- Penolakan nama kosong.
- Penolakan nama terlalu panjang.
- Penolakan skor tidak valid.
- Pengurutan skor.
- Batas jumlah entri.
- GET setelah POST.
- Reset setelah proses backend dimulai ulang.

### 11.3 Pengujian integrasi HTTP

Lakukan pengujian pada server yang benar-benar berjalan:

1. GET menghasilkan daftar kosong.
2. POST dengan data valid berhasil.
3. GET menampilkan entri yang baru disimpan.
4. Urutan skor benar.
5. Data tidak valid ditolak.
6. Backend dihentikan dan dimulai kembali.
7. GET setelah proses baru dimulai menghasilkan daftar kosong.

Pastikan proses pengujian membersihkan sumber daya dan tidak meninggalkan server yang berjalan tanpa kendali.

### 11.4 Pengujian browser

Jika Playwright atau alat otomasi browser tersedia, uji alur berikut:

1. Buka game.
2. Pastikan menu utama tampil.
3. Mulai permainan.
4. Gerakkan pemain.
5. Tembakkan senjata.
6. Pastikan musuh, proyektil, dan skor berfungsi.
7. Uji jeda dan melanjutkan permainan.
8. Uji kondisi akhir melalui gameplay atau metode pengujian yang terkontrol.
9. Masukkan nama.
10. Kirim skor.
11. Verifikasi entri pada papan peringkat.
12. Muat ulang frontend dan pastikan skor masih ada selama proses backend yang sama berjalan.
13. Mulai ulang backend dan pastikan papan peringkat kosong.
14. Matikan backend dan pastikan game tetap dapat dibuka serta menampilkan kesalahan yang sesuai ketika API diminta.

Jika otomasi browser tidak tersedia, lakukan pemeriksaan manual melalui browser dan HTTP, lalu dokumentasikan keterbatasannya.

### 11.5 Pemeriksaan visual dan performa

Periksa:

- Model tampil dengan benar.
- Orientasi dan skala model konsisten.
- Material tidak rusak.
- Animasi berjalan dengan benar.
- Kamera dan batas gameplay tepat.
- Proyektil dan musuh mudah dibedakan.
- Antarmuka tidak menutupi informasi penting.
- Tidak ada kesalahan JavaScript yang kritis.
- Tidak ada kebocoran sumber daya Three.js yang diketahui.
- Gerakan menggunakan delta time agar tidak bergantung pada frame rate.
- Kompleksitas geometri dan efek masih sesuai untuk desktop umum.

Jangan mengklaim angka FPS tertentu tanpa pengukuran.

---

## 12. Standar kualitas kode

- Gunakan modul dengan tanggung jawab yang jelas.
- Terapkan prinsip tanggung jawab tunggal dan hindari duplikasi.
- Hindari kondisi bersarang yang tidak diperlukan.
- Gunakan nama variabel dan fungsi yang deskriptif.
- Pusatkan konfigurasi gameplay.
- Hindari abstraksi yang tidak diperlukan.
- Jangan menggunakan blok `catch` kosong.
- Jangan menggunakan data contoh sebagai pengganti integrasi API nyata.
- Jangan menonaktifkan pemeriksaan tipe atau menghapus pengujian agar build tampak berhasil.
- Jangan meninggalkan tombol yang tidak berfungsi atau fitur inti berupa placeholder.
- Hapus kode mati dan impor yang tidak digunakan.
- Kelola pembersihan geometri, material, tekstur, dan objek Three.js.
- Jangan memasukkan rahasia atau kredensial ke repositori.
- Jangan mengklaim hasil yang belum diverifikasi.

Prioritaskan mekanika permainan yang solid, kualitas model yang konsisten, dan kode yang dapat dipelihara daripada efek visual berlebihan yang tidak menambah kualitas permainan.

---

## 13. Build dan deployment

Sediakan perintah tingkat akar proyek untuk:

- Memasang seluruh dependensi.
- Menjalankan frontend dan backend bersamaan.
- Menjalankan pengujian.
- Menjalankan pemeriksaan tipe.
- Membangun frontend untuk produksi.
- Menjalankan backend dalam mode produksi.

Frontend dapat dipublikasikan sebagai aset statis pada layanan seperti Cloudflare Pages. Backend Fastify memerlukan layanan yang mendukung proses Node.js.

Jangan menganggap hosting statis dapat menjalankan server Fastify secara langsung.

Pastikan konfigurasi URL API dapat disesuaikan untuk pengembangan dan produksi. Jangan mengunci frontend ke alamat localhost untuk penggunaan produksi.

Dokumentasikan konfigurasi lingkungan, CORS, serta kebutuhan hosting.

Jangan melakukan deployment eksternal atau mengunggah kode ke layanan pihak ketiga tanpa izin yang tersedia. Jika deployment tidak dapat dilakukan, siapkan instruksi yang dapat diikuti dan jelaskan batasannya.

---

## 14. Kriteria penyelesaian

Proyek hanya boleh dinyatakan selesai jika kriteria wajib berikut telah dipenuhi dan diverifikasi.

### A. Permainan

- [ ] Game berjalan di browser menggunakan Three.js dan TypeScript.
- [ ] Game menggunakan kamera ortografis dan objek 3D.
- [ ] Pemain dapat bergerak dan menembak.
- [ ] Tersedia sedikitnya tiga tipe musuh yang berbeda.
- [ ] Proyektil, tabrakan, kesehatan, dan skor berfungsi.
- [ ] Gelombang musuh dan bos dapat dimainkan.
- [ ] Menu, HUD, jeda, kemenangan atau kekalahan, serta mulai ulang berfungsi.
- [ ] Game tetap dapat dimainkan ketika backend tidak tersedia.

### B. Model dan efek

- [ ] Model pemain dibuat melalui kode Three.js.
- [ ] Sedikitnya tiga model musuh memiliki siluet yang berbeda.
- [ ] Model bos memiliki kompleksitas visual yang lebih tinggi.
- [ ] Proyektil, efek ledakan, dan lingkungan telah diintegrasikan.
- [ ] Material, pencahayaan, dan animasi mendukung identitas visual.
- [ ] Model tidak hanya berupa bentuk primitif generik yang dibedakan dengan warna.
- [ ] Semua model utama dapat dibuat dan ditampilkan tanpa Blender desktop.
- [ ] Tidak ada langkah ekspor GLB yang diwajibkan.
- [ ] Sumber kode pembuatan aset tersedia dalam repositori.

### C. Backend

- [ ] GET dan POST papan peringkat berfungsi.
- [ ] Setiap entri hanya menyimpan nama dan skor.
- [ ] Validasi server berfungsi.
- [ ] Skor diurutkan dengan benar.
- [ ] Pengiriman dan pembacaan skor terhubung dengan frontend.
- [ ] Memuat ulang frontend tidak menghapus papan peringkat.
- [ ] Memulai ulang backend menghapus seluruh papan peringkat.
- [ ] Kegagalan backend ditangani dengan benar.

### D. Kualitas dan pengujian

- [ ] Dependensi terpasang.
- [ ] Pemeriksaan tipe berhasil.
- [ ] Pengujian otomatis berhasil.
- [ ] Build produksi berhasil.
- [ ] Pengujian integrasi API berhasil.
- [ ] Pengujian browser berhasil jika alat tersedia.
- [ ] Tidak ada kesalahan kritis yang diketahui dan belum diselesaikan.
- [ ] README dan instruksi menjalankan proyek tersedia.

Jika satu kriteria wajib belum terpenuhi, jangan menyatakan proyek selesai sepenuhnya. Lanjutkan implementasi atau jelaskan secara eksplisit bagian yang belum terpenuhi beserta alasannya.

---

## 15. Protokol kerja agen

Ikuti aturan berikut:

1. Periksa kondisi proyek sebelum melakukan perubahan besar.
2. Gunakan rencana bertahap, tetapi prioritaskan implementasi nyata.
3. Selesaikan satu bagian secara fungsional sebelum memperluas fitur.
4. Jalankan pengujian setelah perubahan yang berisiko.
5. Jika pengujian gagal, cari penyebabnya dan perbaiki.
6. Jika alat eksternal tidak tersedia, lanjutkan dengan pendekatan prosedural Three.js.
7. Jangan menunggu persetujuan untuk keputusan teknis rutin.
8. Jangan mengklaim aset telah dibuat jika modelnya belum benar-benar terintegrasi.
9. Jangan mengakhiri pekerjaan hanya karena semua berkas telah dibuat.
10. Prioritaskan game lengkap yang dapat dimainkan.
11. Jangan mengorbankan mekanika inti demi efek visual yang berlebihan.
12. Jangan mengganti teknologi utama tanpa alasan teknis yang jelas.
13. Jangan menganggap model berhasil hanya karena kode pembuatnya tidak menghasilkan kesalahan.
14. Periksa hasil visual model melalui browser jika memungkinkan.
15. Lakukan iterasi pada bentuk, material, pencahayaan, dan animasi hingga kualitasnya memenuhi arah artistik yang telah ditetapkan.

---

## 16. Laporan akhir

Setelah implementasi, berikan laporan dalam Bahasa Indonesia yang mencakup:

- Ringkasan fitur yang benar-benar selesai.
- Struktur proyek dan arsitektur utama.
- Pendekatan pembuatan model 3D prosedural dengan Three.js.
- Daftar model dan efek yang telah dibuat.
- Perintah memasang dependensi, menjalankan proyek, menguji, dan membangun.
- Hasil pemeriksaan tipe, pengujian otomatis, pengujian integrasi, dan pengujian browser.
- Fitur atau kriteria yang belum terpenuhi.
- Keterbatasan yang masih diketahui.
- Instruksi deployment frontend dan backend.
- Lokasi berkas penting, termasuk README dan kode pembuatan aset.

Bedakan secara jelas antara:

- **Berhasil diverifikasi:** memiliki hasil pemeriksaan atau pengujian nyata.
- **Belum diuji:** sudah diimplementasikan tetapi belum diverifikasi.
- **Belum selesai:** belum diimplementasikan atau masih bermasalah.

Jangan mengisi laporan dengan klaim keberhasilan yang tidak didukung hasil nyata.

---

## INSTRUKSI TERAKHIR

Mulai dari pemeriksaan lingkungan dan ruang kerja, kemudian kerjakan proyek sampai memenuhi kriteria penyelesaian.

Gunakan pertimbangan profesional untuk menentukan detail implementasi yang belum ditetapkan.

**Target akhir bukan sekadar repositori yang berhasil dikompilasi. Targetnya adalah game browser 2.5D yang benar-benar dapat dimainkan, memiliki model 3D prosedural yang dirancang secara artistik langsung melalui Three.js, mempunyai siklus permainan lengkap, dan menggunakan papan peringkat backend dengan penyimpanan dalam memori.**

Tidak boleh ada ketergantungan wajib pada Blender desktop atau aplikasi pemodelan 3D eksternal. Seluruh aset utama harus dapat dibuat, diperbaiki, dan dijalankan melalui kode di dalam proyek.