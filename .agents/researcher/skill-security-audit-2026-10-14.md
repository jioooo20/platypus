# Research: Skill Security Audit — three `npx skills add` commands

**Date:** 2026-10-14
**Query:** Determine whether three `npx skills add ...` skill installations are SAFE to install, by inspecting their source repositories (read-only research; no install/execution performed).
**Sources:** 15 (GitHub web + GitHub REST API + raw.githubusercontent.com + npmjs.com + security literature)

---

## 1. Verdict Table

| # | Command | Skill folder verified? | Verdict | One-line reason |
|---|---------|------------------------|---------|-----------------|
| 1 | `npx skills add https://github.com/majidmanzarpour/threejs-game-skills --skill threejs-3d-generator` | ✅ exists at `skills/threejs-3d-generator/` | **SAFE** | Markdown + one audited 72 KB Python helper whose *only* network endpoint is the official Tripo API (`api.tripo3d.ai`); no exfil/injection found. Ships runnable code — it can spend your Tripo credits if you set `TRIPO_API_KEY`. |
| 2 | `npx skills add https://github.com/calesthio/openmontage --skill 3d-asset-generation` | ✅ exists at `.agents/skills/3d-asset-generation/` | **SAFE** | The installed folder contains exactly 2 files (SKILL.md + agents/openai.yaml), both pure markdown/YAML, ASCII-only, zero scripts, zero URLs, no injection text. |
| 3 | `npx skills add https://github.com/cloudai-x/threejs-skills --skill threejs-loaders` | ✅ exists at `skills/threejs-loaders/` | **CAUTION** | File content at the audited commit is clean (markdown-only Three.js docs, ASCII-only), **but** provenance is weak: README tells users to clone a repo that returns **HTTP 404**, no LICENSE file despite an MIT claim, brand-new org account, 6 commits vs 3.5 k stars. Install is low-risk *today*; re-audit before/after any `skills update`. |

Legend: **SAFE** = content verified, no malicious/risky patterns found at audited commit · **CAUTION** = no malice detected, but trust signals are weak → install only with eyes open · **AVOID** = verified risky · **UNVERIFIED** = could not fetch/inspect.

**None of the three commands was executed.** This is a read-only audit of the repositories as they exist on 2026-10-14.

---

## 2. Repo-by-Repo Findings

### 2.1 `majidmanzarpour/threejs-game-skills` — skill `threejs-3d-generator`

**Contents (full git tree via API, `truncated: false`):**

```
.gitignore, AGENTS.md, LICENSE, README.md,
install.sh (4.1 KB), package.json (1.1 KB), package-lock.json,
scripts/            ← maintainer validation helpers + tests (NOT installed by --skill)
skills/
  threejs-3d-generator/            ← THE REQUESTED SKILL
    SKILL.md                        (10,441 B)
    agents/openai.yaml              (277 B)
    references/api-notes.md         (14,204 B)
    references/image-generator-workflows.md (2,199 B)
    references/threejs-integration.md (5,974 B)
    scripts/threejs_3d_asset.py     (72,710 B, executable)  ← the only executable in this skill
  threejs-aaa-graphics-builder/ threejs-audio-generator/ threejs-debug-profiler/
  threejs-game-director/ threejs-game-ui-designer/ threejs-gameplay-systems/
  threejs-image-generator/ threejs-qa-release/     (other skills, not requested)
```

`npx skills add ... --skill threejs-3d-generator` installs **only the `skills/threejs-3d-generator/` folder** (SKILL.md + references + the Python script). No `.git/hooks`, no `package.json` inside the skill folder, no submodules, no binaries other than JPG scorecard anchors in a *different* skill.

**SKILL.md analysis (full text read):**
- Frontmatter: `name: threejs-3d-generator` + `description: ...` only. **No `hooks`, no `allowed-tools` escalation, no embedded scripts.**
- Body instructs the agent to run its own helper, e.g.:
  > `python3 <this-skill-dir>/scripts/threejs_3d_asset.py text --prompt "..." --checkpoint artifacts/hover-bike-job.json --wait --download --out-dir assets/models/hover-bike`
- Explicit key hygiene statement (SKILL.md, "API key" section):
  > "The script reads `--api-key` or `TRIPO_API_KEY`. **Keys never go in skill files, game code, or reports.**"
