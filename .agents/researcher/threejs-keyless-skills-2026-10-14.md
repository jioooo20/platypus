# Research: Best No-API-Key, Pure Three.js Agent Skills — Ranked & Audited

**Date:** 2026-10-14
**Query:** Find and rank the best no-API-key, pure Three.js agent skills (scene setup, materials, shaders, loaders, game systems, procedural 3D, code-only image→3D) — no paid external services (no Tripo/Meshy/fal/Layer/World Labs keys). Research-only; no installs executed.
**Sources:** ~35 (skills.sh search API ×3 + skills.sh skill/security pages ×9 + GitHub REST API (repos/orgs/users/git-trees/contents) ×12 + raw.githubusercontent.com SKILL.md/scripts ×10 + prior local audits ×2)
**Prior context:** `.agents/researcher/skills-sh-threejs-catalog-2026-10-14.md` (full ~100-skill catalog) and `.agents/researcher/skill-security-audit-2026-10-14.md` (audit method + majidmanzarpour repo full SAFE audit).

---

## 0. Method (per prior audit playbook)

For each top keyless candidate: (1) GitHub API — repo created/stars/license/commits + publisher account age; (2) git-tree / contents API — does the skill folder ship scripts/binaries or markdown only; (3) raw SKILL.md fetch — frontmatter check (hooks/`allowed-tools`?), injection-keyword scan, URLs/domains, env/API-key expectations; (4) skills.sh per-skill automated badges (Gen Agent Trust Hub / Socket / Snyk) where available. Install counts = skills.sh anonymous CLI telemetry, snapshot 2026-10-14. **No `npx skills add` was executed.**

Provenance flag legend: **SAFE\*** = full prior repo audit · **Q-AUDIT** = quick audit done today (SKILL.md read + payload tree + badges) · **CAUTION** = weak provenance · **UNCHECKED** = not inspected today.

---

## 1. Ranked table — keyless pure-Three.js candidates

Sorted by fit for "build 3D games/assets procedurally in code, zero keys" (provenance × functionality × audit depth). "Payload" = what `--skill <name>` installs.

