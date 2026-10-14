import './styles.css';
import { Game } from './game/Game.js';
import { Interface } from './ui/Interface.js';
const mount = document.getElementById('scene');
if (!mount)
    throw new Error('Wadah Three.js tidak ditemukan.');
try {
    const game = new Game(mount);
    const ui = new Interface(game);
    window.addEventListener('pagehide', () => { ui.dispose(); game.dispose(); }, { once: true });
}
catch (error) {
    console.error('Inisialisasi Starfire Squadron gagal:', error);
    mount.innerHTML = '<p class="render-error">Browser tidak dapat membuka renderer WebGL. Coba perbarui driver grafis atau gunakan browser desktop terbaru.</p>';
}