- No `curl | bash`, no `wget`, no "ignore previous instructions", no instructions to read `.env`/SSH keys, no remote endpoints other than (by reference) Tripo.
- **Hidden-character scan:** only non-ASCII characters present are `…` and `—` (ellipsis/em-dash typography). **No Unicode tag characters (U+E0000–U+E007F), no bidi overrides, no zero-width characters** in any of the three audited SKILL.md files.

**`scripts/threejs_3d_asset.py` (72,710 B) — the only executable:**
- Whole-file scans (patterns: `subprocess`, `os.system`, `popen`, `eval(`, `exec(`, `base64`, `b64decode`, `pickle`, `marshal`, `__import__`, `socket`, `/dev/tcp`, `Invoke-Expression`, `ssh`, `.aws`, `.ssh`, `webhook`, `ngrok`, `pastebin`, `discord`, `telegram`, C2 IPs): **zero matches**.
- Whole-file URL extraction: **exactly one URL in the entire file**:
  > `BASE_URL = "https://api.tripo3d.ai/v2/openapi"`  (`threejs_3d_asset.py`, near top of file)
- `references/api-notes.md:7` confirms the same single base URL: `- Base URL: https://api.tripo3d.ai/v2/openapi`
- Env access: only `os.environ.get("TRIPO_API_KEY")` inside `api_key_from()` — reads the key it needs to call Tripo; the key is sent **only** as `Authorization: Bearer` to `api.tripo3d.ai`. Checkpoints explicitly exclude credentials ("no credentials, upload tokens, or output URLs" — `Checkpoint` docstring).
- Filesystem writes: `atomic_write()` targets only `--out-dir` / `--checkpoint` paths supplied by the user; no writes outside project dirs, no persistence mechanisms (no cron, no registry/startup entries, no shell-profile edits).
- Downloads: artifacts are fetched only from URLs **returned by the Tripo API in task output** (`download_outputs()` filters `http(s)` URLs from `task["output"]`), written under `out_dir`.
- Read note: I read the majority of the file directly and pattern-scanned/URL-extracted the complete file; the pattern scans cover 100 % of the content.

**`install.sh` (root, NOT executed by the `npx` path):** `set -euo pipefail`; copies `./skills/*` into `~/.codex/skills`, `~/.claude/skills` or `~/.agents/skills`. The `rm -rf` calls (install.sh:114, :139, :149) target only the skill destination directories it manages (`rm -rf "$dest"`, `rm -rf "$target/$installed_name"`), never user data. Benign; only relevant if you choose the clone-and-run fallback.

**Root `package.json`:** scripts are `check:scripts`, `validate:skills`, `test:helpers`, `install:codex|claude|all` — **no `postinstall`, no `prepare`, no `preinstall`**. devDeps: `@playwright/test`, `pngjs`. Not installed by the `skills` CLI anyway.

**Dangerous commands found:** **None.** The only command families the skill asks the agent to run are `python3 <skill-dir>/scripts/threejs_3d_asset.py …` and reading markdown references.

**Trust signals:**
- Repo created 2026-06-14, last push 2026-09-28 (recent, active); 2,498 ★ / 245 forks / 11 commits / 5 open issues.
- **MIT LICENSE file present** (GitHub API `license.spdx_id: MIT`).
- Owner `majidmanzarpour`: GitHub account since **2015-07-05**, 10 public repos, 187 followers, linked X account; README names the author and links live demo games on `*.netlify.app`.
- README quality: detailed, documents API-key costs, honest failure modes. Not auto-generated/low-effort.
- Third-party dependency: **Tripo API (`api.tripo3d.ai`)** — a known commercial 3D-generation platform; optional. Optional keys referenced in README: `TRIPO_API_KEY`, `GEMINI_API_KEY` (Google), `ELEVENLABS_API_KEY` — all official provider domains.
- Residual (accepted) risk: when you *use* this skill with a real `TRIPO_API_KEY`, it submits **paid** tasks to Tripo and uploads images you give it — by design, disclosed in README/SKILL.md.

---

### 2.2 `calesthio/openmontage` — skill `3d-asset-generation`

**URL note:** `github.com/calesthio/openmontage` redirects to **`calesthio/OpenMontage`** (GitHub is case-insensitive). Both resolve to the same repo — verified.

**Requested skill folder contents (complete listing via API):**

```
.agents/skills/3d-asset-generation/
  SKILL.md              (4,954 B)   ← markdown only
  agents/openai.yaml    (247 B)     ← YAML metadata only
```

That is the **entire** install payload — no `scripts/`, no `*.py/*.sh/*.js`, no binaries, no `package.json`, no archives. (The repo at large contains lots of Python/tools/Makefiles, but the `skills` CLI installs only the selected skill directory.)