| # | Skill (installs) | Publisher | Focus | Payload | Provenance verdict | Notes |
|---|---|---|---|---|---|---|
| **1** | **six keyless skills in `majidmanzarpour/threejs-game-skills`:** threejs-gameplay-systems (2,918), threejs-game-ui-designer (2,891), threejs-aaa-graphics-builder (2,823), threejs-game-director (2,706), threejs-debug-profiler (2,696), threejs-qa-release (2,657) | majidmanzarpour (user since 2015) | Full game-building suite: loop/levels/physics → AAA procedural graphics/shaders/VFX → HUD/UI → director routing → debug/profiling → QA/release | md + small helper scripts (`create_threejs_game.py` scaffold copier, `inspect-threejs-canvas.mjs`, `check_evidence.py`, `probe_asset_credentials.sh`) | **SAFE\* (repo fully audited prior) + Q-AUDIT today (all 6 SKILL.md read: clean frontmatter name+description only, zero injection patterns, zero env exfil) + gameplay-systems = PASS×3** | Explicitly **procedural-first**: "explicitly procedural art needs no probe" — keyless is a first-class path. MIT, 2.5k★, honest README. The one caveat: `probe_asset_credentials.sh` sources the user's shell profile **only** to print `KEY=SET|MISSING` (runs only when external generation is in scope; no exfil). Best "build a whole 3D game" suite. |
| **2** | **img2threejs (1,982)** | img2threejs (org; 18.1k★, Apache-2.0, homepage img2threejs.io) | **Code-only image→3D**: reference image → staged sculpt pipeline → procedural TypeScript Three.js factory, with AI-vision self-correction gates | Root `SKILL.md` (32.9 KB router) + `forge/` (~dozens of Python 3.10+ **stdlib-only** state/gate scripts) + `grimoire/`/`docs/` contracts. No pip installs, no API keys for the core loop | **Q-AUDIT: Gen PASS / Socket WARN / Snyk PASS.** Socket WARN **fully explained in §2** — 4 LOW "anomaly" alerts, all execution-sink patterns in the Python `forge/` pipeline; **no malware/exfil/backdoor found**. Frontmatter clean (name/description/license/version; no hooks/`allowed-tools`) | The **only** dedicated zero-key image→3D skill. Heavy, professional, gate-ridden workflow; needs agent vision (native image read or browser MCP). Optional local adapters (SAM2/MediaPipe/Depth Anything) and optional plugins via separate `img2` CLI — none required. Acceptable risk for single-user trusted use; forge scripts DO execute Python (`subprocess`, `node --eval` in tests) → keep read-before-run discipline. Star growth 0→18k in ~3 months = unverifiable as organic (weak signal only). |
| **3** | **gamedev-skills trio:** threejs-gltf-loading (3,705), threejs-materials-lighting (3,668), threejs-scene-setup (3,634) | gamedev-skills (org, created 2026-06-27; Apache-2.0; 1.5k★; active) | Fundamentals docs: scene/camera/renderer + import maps (targets **r186**, `Timer` not deprecated `Clock`), materials/lights/shadows, GLTF/Draco/KTX2 loading | Markdown + `references/*.md` (scene-setup references only `references/scene-graph.md`; **no scripts requested**) | **Q-AUDIT: scene-setup SKILL.md read in full — clean (name+description frontmatter, no injection, only jsDelivr CDN URLs inside browser code samples); threejs-scene-setup = PASS×3** | Best keyless "fundamentals docs" set; modern, pitfall-heavy, engine-honest. Weak signal: brand-new org (3.5 months) with personal contact email — content clean today, re-check on update. |
| **4** | threejs-webgl (4,237) | freshtechbro (user since **2014**; MIT; 1.0k★; repo **stale since 2025-11-20**) | Single-skill Three.js handbook: scenes, materials, lighting, glTF, shadows, raycast, postprocessing, perf, GLSL | md + `references/*.md` + `assets/starter_scene/` (html/js) + **1 benign Python script** `scripts/setup_scene.py` (argparse boilerplate generator; read in full — no network, no env, writes only to `--output`) | **Q-AUDIT: SKILL.md + setup_scene.py read in full — content clean; PASS×3** | Good "one big Three.js reference". Doc inaccuracy: SKILL.md lists `texture_optimizer.py`/`gltf_validator.py` which do **not** exist in the tree. Stale repo = future updates unlikely; content is frozen but solid. |
| **5** | threejs-game (1,029) + threejs-perf (589) | playableintelligence (org; 344★; license field **null** but skill frontmatter declares `license: MIT`; last push 2026-05-25) | Opinionated game architecture: EventBus/GameState/Constants/Game orchestrator, mobile-first input (gyro/joystick), TSL guide, perf rules (threejs-perf) | md + companion `reference/*.md`, `core-patterns.md`, `tsl-guide.md`, `input-patterns.md` (no executables seen) | **Q-AUDIT: threejs-game SKILL.md read in full — clean (no injection, no env, no keys); PASS×3** | Solid game-structure patterns, three@0.183 + Vite, JS-first. Product tie-in: Play.fun safe-zone CSS vars (benign, defaults to 0px outside their dashboard). ⚠️ Sibling `meshyai` (855) **needs Meshy key — exclude**. Repo license null is the weak signal. |
| **6** | webgpu-threejs-tsl (1,278) | dgreenheck (**Dan Greenheck**, user since 2013, threejsroadmap.com, 826★ followers; repo **license null**) | WebGPU + **TSL** (Three Shading Language) shaders via Three.js: compute shaders, node materials, post-processing, WGSL interop | md (`SKILL.md` 3.2KB + 7 docs) + **reference JS** (`examples/`, `templates/` — code samples for the agent to copy, not install-time executables) | **Q-AUDIT: git tree read — no install-executables; PASS×3** | Niche but excellent for modern shader work; strongest personal provenance of the set (known Three.js educator). Only legal ambiguity: no LICENSE file. |
| **7** | threejs (1,755) + build-threejs-scroll-worlds (1,234) + optimize-threejs-games (1,120) + build-mobile-threejs-games (1,103) + build-threejs-enemy-systems (1,090) + threejs-landscape (1,010) + threejs-weather (998) + threejs-towers (992) | mengto (**Meng To**, Design+Code founder; user since **2011**; 3.3k followers; repo MIT, 6.7k★, **active** push 2026-10-06) | Scene fundamentals + game-scene recipes (scroll worlds, enemies, landscape, weather) + optimization; also 14 illustration + 6 combat-VFX + 20 game-dev skills (176 total) | md + `REFERENCES.md` + optional `demo/index.html` (portable proof pages) + `scripts/` in some skills (folder contract in README) | **Q-AUDIT (complete): `agent-skills/web-design/threejs/SKILL.md` read in full — clean frontmatter (name+description only), pure procedural content (setup/pitfalls/recipes/cleanup/`dispose()`), zero injection, zero URLs, zero env/keys; threejs = PASS×3** | Strongest publisher reputation + MIT + active. Content style = concise recipe/handbook (pinned repo path: skills live under `agent-skills/<category>/<skill>/`). README commit note shows maintainer's local push path (benign). Spot-check individual game variants (some carry `scripts/`) before bulk-installing. |
| **8** | three-best-practices (1,310) | emalorenzo (user; repo **license null**, 60★, **stale since 2026-01-28**) | 120+ perf/best-practice rules across 18 categories (compiled from official Three.js `llms` branch + "100 Three.js Tips") | Pure md: `SKILL.md` + `rules/*.md` (22 files) — **zero executables in skill dir** (repo also has `.zip` copies outside the skill folder) | **Q-AUDIT: git tree read — md-only skill; PASS×3** | Good free-standing perf checklist; sources credited. Weak signals: tiny, stale, no LICENSE. |
| **9** | threejs (3,245) | nexu-io (org "OpenDesign", created 2026-02-24; repo Apache-2.0; 100.9k★, active, 3,740 commits) | OpenDesign design-workspace product; ships 100+ functional skills in `skills/` | **Content skill is a 1-page catalogue pointer** (`skills/threejs/SKILL.md`): frontmatter carries `od.upstream: https://github.com/CloudAI-X/threejs-skills` and the body says "Curated from CloudAI-X" + tells you to install the **upstream bundle** | **Q-AUDIT (resolved → demote): SKILL.md read in full — no malicious content, but it contains no Three.js guidance of its own; it routes to CloudAI-X/threejs-skills, the repo flagged CAUTION in the prior audit** | Its 3,245 installs are for a **wrapper around the CAUTION-flagged cloudai-x repo** — following it lands you exactly where we already said to avoid. **Skip entirely; install #3 (gamedev-skills) or #7 (mengto) directly instead.** The rest of the OpenDesign repo is a legit BYOK local-first product (Apache-2.0), irrelevant to this query. |
| **10** | three-webgl-game (42), threejs-data-visualization (14), web-3d-asset-pipeline (50) | openai/plugins (official OpenAI org; 7.4k★) | three.js game / dataviz / 3D asset pipeline | unknown (not fetched) | **UNCHECKED** (official org only) | Official org but near-zero adoption and unverified content; not needed given #1–8. |
| — | threejs-animation/fundamentals/shaders/… (10.5k–17.6k each) | cloudai-x | Three.js docs | md only | **CAUTION (prior audit)** — README clone target 404s, no LICENSE, 6 commits vs 3.5k★, same-day-dump account pattern | Content clean at audited commit but publisher untrusted; **avoid when #3/#4/#7 offer the same docs with better provenance**. |

