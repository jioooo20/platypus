# Starfire Squadron — Pertahanan Nebula

Game browser shoot-'em-up 2.5D orisinal dengan pesawat, musuh, bos, efek, dan latar yang dibangun langsung dari kode Three.js. Bahasa antarmuka Indonesia. Tema: armada kecil mempertahankan planet Nara dari komandan mesin Vanta.

## Persyaratan dan pemasangan

- Node.js 22 LTS (atau Node.js 20.19+), npm 10+, dan browser desktop/WebGL modern.
- Clone/salin repositori ini, lalu jalankan `npm install` dari root.
- Tidak ada aset model eksternal, Blender, API AI berbayar, database, atau tool skills CLI yang diperlukan.

## Menjalankan

```sh
npm run dev          # frontend http://localhost:5173 + API http://localhost:3001
npm test             # unit + integrasi Fastify
npm run typecheck    # TypeScript seluruh workspace
npm run build         # typecheck dan produksi frontend/backend
npm run start:api     # jalankan backend hasil build pada PORT (default 3001)
npm run preview       # preview bundle frontend (setelah build)
```

Frontend tetap dapat dimainkan tanpa backend. Pengiriman/pembacaan skor akan menunjukkan status gagal dan menyediakan retry. Audio sintetis dimulai saat interaksi pertama (kebijakan autoplay browser); gunakan kontrol suara lewat pemilih browser jika perlu. Game mengunci/mematikan suara SFX melalui `Game.setMuted`; antarmuka tidak menyediakan pengaturan suara terpisah pada rilis awal.

## Kontrol

- `W A S D` atau tombol panah: gerak di bidang permainan.
- `Spasi`: tembak (tahan untuk tembakan berulang).
- `Esc`: jeda/lanjutkan. Kehilangan fokus tab otomatis menjeda.
- Tombol Mulai, Lanjutkan, Main Lagi dan Papan Peringkat juga tersedia pada UI.

## Arsitektur

- `frontend/src/game/rules.ts`: konfigurasi dan operasi logika murni (batas koordinat, collision lingkaran X/Y, skor, tipe sesi).
- `frontend/src/game/Game.ts`: scene ortografis, input, frame update capped delta-time, gelombang, serangan, kesehatan, collision, state game dan Web Audio.
- `frontend/src/assets/models.ts`: fabrikator model procedural player, scout, gunship, bomber, proyektil, ledakan, plus fungsi pelepasan geometry/material.
- `frontend/src/ui/Interface.ts` dan `styles.css`: menu, HUD, pause, hasil/pengiriman skor dan leaderboard.
- `frontend/src/services/leaderboard.ts`: fetch API, batas timeout, validasi pengiriman di sisi klien.
- `backend/src/server.ts`: Fastify, CORS, health, validasi server, penyimpanan memori per proses.
- `backend/tests/server.test.ts`, `frontend/src/game/rules.test.ts`: pengujian backend/logika via Vitest.

Kamera melihat bidang X/Y dari sumbu Z. Gerakan, proyektil, dan tabrakan hanya memakai X/Y; Z membedakan kedalaman layer render. Player/tipe musuh dibangun dari ExtrudeGeometry, bentuk dodecahedron/octahedron bertingkat, panel, kokpit, meriam, serta materi metal/emissive. Efek memakai geometri dan tween skala/waktu. Parallax bintang/asteroid dijalankan per-frame. Bentuk dan warna menjaga proyektil dan kapal terbaca dengan latar gelap.

## API papan peringkat

`GET /api/health` → `{ "status": "ok" }`

`GET /api/leaderboard` → `{ "entries": [{ "name": "Mira", "score": 950 }] }`, descending; urutan seri mengikuti penyimpanan awal; maksimal 100 hasil.

`POST /api/leaderboard` (HTTP 201):

```json
{ "name": "Pilot Nara", "score": 950 }
```

Hanya properti `name` dan `score` diterima. Nama dipangkas di awal/akhir; harus nonkosong, maksimal 20 karakter, tanpa kontrol ASCII. Skor wajib integer aman 0..1.000.000. Data hanya ada di RAM proses: restart server menghapus semua entri. Tidak ada autentikasi dan skor yang dikirim browser dapat dimanipulasi; validasi bukan pencegah curang.

### Konfigurasi jaringan

- `PORT` backend, default `3001`; `HOST`, default `0.0.0.0`.
- `CORS_ORIGIN` backend adalah origin diizinkan, default `http://localhost:5173`; untuk beberapa origin pisahkan dengan koma.
- `VITE_API_URL` frontend opsional, mis. `https://api.example.com`; bila kosong fetch relatif origin yang sama. Untuk host frontend/backend berbeda, isi URL API dan izinkan origin frontend pada `CORS_ORIGIN`.

## Build dan deployment

`npm run build` menghasilkan `frontend/dist/` aset statis dan `backend/dist/` JavaScript Node. Upload hanya `frontend/dist/` ke CDN/static host. Deploy backend terpisah sebagai proses Node.js, set `PORT`, `CORS_ORIGIN`, dan `VITE_API_URL` saat build frontend. Hosting statis tidak menjalankan Fastify. Karena leaderboard sengaja in-memory, satu proses API harus tetap hidup; restart/redeploy mengosongkan papan. Tidak ada deployment eksternal yang dilakukan.

## Keterbatasan yang diketahui

- Tidak ada pengujian otomatis browser/Playwright; pengujian HTTP yang tersedia menggunakan injection server Fastify, bukan proses eksternal restart. Uji manual menu, gerakan, audio, layar end-game, respons ukuran layar, WebGL, dan skenario API dari browser tetap disarankan.
- Tidak ada skor anti-cheat, penyimpanan persisten, login, multiplayer atau kontrol touch.
- Audio sintetis sederhana, tanpa file musik/SFX.
- Akses Google Fonts opsional untuk tampilan font; font fallback tersedia.
- Sesi mencapai bos setelah tiga gelombang; bos harus dikalahkan untuk menang.