**SKILL.md analysis (full text read):**
- Frontmatter: `name: 3d-asset-generation`, `description: Generate, reconstruct, inspect, and route production 3D assets for OpenMontage worlds using Atlas Cloud, fal.ai, licensed catalogs, and Blender.` — nothing else.
- Body: routing table, cost/quote discipline, prompt contract, mandatory mesh QA in Blender, world-fidelity budget. **Zero shell commands, zero URLs/domains, zero env-var access, zero credential handling.**
- References *tool names* (`atlas_3d`, `fal_3d`, `blender_world`, `threejs_asset_catalog`) that live in OpenMontage's `tools/` directory — **these are NOT part of this skill install**, so the skill is partly non-functional standalone (functional caveat, not a security issue).
- `agents/openai.yaml` (full content):
  > `interface: display_name: "3D Asset Generation" / short_description: "Generate and assemble production 3D assets" / default_prompt: "Use $3d-asset-generation to source, generate, validate, and assemble production-ready 3D assets for this world."` — benign.
- **Hidden-character scan: pure ASCII.** No Unicode tags/bidi/zero-width. Keyword scan for injection patterns (`ignore previous`, `disregard`, `do not tell`, `exfiltrat`, `base64`, `curl|`, `wget|`, `eval(`, `environ`): **no matches**.

**Dangerous commands found:** **None** — there are no commands at all in this skill.

**Trust signals:**
- Repo created 2026-03-29, last push 2026-10-12 (very active); 67,970 ★ / 8,698 forks / 478 commits / 386 open issues / discussions enabled; claimed GitHub Trending "#1 Repository of the Day"; homepage `openmontage.video`.
- **AGPL-3.0 LICENSE file present** (GitHub API confirms).
- Owner `calesthio`: account created **2025-05-24** (~17 months old), display name "Calesthio", bio "Creator of OpenMontage and Crucix", self-listed company "Microsoft" (self-reported, unverified), 1,354 followers, 9 public repos.
- Third-party services *mentioned by name* in the skill (not linked, no URLs): **Atlas Cloud**, **fal.ai**, Kenney CC0 asset catalog, Blender — all established/legitimate services. The wider repo (not installed) also references Pexels/Pixabay/ElevenLabs/Google etc.
- Caveats: star count is extraordinarily high for its age (cannot be verified as organic from the API alone); AGPL license means if you *do* clone the whole repo and modify/serve it, AGPL obligations apply (irrelevant to copying one skill file).

---

### 2.3 `cloudai-x/threejs-skills` — skill `threejs-loaders`

**URL note:** `github.com/cloudai-x/threejs-skills` resolves to **`CloudAI-X/threejs-skills`** — verified (same repo).

**Complete git tree (API, `truncated: false`) — the entire repository:**

```
README.md
skills/
  threejs-animation/SKILL.md      threejs-fundamentals/SKILL.md
  threejs-geometry/SKILL.md       threejs-interaction/SKILL.md
  threejs-lighting/SKILL.md       threejs-loaders/SKILL.md  ← THE REQUESTED SKILL (14,032 B)
  threejs-materials/SKILL.md      threejs-postprocessing/SKILL.md
  threejs-shaders/SKILL.md        threejs-textures/SKILL.md
```

**No executable content exists anywhere in this repository** — no `.sh`, `.py`, `.js`, no `package.json`, no binaries, no `.git/hooks` shipped, no submodules, **no LICENSE file**. Each skill folder contains exactly one `SKILL.md`.

**`skills/threejs-loaders/SKILL.md` analysis (full text read):**
- Frontmatter: `name: threejs-loaders` + `description: Three.js asset loading - GLTF, textures, images, models, async patterns…` only. No hooks.
- Body is standard Three.js documentation: `LoadingManager`, `TextureLoader`, `GLTFLoader`, Draco/KTX2, OBJ/FBX/STL/PLY, async patterns, caching, error handling.
- **Only two external domains referenced (both official CDNs, used inside code *examples* that your game would run in a browser, not shell commands):**
  > `dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");`  ← Google's official static CDN
  > `ktx2Loader.setTranscoderPath("https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/basis/");`  ← jsDelivr serving the official `three` npm package