**Excluded (keyed → violates "no API key"):** majidmanzarpour `threejs-3d-generator` (TRIPO_API_KEY), `threejs-audio-generator` (ELEVENLABS_API_KEY), `threejs-image-generator` (GEMINI_API_KEY); playableintelligence `meshyai` (Meshy); all vendor API wrappers (meshy-*, fal-*, layer-3d, eachlabs, Runware, scenario-*, calesthio world-gen tools). **Excluded (fork copies):** raptoravis/chrislaupama/leanentropy/imanlangaran forks of threejs-game-skills, avabillions2040 fork of claudedesignskills, softwareinfocus/sfrmrc/devinilabs copies of mengto skills — install from the canonical repo only.

---

## 2. img2threejs Socket WARN drill-down (exact finding + verdict)

**Page fetched:** `https://skills.sh/img2threejs/img2threejs/img2threejs/security/socket` (mirrors `sockets.dev`; the `/p/img2threejs/img2threejs` URL itself returned a transport error). Skill page confirms: **Gen Agent Trust Hub = Pass · Socket = Warn · Snyk = Pass**, audited by Socket **Oct 5, 2026**, package id `pkg:socket/skills-sh/img2threejs%2Fimg2threejs%2Fimg2threejs%2F@fe2d0d2d…`.

