import { describe, expect, it } from 'vitest';
import { boundedScore, clamp, overlaps, validScoreName } from './rules.js';
import { validateScoreSubmission } from '../services/leaderboard.js';
describe('aturan permainan', () => {
    it('membatasi pergerakan dalam area misi', () => { expect(clamp(-30, -10, 10)).toBe(-10); expect(clamp(3, -10, 10)).toBe(3); expect(clamp(30, -10, 10)).toBe(10); });
    it('mengukur tabrakan hanya pada bidang X/Y', () => {
        expect(overlaps({ x: 0, y: 0, radius: 1 }, { x: 2, y: 0, radius: 1 })).toBe(true);
        expect(overlaps({ x: 0, y: 0, radius: 1 }, { x: 2.1, y: 0, radius: 1 })).toBe(false);
    });
    it('membatasi skor agar sejalan dengan leaderboard', () => { expect(boundedScore(400, 100)).toBe(500); expect(boundedScore(999999, 100)).toBe(1000000); });
    it('menerima nama pilot yang aman dan menolak nama kosong/kontrol/panjang', () => {
        expect(validScoreName('Nara 07')).toBe(true);
        expect(validScoreName('  ')).toBe(false);
        expect(validScoreName('Nara\n')).toBe(false);
        expect(validScoreName('012345678901234567890')).toBe(false);
    });
    it('validasi klient memeriksa nama, tipe bilangan, skor negatif dan batas', () => {
        expect(validateScoreSubmission('Pilot', 120)).toBeUndefined();
        expect(validateScoreSubmission(' ', 0)).toBeTruthy();
        expect(validateScoreSubmission('Pilot', Number.NaN)).toBeTruthy();
        expect(validateScoreSubmission('Pilot', -1)).toBeTruthy();
        expect(validateScoreSubmission('Pilot', 1000001)).toBeTruthy();
    });
});