- `base64` appears only as a legitimate texture example: `loader.load("data:image/png;base64,iVBORw0KGgo...")` — a placeholder data URL, not obfuscation.
- **Hidden-character scan: pure ASCII.** Injection-keyword scan (`ignore previous`, `disregard`, `do not tell`, `exfiltrat`, `curl|`, `wget|`, `eval(`): **no matches**. No env-var access, no credentials, no commands.

**Dangerous commands found:** **None** — no shell commands of any kind.

**Trust signals (this is where CAUTION comes from):**
- Repo created **2026-01-19**, last push 2026-07-09; 3,559 ★ / 405 forks / **only 6 commits**.
- **No LICENSE file** (GitHub API `license: null`) even though the README states "MIT License" — legal ambiguity.
- Owner `CloudAI-X`: account created **2026-01-03** (~9 months old), 12 public repos, 170 followers, bio "Agents/Workflows/Docs", X `@cloudxdev`.
- **Originality problem:** the README's install instructions still point at a different project:
  > "Clone this repository into your project… `git clone https://github.com/pinkforest/threejs-playground.git`"
  I fetched that URL: **HTTP 404 (does not exist)**. The README also claims skills live in `.claude/skills/` while the repo actually uses `skills/`. Both are hallmarks of a **copied/stale README** — i.e., the repo appears to be re-published content rather than original work.
- Net: content at the audited commit is verifiably inert markdown; the *publisher* is the weak link, and skills are re-fetchable on `skills update`, so provenance matters for the future.

---

## 3. How the `skills` CLI Install Works (does anything auto-execute?)

**Package:** npm **`skills`** v1.7.2 — https://www.npmjs.com/package/skills — repo `vercel-labs/skills` (Vercel Labs; npm collaborators include `rauchg` / Guillermo Rauch). MIT license, ~4.8 M weekly downloads, published 4 days before this audit.

**What `npx skills add <repo> --skill <name>` does (from official README + `package.json`):**

1. **Resolves the source** — GitHub shorthand/URL/API (or GitLab/Azure/local path/any git URL). Falls back through: anonymous GitHub API → your `GITHUB_TOKEN`/`GH_TOKEN` → `gh repo clone`/configured git credentials → SSH. Credentials are used, never printed.
2. **Downloads** the skill files (direct-URL installs are capped at 10 MiB download / 25 MiB extracted / 1,000 files by default; overridable via env).
3. **Installs by symlinking (default, "Recommended") or copying (`--copy`)** the selected skill folders into `./<agent>/skills/` (project scope) or `~/<agent>/skills/` (`-g`). It asks for confirmation interactively unless you pass `-y`/`--all`, and asks which agent(s) to target unless you pass `-a`.

**Auto-execution assessment:**
- ✅ **No npm lifecycle scripts:** `package.json` has **no `postinstall`/`prepare`/`preinstall`** for consumers (`prepare: husky` is a dev-repo script and does not run when the published tarball is installed as a dependency). Runtime deps are only `tar` and `yaml`. `npx skills add` therefore does **not** execute anything from the target repository.
- ✅ **Install = download + link/copy of markdown (and whatever files are in the skill folder).** The CLI does not run `install.sh`, `package.json` scripts, or skill scripts at install time. Repo #1's `install.sh` is only run if *you* run it manually.
- ⚠️ **Risk shifts to *usage*, not *installation*.** Once installed, your coding agent reads `SKILL.md` as trusted instructions whenever its description matches your task. A malicious SKILL.md can instruct the agent to run commands, read secrets, or exfiltrate data — this is the documented "ToxicSkills"/"context poisoning" class (Snyk, OWASP AST01, CSA, USENIX 2026 studies). This is why content review (done above) matters more than the installer.
- ⚠️ **Hooks:** per the CLI's own compatibility table, agents such as **Claude Code, Cline, Kiro** support skill *hooks* — a skill that declared hooks could get executed by those agents when triggered. **None of the three audited SKILL.md files declare hooks** (frontmatter is `name` + `description` only).
- ⚠️ **Telemetry:** the CLI sends anonymous usage data including repo/skill identifiers (only for GitHub-confirmed public repos). Disable with `DISABLE_TELEMETRY=1` or `DO_NOT_TRACK=1`.
- ℹ️ Note the asymmetry: `npx skills add` does *not* run target-repo code, but a plain `npm install` inside a cloned repo **would** run that repo's npm scripts — a different, riskier workflow.

---

## 4. Overall Recommendation

**Install order of preference:**