**4 alerts found — all "Anomaly", all LOW, all in the repo's Python `forge/` build/review pipeline (not the SKILL.md text):**

1. **`forge/stage3_build/emit_target.py` (LOW)** — *"No explicit malware, data exfiltration, cryptomining, or backdoor logic is present… the module provides a powerful execution sink: it runs `target.command` via `subprocess.run` (tokenized and placeholder-substituted)… risk is medium due to the high-impact subprocess execution primitive without sandboxing; confidence is limited because critical trust boundaries (resolve_target/Target definitions) are in other modules."* Confidence 65% / Severity 55%.
2. **`forge/tests/test_primitive_watertightness.py` (LOW)** — test harness that *"dynamically imports local stage code, generates TypeScript from that code, writes it to disk, compiles with `npx tsc`, and executes logic with `node --eval`… if the stage directories… are compromised, this test harness provides a clear path to arbitrary code execution during CI/test runs."* Confidence 56% / Severity 60%.
3. **`forge/stage3_build/run_gates.py` (LOW)** — *"plugin execution orchestrator that will run gate_runner.py for locally installed plugins specified by plugins.json… significant supply-chain/trust boundary risk… `sys.path` modification introduces potential import-shadowing risk."* Confidence 63% / Severity 55%.
4. **`forge/tests/test_suite_integrity.py` (LOW)** — *"runs a child Python interpreter using `python -c _PROBE`… the dynamic execution sink warrants a security review of the full file content for `_PROBE`."* Confidence 62% / Severity 62%.

**Verdict — ACCEPTABLE for a trusted single-user install, with eyes open.** Socket found **no malware, no exfiltration, no cryptomining, no backdoor**. The Warn is the standard "high-impact execution primitive without sandboxing" flag on a build/review pipeline that (by design, per SKILL.md) the agent runs constantly (`python3 forge/next.py`, `forge/state.py`, gate scripts). The realistic risk is **supply-chain**: a compromised plugin/`plugins.json` or tampered forge stage → arbitrary code exec. Mitigations: install only from the canonical `img2threejs/img2threejs` repo; do not install third-party domain plugins (`img2 add …`) unless you trust them; the core loop is stdlib-only Python + your agent's vision — no keys, no network calls required. Note the SKILL.md also declares an optional npm installer (`bin/img2threejs.mjs`, package ships only that one file) and suggests a shared symlinked checkout (`~/.claude/skills/img2threejs -> checkout`) — benign.

**How the code-only image→3D loop works (from SKILL.md):** agent reads the image (vision) → `forge/` scripts enforce a **state machine** (`.img2threejs/state.json`, hard stops, bounded correction loops: 3/pass, 6 total) → pre-spec assessment + sculpt spec (JSON) → **locked build passes** generate a TypeScript `createObjectModel(spec)` factory (blockout→structure→form→material→lighting→interaction→optimization) → browser render + turntable/self-intersection/attachment gates → AI-vision comparison sheets → `continue | refine-spec | refine-code | request-input | stop`. Fidelity levers: projection-first texture baking (de-light + UV project), detail inventory, chirality/hair/interior-difference gates. Neural systems (Tripo/CharacterGen/VRM) are **opt-in adapters that never replace the procedural factory** and are not needed.

---

## 3. majidmanzarpour keyless skills (SKILL.md-by-SKILL.md)

Repo already **SAFE\*** (full prior audit: MIT, author since 2015, the only prior-audited executable — `threejs_3d_asset.py` — single Tripo endpoint, no exfil). Today all **six keyless SKILL.md files were read in full**:

