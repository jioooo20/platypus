# Starfire Squadron — Brief Desain

- **Janji pemain:** pilot satu-satunya di antara armada Vanta dan planet Nara, menenun jalur tembakan melalui formasi mesin.
- **Rasa/aksi utama:** cepat, berani, gesit; gerak lateral sambil menahan tembakan.
- **Kata kerja:** terbang, membidik, menembak, menghindar, bertahan.
- **Pengulangan 5–30 detik:** bergerak untuk garis tembak dan menghindari peluru, menembak musuh untuk skor, memposisikan ulang.
- **Perubahan 1–5 menit:** tiga gelombang naik intensitas dan komposisi; komandan Vanta masuk dengan pola tembakan berat; kemenangan memberi bonus skor.
- **Kalah/belajar/ulang:** tiga integritas kapal habis berarti kalah; indikator kondisi dan pola tembakan mengajari posisi aman; satu tombol memulai sesi bersih.
- **Risiko/hadiah:** menahan posisi untuk menembak memperbesar risiko terkena serangan; menumbangkan musuh memberi skor.
- **Keahlian lebih baik:** baca gerak/pola musuh, jaga ruang melarikan diri dan sejajarkan pesawat dengan sasaran.
- **Komunikasi keputusan:** hitbox/kontras musuh-proyektil, bilah HP bos, gelombang, nyawa, skor dan telemetri hasil.
- **Batas lingkup:** desktop satu pemain; tidak ada akun, transaksi, jaringan permainan, simpan persisten, atau model eksternal.

# Kontrak Siklus Inti

**Pemain bergerak dan menembak untuk menghentikan armada Vanta sementara gelombang/proyektil menciptakan tekanan; tumbangkan musuh untuk menaikkan skor, hindari serangan agar integritas kapal bertahan, dan kalah berarti jalankan misi ulang.** Input dipetakan ke WASD/panah/spasi. Tujuan muncul dalam briefing, penanda gelombang dan bar bos. Scout hadir setelah gelombang dimulai, memberi tekanan sebelum menit pertama. Skor/nyawa berubah sebagai konsekuensi tabrakan dan kill. Kalah menampilkan skor dan hasil serta tombol retry tanpa reload.

# Rencana Encounter

- **Ruang:** layar scroll-shooter horizontal; kamera ortografis memperlihatkan rentang dasar 34×20, koordinat gameplay X/Y, layer visual Z terpisah. Player mulai kiri (-10,0); ancaman masuk dari kanan.
- **Keputusan awal:** sejajarkan lintasan tembak dengan scout yang melengkung dan jangan terlalu menempel tepi.
- **Landmark:** planet Nara dengan atmosfer/cincin, debu asteroid, nebula langit dan bintang parallax.
- **Eskalasi:** gelombang 1 enam scout; gelombang 2 sembilan musuh dengan gunship penembak; gelombang 3 dua belas dengan bomber lapis baja, jeda singkat antargelombang; bos Vanta dengan serangan terarah/dobel.
- **Telegraph/recovery:** palet musuh/proyektil berbeda, invulnerability blink sesudah kena, jeda gelombang 1.45s, health bars bos dan player.
- **Modularitas:** ukuran wave, kecepatan, hitbox, HP, cooldown, score, max leaderboard pada `game/rules.ts`; model di factory terpisah.