1. **`calesthio/openmontage --skill 3d-asset-generation` — installable (SAFE).** Zero executable payload; you can read all 4.9 KB in one screen. Only caveat: it references OpenMontage tools that won't exist unless you install the full repo, so it may be unusable standalone — check that it actually helps your workflow.
2. **`majidmanzarpour/threejs-game-skills --skill threejs-3d-generator` — installable (SAFE), but understand what it does.** It is the only one that ships runnable code. The code was audited end-to-end: single endpoint `api.tripo3d.ai`, no exfil, no shell-outs. Guardrails to keep: do **not** set `TRIPO_API_KEY` until you're ready to spend Tripo credits; run the skill's commands only after reading the command line it proposes; keep using it while the repo stays at the audited commit (`main` @ `8286774b` tree / last push 2026-09-28).
3. **`cloudai-x/threejs-skills --skill threejs-loaders` — CAUTION.** Content is clean and it's just documentation, so the immediate risk is low, but the provenance is the weakest of the three (404 clone target in README, no LICENSE file, new org, 6 commits/3.5 k stars). If you want Three.js loader docs, prefer an equivalent from a trusted source (e.g. the official Three.js docs, or `vercel-labs/agent-skills`), or accept this one knowing it is **markdown you have already had audited at this commit** — and re-audit after any update.

**Safer workflow ("read-before-install"), recommended for all three regardless of verdict:**

```bash
# 1. List what the repo offers, without installing anything
npx skills add <repo> --list

# 2. Read the exact files first (raw GitHub / API)
#    - SKILL.md frontmatter must be only name/description (no hooks/allowed-tools surprises)
#    - list the skill folder; flag any *.sh/*.py/*.js/package.json

# 3. Pin your review, then install to project scope only (not -g), one agent at a time
npx skills add <repo> --skill <name> -a <agent>        # omit -y so you see prompts

# 4. After install, diff the installed copy against what you reviewed; re-check on `skills update`
```

