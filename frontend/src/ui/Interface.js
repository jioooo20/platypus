import { loadLeaderboard, submitScore } from '../services/leaderboard.js';
const $ = (id) => {
    const element = document.getElementById(id);
    if (!element)
        throw new Error(`Elemen antarmuka tidak ditemukan: ${id}`);
    return element;
};
const padScore = (score) => String(score).padStart(6, '0');
export class Interface {
    game;
    menu = $('overlay-menu');
    pause = $('overlay-pause');
    result = $('overlay-result');
    leaderboard = $('overlay-leaderboard');
    hud = $('hud');
    bossBar = $('boss-bar');
    score = $('score-value');
    wave = $('wave-value');
    health = $('health-value');
    bossFill = $('boss-fill');
    finalScore = $('final-score');
    submitStatus = $('submit-status');
    submitButton = $('submit-score');
    scoreForm = $('score-form');
    leaderboardContent = $('leaderboard-content');
    unsubscribe;
    submitted = false;
    currentScore = 0;
    lastState = 'menu';
    constructor(game) {
        this.game = game;
        this.unsubscribe = game.subscribe((snapshot) => this.update(snapshot));
        $('start-button').addEventListener('click', () => game.start());
        $('resume-button').addEventListener('click', () => game.togglePause());
        $('replay-button').addEventListener('click', () => game.start());
        $('leaderboard-button').addEventListener('click', () => void this.showLeaderboard());
        $('results-leaderboard-button').addEventListener('click', () => void this.showLeaderboard());
        $('close-leaderboard').addEventListener('click', () => this.hideLeaderboard());
        this.scoreForm.addEventListener('submit', (event) => { event.preventDefault(); void this.sendScore(); });
    }
    dispose() { this.unsubscribe?.(); this.scoreForm.replaceWith(this.scoreForm.cloneNode(true)); }
    update(snapshot) {
        this.currentScore = snapshot.score;
        this.score.textContent = padScore(snapshot.score);
        this.wave.textContent = snapshot.wave === 4 ? 'BOS VANTA' : snapshot.wave > 0 ? `GELOMBANG ${String(snapshot.wave).padStart(2, '0')}` : 'SIAP';
        this.health.textContent = `${'♥ '.repeat(snapshot.health).trim()}${snapshot.health < 3 ? ' · '.repeat(3 - snapshot.health).trim() : ''}`;
        this.bossFill.style.width = `${Math.max(0, snapshot.bossHealth / snapshot.bossMaxHealth * 100)}%`;
        this.bossBar.classList.toggle('hidden', snapshot.wave !== 4 || snapshot.state === 'menu');
        this.hud.classList.toggle('hidden', snapshot.state === 'menu');
        $('status-value').textContent = snapshot.state === 'paused' ? 'DIJEDA' : 'TERHUBUNG';
        this.menu.classList.toggle('hidden', snapshot.state !== 'menu');
        this.pause.classList.toggle('hidden', snapshot.state !== 'paused');
        this.result.classList.toggle('hidden', snapshot.state !== 'won' && snapshot.state !== 'lost');
        if (snapshot.state === 'won' || snapshot.state === 'lost') {
            if (this.lastState !== snapshot.state) {
                this.submitted = false;
                this.submitButton.disabled = false;
                this.submitButton.textContent = 'KIRIM →';
                this.submitStatus.textContent = 'Skor belum dikirim. Hubungkan ke catatan armada.';
                this.finalScore.textContent = padScore(snapshot.score);
                $('result-kicker').innerHTML = `<i></i> ${snapshot.state === 'won' ? 'MISI BERHASIL' : 'LAPORAN MISI'}`;
                $('result-title').innerHTML = snapshot.state === 'won' ? 'LANGIT <em>TERSELAMATKAN</em>' : 'KAPAL <em>TERGUNCANG</em>';
                $('result-copy').textContent = snapshot.state === 'won' ? 'Komandan Vanta dikalahkan. Nara masih bersinar.' : 'Pertahanan jatuh, tetapi Nara masih butuh kamu. Coba lagi.';
                $('pilot-name').focus();
            }
            else
                this.finalScore.textContent = padScore(snapshot.score);
        }
        this.lastState = snapshot.state;
    }
    async sendScore() {
        if (this.submitted || this.submitButton.disabled)
            return;
        const name = $('pilot-name').value;
        this.submitButton.disabled = true;
        this.submitButton.textContent = 'KIRIM...';
        this.submitStatus.textContent = 'Mengirimkan catatan ke komando armada...';
        try {
            await submitScore(name, this.currentScore);
            this.submitted = true;
            this.submitStatus.textContent = '✓ Skor tercatat pada papan peringkat armada.';
            this.submitButton.textContent = 'TERCATAT ✓';
        }
        catch (error) {
            this.submitStatus.textContent = error instanceof Error ? error.message : 'Transmisi gagal. Periksa sambungan dan coba kembali.';
            this.submitButton.textContent = 'COBA LAGI →';
            this.submitButton.disabled = false;
        }
    }
    async showLeaderboard() {
        this.hideAllExcept(this.leaderboard);
        this.leaderboardContent.innerHTML = '<p>Memuat hasil transmisi...</p>';
        this.leaderboard.classList.remove('hidden');
        try {
            const entries = await loadLeaderboard();
            if (!entries.length) {
                this.leaderboardContent.innerHTML = '<p class="leaderboard-empty">Belum ada pilot yang tercatat.<br />Jadilah yang pertama membela Nara.</p>';
                return;
            }
            const list = document.createElement('ol');
            list.className = 'leaderboard-list';
            for (const [index, entry] of entries.entries()) {
                const row = document.createElement('li');
                const rank = document.createElement('span');
                rank.className = 'rank';
                rank.textContent = String(index + 1).padStart(2, '0');
                const name = document.createElement('span');
                name.className = 'pilot-entry';
                name.textContent = entry.name;
                const score = document.createElement('strong');
                score.textContent = padScore(entry.score);
                row.append(rank, name, score);
                list.appendChild(row);
            }
            this.leaderboardContent.replaceChildren(list);
        }
        catch {
            this.leaderboardContent.innerHTML = '<p class="leaderboard-error">Tidak dapat menghubungi komando.<br />Pastikan server berjalan, lalu coba lagi.</p>';
        }
    }
    hideLeaderboard() {
        this.leaderboard.classList.add('hidden');
        if (this.game.getState() === 'menu')
            this.menu.classList.remove('hidden');
        else if (this.game.getState() === 'paused')
            this.pause.classList.remove('hidden');
        else if (this.game.getState() === 'won' || this.game.getState() === 'lost')
            this.result.classList.remove('hidden');
    }
    hideAllExcept(visible) {
        for (const panel of [this.menu, this.pause, this.result, this.leaderboard])
            if (panel !== visible)
                panel.classList.add('hidden');
    }
}