| Skill | Frontmatter | Commands it asks the agent to run | Injection / env / keys |
|---|---|---|---|
| threejs-gameplay-systems | name+description only | `python3 <skill>/scripts/create_threejs_game.py ./my-game` (copies `assets/threejs-vite-game/` scaffold; `--force` documented) | none found; physics = local Rapier (OSS) |
| threejs-aaa-graphics-builder | name+description only | none mandatory; optional credential probe only "when external generation is in scope"; "explicitly procedural art needs no probe" | none found; procedural model/material/shader/VFX recipes |
| threejs-game-ui-designer | name+description only | none (pure design workflow + `references/ui-patterns.md`) | none found; mentions keyed siblings only as optional quality boosters |
| threejs-game-director | name+description only | `bash <skill>/scripts/probe_asset_credentials.sh` (**sources user's shell profile** to print `KEY=SET|MISSING` for the 3 providers — runs only when external gen is in scope); routes to sibling skills | no exfil; reads profile only to detect key presence |
| threejs-debug-profiler | name+description only | none (read `references/debug-playbook.md`, triage) | none found |
| threejs-qa-release | name+description only | `node <skill>/scripts/inspect-threejs-canvas.mjs --manifest … --url …` (local Playwright-style canvas inspector, `--seed`) | none found; local-only |

**Verdict:** All six are content-clean, keyless-capable (procedural path is explicit and first-class), and inherit the repo's SAFE audit. The three keyed siblings (3d-generator/audio-generator/image-generator) and the director's credential probe are opt-in only — a purely procedural workflow never touches them. Re-audit after any `skills update` (skills are re-fetched).

---

## 4. Final recommendation

### Top picks for "pure Three.js, zero API key, procedural game/asset building"

**Pick A — the game-building suite: `majidmanzarpour/threejs-game-skills` (6 keyless skills).**
Reasoning: only candidate that is *both* fully SAFE-audited at repo level *and* purpose-built for constructing whole 3D games procedurally (design brief → loop → procedural graphics → UI → QA). MIT, honest docs, PASS×3, no keys on the procedural path.

```bash
npx skills add https://github.com/majidmanzarpour/threejs-game-skills --skill threejs-game-director
npx skills add https://github.com/majidmanzarpour/threejs-game-skills --skill threejs-gameplay-systems
npx skills add https://github.com/majidmanzarpour/threejs-game-skills --skill threejs-aaa-graphics-builder
npx skills add https://github.com/majidmanzarpour/threejs-game-skills --skill threejs-game-ui-designer
npx skills add https://github.com/majidmanzarpour/threejs-game-skills --skill threejs-debug-profiler
npx skills add https://github.com/majidmanzarpour/threejs-game-skills --skill threejs-qa-release
```
(Install to project scope, one agent at a time, omit `-y` so you see prompts; **do not** add the three keyed generator skills.)

**Pick B — the image→3D specialist: `img2threejs/img2threejs`.**
Reasoning: unique zero-key capability (rebuild a reference image as procedural Three.js in code), Apache-2.0, Gen/Snyk PASS, Socket WARN explained and acceptable for single-user trust. Use when you have a reference image and want a gated, evidence-driven reconstruction rather than a hand-authored model.

```bash
npx skills add https://github.com/img2threejs/img2threejs --skill img2threejs
```

**Pick C — the modern fundamentals complement: `gamedev-skills/awesome-gamedev-agent-skills` (3 skills).**
Reasoning: PASS×3, Apache-2.0, current r186 patterns (import maps, `setAnimationLoop`, `Timer`), markdown-first payload, crisp when-NOT-to-use routing. Best "teach the agent correct Three.js idioms" layer under Pick A/B.

```bash
npx skills add https://github.com/gamedev-skills/awesome-gamedev-agent-skills --skill threejs-scene-setup
npx skills add https://github.com/gamedev-skills/awesome-gamedev-agent-skills --skill threejs-materials-lighting
npx skills add https://github.com/gamedev-skills/awesome-gamedev-agent-skills --skill threejs-gltf-loading
```

**Budget/single-skill alternative:** `freshtechbro/claudedesignskills --skill threejs-webgl` (one fat handbook, PASS×3, MIT, benign Python generator) or `mengto/skills --skill threejs` (+ `optimize-threejs-games` / `build-mobile-threejs-games` for game recipes; MIT, legendary publisher) — both fine; mengto gets the edge on reputation, freshtechbro on payload transparency (fully read today).
**Shader/WebGPU specialist add-on:** `dgreenheck/webgpu-claude-skill --skill webgpu-threejs-tsl`.
**Perf checklist add-on:** `emalorenzo/three-agent-skills --skill three-best-practices`.

### What to avoid
- **Any skill requiring TRIPO/MESHY/FAL/LAYER/EACHLABS/RUNWARE/GEMINI/ELEVENLABS/World-Labs keys** (out of scope by definition): majidmanzarpour `threejs-3d-generator`/`threejs-audio-generator`/`threejs-image-generator`, playableintelligence `meshyai`, all vendor wrappers.
- **cloudai-x/threejs-skills** (all 10) — CAUTION provenance (404 README clone target, no LICENSE, 6 commits/3.5k★); redundant with the PASS×3 gamedev-skills/mengto/freshtechbro docs.
- **Fork clones** (raptoravis, chrislaupama, avabillions2040, softwareinfocus, sfrmrc, devinilabs, eachlabs-mirrors, skills.volces.com, smithery.ai re-listings) — install from canonical repos only.
- **nexu-io/open-design `threejs` skill** — content read: it is a 1-page catalogue pointer whose `od.upstream`/body route to **CloudAI-X/threejs-skills** (the CAUTION-flagged repo). Installing it buys you nothing over the audited alternatives and funnels you to a flagged source.
- **UNCHECKED low-evidence tail** (openai/plugins three-*, full-stack-skills/cesartevisual 14–18-skill doc dumps, natea/fitfinder, jarrodmedrano, etc.) — not inspected; no need given the audited picks above.

### Safer workflow (applies to all)
1. `npx skills add <repo> --list` first; 2. read the SKILL.md on raw.githubusercontent.com before installing (frontmatter must be name/description only — no `hooks`/`allowed-tools` surprises; flag any `*.py/*.sh/*.js` in the skill folder); 3. install project-scope, no `-y`, one agent at a time; 4. set `DISABLE_TELEMETRY=1` if you don't want the CLI's anonymous telemetry; 5. re-audit after `skills update` (content is re-fetched).

---

## 5. Gaps / limitations

1. ~~mengto/skills full file~~ — **resolved**: `agent-skills/web-design/threejs/SKILL.md` read in full (clean); upgraded to Q-AUDIT. Remaining sub-gap: individual game-variant skills (`build-threejs-enemy-systems`, `build-mobile-threejs-games`, …) and their optional `scripts/`/`demo/` payloads not each read — spot-check before bulk-installing.
2. ~~nexu-io/open-design threejs skill~~ — **resolved**: content read — it's a catalogue pointer upstream to CloudAI-X (CAUTION); demoted to "skip" in §1/#9 and §"avoid".
3. **openai/plugins** threejs skills — content **not inspected** (UNCHECKED); only org-level trust. Low priority given audited picks.
4. **img2threejs `forge/` scripts** — not individually audited; Socket's 4-alert characterization + SKILL.md's own description accepted as the evidence base. A full line-by-line audit of every gate script was out of scope for a quick audit.
5. **majidmanzarpour helper scripts** beyond the prior-audited `threejs_3d_asset.py` (`create_threejs_game.py`, `inspect-threejs-canvas.mjs`, `check_evidence.py`, `probe_asset_credentials.sh`) — SKILL.md usage read; scripts not line-audited (repo-level SAFE audit + PASS×3 mitigate).
6. **Star counts unverifiable as organic** (img2threejs 18.1k in ~3 months; nexu-io 101k; cloudai-x asymmetry) — weak signals only.
7. **PlayableIntelligence org account age** not fetched (API rate limit); repo-level signals used instead (344★, MIT-in-frontmatter, license field null).
8. skills.sh Gen/Socket/Snyk badges are **scanners, not content audits**; PASS×3 ≠ manually verified (manual checks done for picks #1–#7 above).
9. Install counts = anonymous telemetry, snapshot 2026-10-14; they drift daily.
10. Nothing was installed or executed; runtime claims come from reading code/docs, not observation.

---

## 6. Sources

- [skills.sh search API — threejs game](https://skills.sh/api/search?q=threejs+game) · [webgl shader](https://skills.sh/api/search?q=webgl+shader) · [threejs scene](https://skills.sh/api/search?q=threejs+scene) — re-confirmation of ranking/keyless set (Algolia, 100-cap).
- [skills.sh: threejs-scene-setup](https://skills.sh/gamedev-skills/awesome-gamedev-agent-skills/threejs-scene-setup) — install cmd, r186 SKILL.md excerpt, **Gen/Socket/Snyk = Pass/Pass/Pass**, 3.7k installs, first seen 2026-06-27.
- [skills.sh: threejs-gameplay-systems](https://skills.sh/majidmanzarpour/threejs-game-skills/threejs-gameplay-systems) — **Pass/Pass/Pass**, 2.9k installs.
- [skills.sh: threejs-webgl (freshtechbro)](https://skills.sh/freshtechbro/claudedesignskills/threejs-webgl) — **Pass/Pass/Pass**, 4.3k installs, first seen 2026-02-27.
- [skills.sh: threejs (mengto)](https://skills.sh/mengto/skills/threejs) — SKILL.md excerpt (scene mental model), **Pass/Pass/Pass**, 1.8k installs, 6.7k★ repo.
- [skills.sh: threejs-game (playableintelligence)](https://skills.sh/playableintelligence/game-creator/threejs-game) — **Pass/Pass/Pass**, 1.0k installs, 344★.
- [skills.sh: webgpu-threejs-tsl (dgreenheck)](https://skills.sh/dgreenheck/webgpu-claude-skill/webgpu-threejs-tsl) — TSL quick-start excerpt, **Pass/Pass/Pass**, 1.3k installs.
- [skills.sh: img2threejs](https://skills.sh/img2threejs/img2threejs/img2threejs) — **Gen Pass / Socket Warn / Snyk Pass**, 18.1k★, 2.0k installs, first seen 2026-07-19.
- [skills.sh Socket audit for img2threejs](https://skills.sh/img2threejs/img2threejs/img2threejs/security/socket) — **exact 4 LOW anomaly alerts** (emit_target.py subprocess, test_primitive_watertightness.py node --eval, run_gates.py plugin orchestrator, test_suite_integrity.py python -c probe), audited 2026-10-05; "no explicit malware, data exfiltration, cryptomining, or backdoor logic".
- [skills.sh: three-best-practices (emalorenzo)](https://skills.sh/emalorenzo/three-agent-skills/three-best-practices) — 120+ rules, **Pass/Pass/Pass**.
- GitHub API: [gamedev-skills/awesome-gamedev-agent-skills](https://api.github.com/repos/gamedev-skills/awesome-gamedev-agent-skills) (Apache-2.0, 1,482★, created 2026-06-24) + [org gamedev-skills](https://api.github.com/orgs/gamedev-skills) (created 2026-06-27) + [skills/ contents](https://api.github.com/repos/gamedev-skills/awesome-gamedev-agent-skills/contents/skills) + [web-engines contents](https://api.github.com/repos/gamedev-skills/awesome-gamedev-agent-skills/contents/skills/web-engines) — threejs trio lives at `skills/web-engines/threejs-*`.
- GitHub API: [freshtechbro/claudedesignskills](https://api.github.com/repos/freshtechbro/claudedesignskills) (MIT, 1,048★, pushed 2025-11-20) + [user freshtechbro](https://api.github.com/users/freshtechbro) (created 2014) + [git tree](https://api.github.com/repos/freshtechbro/claudedesignskills/git/trees/main?recursive=1) — threejs-webgl payload = SKILL.md + references + starter assets + `scripts/setup_scene.py`.
- GitHub API: [MengTo/Skills](https://api.github.com/repos/mengto/skills) (MIT, 6,748★, active) + [user MengTo](https://api.github.com/users/MengTo) (created 2011, 3,310 followers).
- GitHub API: [dgreenheck/webgpu-claude-skill](https://api.github.com/repos/dgreenheck/webgpu-claude-skill) (license null, 1,242★) + [user dgreenheck](https://api.github.com/users/dgreenheck) (created 2013, threejsroadmap.com) + [git tree](https://api.github.com/repos/dgreenheck/webgpu-claude-skill/git/trees/main?recursive=1) — SKILL.md + docs + examples/templates JS only.
- GitHub API: [emalorenzo/three-agent-skills](https://api.github.com/repos/emalorenzo/three-agent-skills) (license null, 60★, stale) + [git tree](https://api.github.com/repos/emalorenzo/three-agent-skills/git/trees/main?recursive=1) — skill dirs = SKILL.md + rules/*.md only.
- GitHub API: [playableintelligence/game-creator](https://api.github.com/repos/playableintelligence/game-creator) (license null, 344★, pushed 2026-05-25).
- GitHub API: [nexu-io/open-design](https://api.github.com/repos/nexu-io/open-design) (Apache-2.0, 100,964★) + [org nexu-io](https://api.github.com/orgs/nexu-io) (created 2026-02-24).
- GitHub HTML pages (path discovery after API 403 rate-limit): [MengTo/Skills](https://github.com/MengTo/Skills) (repo structure: `agent-skills/<category>/<skill>/SKILL.md`, 176 skills, 151 commits, MIT) · [nexu-io/open-design](https://github.com/nexu-io/open-design) (`skills/` = 100+ functional skills, 3,740 commits).
- Raw fetches (final gap-closers): [mengto threejs SKILL.md](https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/threejs/SKILL.md) — full content read, clean · [nexu-io threejs SKILL.md](https://raw.githubusercontent.com/nexu-io/open-design/main/skills/threejs/SKILL.md) — full content read, catalogue pointer to `https://github.com/CloudAI-X/threejs-skills`.
- Raw fetches (content audits): [freshtechbro threejs-webgl SKILL.md](https://raw.githubusercontent.com/freshtechbro/claudedesignskills/main/.claude/skills/threejs-webgl/SKILL.md) + [setup_scene.py](https://raw.githubusercontent.com/freshtechbro/claudedesignskills/main/.claude/skills/threejs-webgl/scripts/setup_scene.py) · [gamedev-skills threejs-scene-setup SKILL.md](https://raw.githubusercontent.com/gamedev-skills/awesome-gamedev-agent-skills/main/skills/web-engines/threejs-scene-setup/SKILL.md) · [img2threejs SKILL.md](https://raw.githubusercontent.com/img2threejs/img2threejs/main/SKILL.md) + [package.json](https://raw.githubusercontent.com/img2threejs/img2threejs/main/package.json) (npm installer ships only `bin/img2threejs.mjs`) · [img2threejs root contents](https://api.github.com/repos/img2threejs/img2threejs/contents/) (SKILL.md at root; forge/grimoire/skills/bin dirs) · [majidmanzarpour gameplay-systems](https://raw.githubusercontent.com/majidmanzarpour/threejs-game-skills/main/skills/threejs-gameplay-systems/SKILL.md), [aaa-graphics-builder](https://raw.githubusercontent.com/majidmanzarpour/threejs-game-skills/main/skills/threejs-aaa-graphics-builder/SKILL.md), [game-ui-designer](https://raw.githubusercontent.com/majidmanzarpour/threejs-game-skills/main/skills/threejs-game-ui-designer/SKILL.md), [game-director](https://raw.githubusercontent.com/majidmanzarpour/threejs-game-skills/main/skills/threejs-game-director/SKILL.md), [debug-profiler](https://raw.githubusercontent.com/majidmanzarpour/threejs-game-skills/main/skills/threejs-debug-profiler/SKILL.md), [qa-release](https://raw.githubusercontent.com/majidmanzarpour/threejs-game-skills/main/skills/threejs-qa-release/SKILL.md) · [playableintelligence threejs-game SKILL.md](https://raw.githubusercontent.com/PlayableIntelligence/game-creator/main/skills/threejs-game/SKILL.md).
- Local prior reports: `.agents/researcher/skills-sh-threejs-catalog-2026-10-14.md` · `.agents/researcher/skill-security-audit-2026-10-14.md` — full catalog + SAFE\*/CAUTION flags + `skills` CLI install mechanics (no auto-exec on install; risk = SKILL.md content at usage time).