Additional hardening: run installs in a container/VM or with an agent that asks permission before shell commands; set `DISABLE_TELEMETRY=1` if you don't want the CLI's anonymous telemetry; never combine these skills with unrestricted env access (the realistic worst case for skill #1 is *spent Tripo credits*, for skills #2/#3 essentially *prompt-level influence on your agent*).

**Bottom line (Bahasa Indonesia — ringkasan):**
Ketiga perintah **tidak ada yang berbahaya/bermuatan jahat** berdasarkan audit baca-saja ini. Skill #1 (`threejs-3d-generator`) aman tapi membawa script Python yang bisa memakai kredit Tripo API Anda kalau `TRIPO_API_KEY` diset. Skill #2 (`3d-asset-generation`) paling bersih — hanya file markdown. Skill #3 (`threejs-loaders`) isinya juga bersih (dokumentasi Three.js murni), tapi repo-nya mencurigakan dari sisi asal-usul (README-nya menyuruh clone repo yang 404, tidak ada file LICENSE, akun baru) → **hati-hati**, dan audit ulang sebelum/sesudah update. Perintah `npx skills add` sendiri **tidak mengeksekusi apapun** saat install — ia hanya menyalin/men-symlink file; risikonya muncul **ketika agent membaca SKILL.md saat dipakai**.

---

## 5. Known Malicious Patterns Checklist (per repo)

| Pattern | #1 threejs-3d-generator | #2 3d-asset-generation | #3 threejs-loaders |
|---|---|---|---|
| Obfuscated code / base64 blobs | ❌ none (base64 only as benign data-URL doc example absent here; whole-file scan clean) | ❌ none (no code) | ⚠️ `data:image/png;base64,...` = standard texture example, not obfuscation |
| Credential/env exfiltration | ❌ reads only `TRIPO_API_KEY` to authenticate to Tripo; never transmits elsewhere | ❌ no env access at all | ❌ no env access |
| Unexpected network calls | ❌ only `https://api.tripo3d.ai/v2/openapi` + Tripo-returned artifact URLs | ❌ none (no URLs) | ⚠️ example CDN URLs only (`gstatic.com` Draco, `cdn.jsdelivr.net` three.js) — official, browser-side, inside code samples |
| Filesystem writes outside project | ❌ writes only to user-specified `--out-dir`/`--checkpoint` | ❌ no code | ❌ no code |
| Persistence mechanisms | ❌ none | ❌ none | ❌ none |
| Prompt-injection payloads in SKILL.md | ❌ none found (keyword + Unicode-tag/bidi/zero-width scan) | ❌ none (pure ASCII) | ❌ none (pure ASCII) |
| `curl \| bash` / pipe-to-shell instructions | ❌ none | ❌ none | ❌ none |
| Hook declarations (auto-exec in Claude Code/Cline/Kiro) | ❌ none | ❌ none | ❌ none |
| Git submodules / binaries / `.git/hooks` shipped | ❌ none | ❌ none | ❌ none |

---

## 6. Uncertainties & Limitations

- **Snapshot audit:** findings apply to the commits present on 2026-10-14 (`main` branches). Repos can change; `skills update` re-fetches. Re-audit after updates.
- I audited **only the three requested skill folders** (+ root installer/manifest of repo #1). The other ~10 skills in repo #1 and ~700 skill files in repo #2 were **not** individually reviewed.
- Star/fork counts cannot be verified as organic from the GitHub API alone; treated only as weak signals.
- "Company: Microsoft" / author identities are self-reported profile fields, not verified.
- I did not execute any install or script; runtime behavior claims about the `skills` CLI are based on its official README + `package.json`, not on observed execution in this environment.
- Not inspected: GitHub Actions workflows in repo #2's `.github/` (they run in CI on GitHub's side, not on your machine when installing a skill).

---

## 7. Sources

- [skills — npm](https://www.npmjs.com/package/skills) — official CLI docs: install mechanics, scope, telemetry, agent compatibility/hooks table.
- [vercel-labs/skills — package.json](https://raw.githubusercontent.com/vercel-labs/skills/main/package.json) — confirms no `postinstall`; deps = `tar`, `yaml`.
- [majidmanzarpour/threejs-game-skills](https://github.com/majidmanzarpour/threejs-game-skills) — repo page, README, file tree.
- [GitHub API: repo metadata (threejs-game-skills)](https://api.github.com/repos/majidmanzarpour/threejs-game-skills) — created 2026-06-14, 2,498★, MIT.
- [GitHub API: full git tree (threejs-game-skills)](https://api.github.com/repos/majidmanzarpour/threejs-game-skills/git/trees/main?recursive=1) — complete file listing.
- [threejs-3d-generator/SKILL.md](https://raw.githubusercontent.com/majidmanzarpour/threejs-game-skills/main/skills/threejs-3d-generator/SKILL.md) — audited skill instructions.
- [threejs_3d_asset.py](https://raw.githubusercontent.com/majidmanzarpour/threejs-game-skills/main/skills/threejs-3d-generator/scripts/threejs_3d_asset.py) — the 72 KB helper, fully pattern-scanned (sole URL: `api.tripo3d.ai`).
- [references/api-notes.md](https://raw.githubusercontent.com/majidmanzarpour/threejs-game-skills/main/skills/threejs-3d-generator/references/api-notes.md) — line 7: single Tripo base URL.
- [install.sh](https://raw.githubusercontent.com/majidmanzarpour/threejs-game-skills/main/install.sh) — local installer, read in full; `rm -rf` scoped to managed skill dirs.
- [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) — repo page, README, AGPL-3.0.
- [GitHub API: repo metadata (OpenMontage)](https://api.github.com/repos/calesthio/OpenMontage) — created 2026-03-29, 67,970★, AGPL-3.0.
- [.agents/skills/3d-asset-generation/SKILL.md](https://raw.githubusercontent.com/calesthio/OpenMontage/main/.agents/skills/3d-asset-generation/SKILL.md) — audited skill (4,954 B, markdown only).
- [CloudAI-X/threejs-skills](https://github.com/CloudAI-X/threejs-skills) — repo page, README (clone target `pinkforest/threejs-playground` → HTTP 404 when fetched).
- [GitHub API: repo metadata (threejs-skills)](https://api.github.com/repos/CloudAI-X/threejs-skills) — created 2026-01-19, 3,559★, `license: null`, 6 commits.
- [skills/threejs-loaders/SKILL.md](https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-loaders/SKILL.md) — audited skill (14,032 B, markdown only).
- Context: [OWASP Agentic Skills Top 10 — AST01 Malicious Skills](https://owasp.org/www-project-agentic-skills-top-10/ast01) · [CSA: Agent Context Poisoning (SKILL.md)](https://labs.cloudsecurityalliance.org/research/csa-research-note-skill-md-agent-context-poisoning-20260506/) · [SkillMD: Agent Skill Security](https://skillmd.com/agent-skills-security) (Snyk "ToxicSkills" study, Cisco Skill Scanner, NVIDIA `untrusted_install` scanner) — threat-model background for why SKILL.md content review (not installer review) is the decisive control.
