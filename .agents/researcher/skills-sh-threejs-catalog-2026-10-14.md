# Research: skills.sh Three.js Skill Catalog + cloudai-x Inventory + 3D-Asset-Generation Candidates

**Date:** 2026-10-14
**Query:** Find all Three.js-related skills on skills.sh (registry behind the `skills` CLI / vercel-labs), especially 3D asset creation/generation skills, and enumerate everything published by `cloudai-x`. Research-only; no installs executed.
**Sources:** ~30 (skills.sh search API + skill/repo pages + skills.sh docs + GitHub REST API + prior local audit)
**Prior context:** `.agents/researcher/skill-security-audit-2026-10-14.md` (audited `cloudai-x/threejs-skills --skill threejs-loaders` = CAUTION; `majidmanzarpour/threejs-game-skills --skill threejs-3d-generator` = SAFE; `calesthio/openmontage --skill 3d-asset-generation` = SAFE).

---

## 0. Method — how skills.sh search was queried (documented)

| # | Endpoint / page | What it gives |
|---|---|---|
| 1 | `https://skills.sh/api/search?q=<query>` | **JSON search API (Algolia-backed)** — returns `{query, searchType: fuzzy\|semantic, skills:[{id, source, skillId, name, installs}], count}`. **Hard-capped at 100 results/query.** No descriptions in payload. Discovered by probing the site; not listed in `/docs`. |
| 2 | `https://skills.sh/` (web UI) | Leaderboard + "Search skills…" box (the box calls endpoint #1). |
| 3 | `https://skills.sh/<owner>/<repo>` | Repo page: skill list, per-skill install counts, total installs, GitHub link, one-line install command. |
| 4 | `https://skills.sh/<owner>/<repo>/<skill>` | Skill page: install command, **SKILL.md excerpt (description)**, repo link, **GitHub stars**, first-seen date, and **per-skill security audits** (Gen Agent Trust Hub / Socket / Snyk) at `.../<skill>/security/<provider>`. |
| 5 | `https://skills.sh/docs`, `/docs/api`, `/audits` | Docs; `/audits` only lists the **top-50** audited skills (none of the threejs collections appear there — but per-skill audit badges exist on #4). |
| 6 | `api.github.com` (REST) | Provenance: created/pushed dates, stars, license, org vs user, full git trees (payload-type check). |

**Queries executed (10/10 from the task list + extras):** `threejs`, `three.js`, `three`, `3d`, `3d-asset`, `3d-generation`, `gltf`, `webgl`, `3d model generation` (semantic mode), `cloudai-x`. One transient `503` on `webgl` succeeded on retry.
**Fallback used:** none needed — skills.sh WAS scrapeable via endpoint #1. GitHub API used only for provenance/payload checks.
**Install counts** below are skills.sh telemetry (anonymous CLI installs), snapshot 2026-10-14.

**Provenance flag legend (quick-check only, NOT a full audit):**
- **SAFE\*** = fully audited in prior local audit (content + payload read)
- **CAUTION** = prior audit: content clean but weak provenance, OR same-pattern weaknesses found today
- **PASS×3** = skills.sh per-skill automated audits (Gen/Socket/Snyk) all Pass as of today
- **ORG** = publisher is the official vendor GitHub org (Meshy, fal, Layer, EachLabs, Runware, OpenAI)
- **UNCHECKED** = only repo-level metadata seen (name/installs), content not inspected

---

## 1. Table of Three.js-related skills found on skills.sh

Sorted by installs (desc). "Key?" = external paid API key needed for its core function. Focus codes: **AG=asset-gen**, LD=loaders/asset I/O, RN=rendering/scene, SH=shaders, UI=interaction/game, TOOL=workflow/QA, R3F=React-Three-Fiber.

### 1a. cloudai-x/threejs-skills — `npx skills add cloudai-x/threejs-skills --skill <name>` (all 10 = markdown-only docs, Key? = No)

| Skill | Publisher | Repo | Focus | Key? | Provenance flag |
|---|---|---|---|---|---|
| threejs-animation (17,569) | cloudai-x | CloudAI-X/threejs-skills | RN/animation | No | CAUTION (prior) — PASS×3 verified only for threejs-loaders |
| threejs-fundamentals (14,550) | cloudai-x | CloudAI-X/threejs-skills | RN | No | CAUTION (prior) |
| threejs-shaders (13,075) | cloudai-x | CloudAI-X/threejs-skills | SH | No | CAUTION (prior) |
| threejs-geometry (12,196) | cloudai-x | CloudAI-X/threejs-skills | RN | No | CAUTION (prior) |
| threejs-materials (12,133) | cloudai-x | CloudAI-X/threejs-skills | RN | No | CAUTION (prior) |
| threejs-interaction (11,942) | cloudai-x | CloudAI-X/threejs-skills | UI | No | CAUTION (prior) |
| threejs-postprocessing (11,251) | cloudai-x | CloudAI-X/threejs-skills | RN | No | CAUTION (prior) |
| threejs-lighting (10,963) | cloudai-x | CloudAI-X/threejs-skills | RN | No | CAUTION (prior) |
| threejs-loaders (10,637) | cloudai-x | CloudAI-X/threejs-skills | LD | No | **CAUTION (prior) + PASS×3 (today, skill page)** |
| threejs-textures (10,458) | cloudai-x | CloudAI-X/threejs-skills | RN | No | CAUTION (prior) |

### 1b. Other threejs skills (≥ ~400 installs)

| Skill (installs) | Publisher | Repo | Focus | Key? | Provenance flag |
|---|---|---|---|---|---|
| threejs-webgl (4,237) | freshtechbro | freshtechbro/claudedesignskills | RN | No | UNCHECKED |
| threejs-gltf-loading (3,705) | gamedev-skills | gamedev-skills/awesome-gamedev-agent-skills | LD | No | UNCHECKED |
| threejs-materials-lighting (3,668) | gamedev-skills | same | RN | No | UNCHECKED |
| threejs-scene-setup (3,634) | gamedev-skills | same | RN | No | UNCHECKED |
| threejs (3,245) | nexu-io | nexu-io/open-design | RN | No | UNCHECKED |
| **threejs-3d-generator (3,067)** | majidmanzarpour | majidmanzarpour/threejs-game-skills | **AG (Tripo)** | **Yes — TRIPO_API_KEY** | **SAFE\* (prior) + PASS×3 (today)** |
| threejs-gameplay-systems (2,918) | majidmanzarpour | same | UI | No | SAFE\* (repo audited; skill itself not) |
| threejs-game-ui-designer (2,891) | majidmanzarpour | same | UI | No | same |
| threejs-aaa-graphics-builder (2,823) | majidmanzarpour | same | RN | No | same |
| threejs-game-director (2,706) | majidmanzarpour | same | UI/TOOL | No | same |
| threejs-debug-profiler (2,696) | majidmanzarpour | same | TOOL | No | same |
| threejs-qa-release (2,657) | majidmanzarpour | same | TOOL | No | same |
| threejs-audio-generator (2,575) | majidmanzarpour | same | AG (audio) | Yes — ELEVENLABS_API_KEY (inferred from README) | same |
| threejs-image-generator (2,543) | majidmanzarpour | same | AG (image) | Yes — GEMINI_API_KEY (inferred from README) | same |
| **img2threejs (1,982)** | img2threejs | img2threejs/img2threejs | **AG (code-only image→3D)** | **No** (procedural code by agent) | ORG + **Gen PASS / Socket WARN / Snyk PASS**, Apache-2.0, 18.1k★ |
| threejs (1,755) | mengto | mengto/skills | RN | No | UNCHECKED |
| three-best-practices (1,310) | emalorenzo | emalorenzo/three-agent-skills | RN | No | UNCHECKED |
| webgpu-threejs-tsl (1,278) | dgreenheck | dgreenheck/webgpu-claude-skill | RN/TSL | No | UNCHECKED |
| build-threejs-scroll-worlds (1,234) | mengto | mengto/skills | UI | No | UNCHECKED |
| threejs (1,224) | mrgoonie | mrgoonie/claudekit-skills | RN | No | UNCHECKED |
| optimize-threejs-games (1,120) | mengto | mengto/skills | TOOL | No | UNCHECKED |
| build-mobile-threejs-games (1,103) | mengto | mengto/skills | UI | No | UNCHECKED |
| build-threejs-enemy-systems (1,090) | mengto | mengto/skills | UI | No | UNCHECKED |
| threejs-game (1,029) | playableintelligence | playableintelligence/game-creator | UI | No | UNCHECKED |
| threejs-landscape (1,010) | mengto | mengto/skills | UI/scene | No | UNCHECKED |
| threejs-r3f (1,003) | athevon | athevon/genjutsu | R3F | No | UNCHECKED |
| threejs-weather (998) / threejs-towers (992) | mengto | mengto/skills | UI | No | UNCHECKED |
| threejs-animation (984) | iart-ai | iart-ai/webgl-animation-skills | RN | No | UNCHECKED |
| three-js (782) | mindrally | mindrally/skills | RN | No | UNCHECKED |
| threejs-skills (750) | sickn33 | sickn33/agentic-awesome-skills | RN | No | UNCHECKED |
| **threejs-earth-render (607)** | vibe-motion | vibe-motion/skills | RN | No | UNCHECKED |
| threejs-perf (589) | playableintelligence | playableintelligence/game-creator | TOOL | No | UNCHECKED |
| mint-threejs-skills (572) | mintdotgg | mintdotgg/mint-threejs-skills | RN | No | UNCHECKED |
| **threejs-world-generation (466)** | calesthio | calesthio/openmontage | **AG/world (routes to repo tools)** | via tools (Atlas/fal/Blender) | SAFE\* repo (prior) + PASS×3 on sibling skill |
| threejs-3d-graphics (451) | omer-metin | omer-metin/skills-for-antigravity | RN | No | UNCHECKED |
| threejs (435) | secondsky | secondsky/claude-skills | RN | No | UNCHECKED |
| threejs-game (406) | natea | natea/fitfinder | UI | No | UNCHECKED |

### 1c. Collections with many threejs skills (one repo, uniform provenance = UNCHECKED unless noted)

| Repo (publisher) | # skills | Skills (installs) | Focus | Key? | Provenance flag |
|---|---|---|---|---|---|
| full-stack-skills/threejs-skills (full-stack-skills) | 18 | threejs-materials 325, renderers 324, animation 322, lights 319, camera 318, postprocessing 314, geometries 314, scenes 313, loaders 311, objects 310, textures 309, controls 309, dev-setup 306, helpers 298, math 297, node-tsl 296, webxr 291, audio 288 | RN/LD (complete threejs doc set, low traction) | No | UNCHECKED (near-duplicate catalog pattern — same shape as cloudai-x's repo) |
| cesartevisual/threejs-skills (cesartevisual) | 14 | threejs-r3f 204, web 201, performance 199, animation 180, shaders 174, **assets 171**, debugging 168, testing 167, accessibility 165, lighting 164, materials 163, scene 162, postprocessing 161, interaction 161 | RN/R3F | No | UNCHECKED |
| majidmanzarpour forks of threejs-game-skills | 5 repos | raptoravis 20, chrislaupama 5, awinfieldc 5, leanentropy/threejs-phaser 2, imanlangaran 1 (all `threejs-3d-generator`) | AG (Tripo) | Yes | UNCHECKED **fork copies** — install from the original only |
| mengto/skills (3js-related extras) | +3 | threejs-landscape 1010, weather 998, towers 992 (see 1b for rest) | UI | No | UNCHECKED |

### 1d. Long tail (threejs-named, < ~400 installs — completeness list)

threejs-tresjs/martinholovsky 249 · improve-threejs/millionco 296 · threejs-pro/404kidwiz 180 · three-js/noklip-io 161 · threejs/duonglx 9 · threejs-ops/0xdarkmatter 14 · threejs-compositions/editframe 81 · threejs-scene-builder/jarrodmedrano 78, smithery.ai 45, prompt-or-die-labs 13, dexploarer 8 · threejs-particle-canvas/tdimino 12 · threejs/threejs 20 binhmuc · threejs/the1studio 15 · threejs-webgl/emmraan 15, avabillions2040 fork 20 · threejs-animation/toilahuongg 9, zenolab-gif 7 · threejs-loaders/toilahuongg 7, zenolab-gif 6 · threejs/kyh-vibedgames 7 · threejs/hainamchung 7 · threejs/softwareinfocus 8 · threejs/ckthreejs & threejs/binjuhor-shadcn-lar 37/34 · threejs/a... (autobot-review 20) · threejs-product-skills/3d-asset-optimization 1 · threejs-template/game-3d-asset-pipeline 2 · **openai/plugins**: web-3d-asset-pipeline 50, three-webgl-game 42, threejs-data-visualization 14 (official OpenAI org, 7.4k★, no repo license field) · r3f-skills/enzed (r3f-loaders 1,624, r3f-animation 1,810, r3f-interaction 3,023 — R3F, adjacent) · heygen-com/hyperframes/three (69,318 — HeyGen's internal three skill, not a general catalog entry).

**Excluded as fuzzy false-positives:** playwright/browser/map/sales skills that matched only because "three" appears in scores/strings (e.g. `langsmith-evaluator`, `mbfinotti/*`), Nvidia TAO/Omniverse 3D-training skills (not Three.js), Unity/PixiJS/Babylon skills.

---

## 2. Everything published by cloudai-x

### 2a. On skills.sh (search `q=cloudai-x`, count=55 incl. mirrors → ~47 unique skills across 5 repos)

| Repo | # skills | Skill names (installs) | Focus |
|---|---|---|---|
| **cloudai-x/threejs-skills** | 10 | animation 17.6k, fundamentals 14.6k, shaders 13.1k, geometry 12.2k, materials 12.1k, interaction 11.9k, postprocessing 11.3k, lighting 11.0k, loaders 10.6k, textures 10.5k (125.5K total installs) | Three.js **docs** (rendering/loaders/shaders) |
| **cloudai-x/world-labs-skills** | 8 | world-labs-pano-video 14, text-prompt 12, studio 12, multi-image 12, export 12, chisel 12, image-prompt 11, api 11 | **3D world generation** (World Labs Marble API) — see §3 |
| **cloudai-x/claude-workflow-v2** | ~14 | analyzing-projects 294, designing-architecture 227, convex-backend 215, optimizing-performance 196, managing-git 191, parallel-execution 190, designing-apis 160, devops-infra 158, web-design-guidelines 157, designing-tests 148, database-design 131, error-handling 126, security-patterns 124, vercel-react-best-practices 155 (`isDuplicate` flag) | generic dev workflow |
| **cloudai-x/opencode-workflow** | ~9 | analyzing-projects 17, designing-architecture 7, optimizing-performance 8, designing-apis 8, managing-git 6, designing-tests 6, parallel-execution 5… | OpenCode port of the same workflow set |
| **cloudai-x/x-algo-skills** | 5 | x-algo-engagement 149, x-algo-ml 12, x-algo-scoring 11, x-algo-pipeline 11, x-algo-filters 11 | X/Twitter algo content |

**Mirror republishers found:** `ui-skills.com` mirrors **all 10** cloudai-x threejs skills under ids like `cloudai-x-threejs-loaders` (3 installs each); `smithery.ai` mirrors `cloudai-x-threejs-shaders`. ⚠️ Mirror entries on skills.sh are third-party re-listings — install from the canonical `cloudai-x/threejs-skills` repo only.

### 2b. On GitHub — full `CloudAI-X` public repo inventory (API, 12 repos)

| Repo | Created → last push | Stars | License | Note |
|---|---|---|---|---|
| threejs-skills | 2026-01-19 → 2026-07-09 | 3,559 | **none** | the audited CAUTION repo (6 commits vs 3.5k★, README clone target 404) |
| world-labs-skills | **2026-01-22 → 2026-01-22 (created & pushed same day, 3 min apart)** | 4 | **none** | markdown-only dump (README + 8×SKILL.md, nothing else) |
| claude-workflow-v2 | 2026-01-01 → 2026-10-06 (active) | 1,419 | MIT | Python; most "legit-looking" of the set |
| opencode-workflow | 2026-01-10 → same day | 276 | MIT | TS |
| x-algo-skills | 2026-01-20 → same day | 13 | none | |
| x-bookmarks-skill-graph | 2026-02-20 → same day | 10 | none | |
| z-ai-playground-v2 | 2026-01-01 → 2026-02-12 | 49 | none | |
| xai-cookbook | 2026-01-06 → same day | 3 | (present) | |
| base-ui-playground / claude-code-resources / restaurant-agent / the-trading-floor-v2 | — | 1/19/0/65 | mixed | non-skill side projects |

### 2c. Provenance verdict for cloudai-x (extends prior audit)

- **Pattern:** multiple repos created Jan–Feb 2026, **pushed within minutes of creation**, no LICENSE, negligible stars — vs `threejs-skills` which has 3.5k★ on 6 commits. This **asymmetric star/commit pattern repeats across the account**, reinforcing the prior audit's "weak provenance / likely re-published content" finding.
- **Payload:** both skill repos checked (`threejs-skills` prior, `world-labs-skills` today) are **100 % markdown, zero executables** → install risk ≈ prompt-injection risk only; content at audited commits was clean.
- **New observation:** `world-labs-api/SKILL.md` frontmatter declares **`allowed-tools: [Bash, WebFetch]`** — a tool-permission escalation the prior threejs skills did *not* have (agents that honor `allowed-tools`, e.g. Claude Code, would grant Bash while this skill is active). Content itself is ordinary World Labs Marble API docs (single endpoint `https://api.worldlabs.ai/marble/v1`, key header `WLT-Api-Key` from `platform.worldlabs.ai`, published credit pricing).
- **skills.sh automated audits:** `threejs-loaders` = Gen Pass / Socket Pass / Snyk Pass today. This is consistent with the prior manual audit (content clean) but does **not** address the provenance weaknesses (no LICENSE, 404 README target, account pattern).
- **Net:** keep the **CAUTION** rating for all cloudai-x skills. Content-safe today; publisher untrusted for the future (skills are re-fetched on `skills update`).

---

## 3. 3D-asset-creation / generation skills — ranked candidates

Ranked by (provenance strength × standalone functionality × documentation). "How" = mechanism.

| # | Skill (installs) | Command (`npx skills add …`) | How it generates | Key / cost | Provenance & safety |
|---|---|---|---|---|---|
| **1** | **threejs-3d-generator (3,067)** — majidmanzarpour | `https://github.com/majidmanzarpour/threejs-game-skills --skill threejs-3d-generator` | Python helper → **Tripo API** (`api.tripo3d.ai`, only URL in 72 KB script); text/image→GLB, rigging, conversion | **TRIPO_API_KEY** (paid credits; script spends them) | **SAFE\* (prior full audit) + PASS×3 today.** MIT, 2.5k★, account since 2015, honest README. Best-documented option. |
| **2** | **meshy-3d-generation (2,056)** + meshy-3d-printing (1,445), meshy-3d-agent (908) — meshy-dev | `https://github.com/meshy-dev/meshy-3d-agent --skill meshy-3d-generation` | **Meshy CLI 0.4.0** (text/image→3D, texture, rig, animate, convert) — skill folder = SKILL.md + `references/*.md` only; scripts/ & tests/ at repo root are NOT installed | Meshy account/credits (paid tier) | **ORG (official Meshy) + MIT + PASS×3.** CI `validate-skills.yml`, test suite, CHANGELOG. Highest institutional trust. |
| **3** | **3d-asset-generation (467)** — calesthio/openmontage | `https://github.com/calesthio/openmontage --skill 3d-asset-generation` | Markdown **routing table**: Kenney CC0 catalog / `atlas_3d` (tripo-h3.1) / `fal_3d` (Hunyuan 3D v3.1, SAM 3D Objects) / Blender 4.5 — but those tools live in OpenMontage's `tools/`, **not in the skill install** | Keys live in the parent repo's tools | **SAFE\* (prior: 2 files, pure markdown, zero URLs) + PASS×3 today.** Non-functional standalone (caveat, not security). AGPL on repo. |
| **4** | **img2threejs (1,982)** — img2threejs | `https://github.com/img2threejs/img2threejs --skill img2threejs` | **Code-only** procedural reconstruction of a reference image into a Three.js model via agent-written TS + vision self-correction loop ("not photogrammetry, not downloaded art") | **None** (needs a vision-capable agent/browser tool) | **Gen PASS / Socket WARN / Snyk PASS**, Apache-2.0, 18.1k★/1.5k forks, homepage img2threejs.io. ⚠️ Socket "Warn" worth a look before install; repo grew 0→18k★ in ~3 months. |
| **5** | **layer-3d (2,435)** — layerai | `https://github.com/layerai/skills --skill layer-3d` | Layer API chain: text_to_3d / image_to_3d → remesh → retexture → rig → animate (one run per stage, `file_id` handoff) | Layer API key (paid) | **ORG (Layer, "AI game asset creation") + MIT + PASS×3.** Small repo (5★, created 2026-04) but official and clean. |
| **6** | **3d-model-generation (1,197)** — eachlabs | `https://github.com/eachlabs/skills --skill 3d-model-generation` | `each::sense` text/image→3D incl. characters, PBR textures | EACHLABS API key (paid) | **ORG (EachLabs) + PASS×3**, but repo **no LICENSE**, 39★, JS code present. |
| **7** | **fal-3d (110)** — fal-ai-community (also `nexu-io/open-design/fal-3d` 2,681 — copy, UNCHECKED) | `https://github.com/fal-ai-community/skills --skill fal-3d` | **Ships `scripts/generate-3d.sh`** → fal.ai models (e.g. `fal-ai/hunyuan3d-v3/image-to-3d`) | **FAL_KEY** (paid per-call) | **ORG-adjacent (fal community) + PASS×3**, 251★, **repo has NO LICENSE**, ⚠️ executable payload (bash) → read `generate-3d.sh` before first run. |
| **8** | image-to-3d-asset (5) — Runware | `https://github.com/Runware/runware-skills --skill image-to-3d-asset` | Runware image→3D API | RUNWARE_API_KEY | **ORG (Runware official)** but 4★, **no license**, markdown-only (language null), **content unchecked**, near-zero adoption. |
| **9** | **world-labs-\* (8 skills, ~11–14 each)** — cloudai-x | `https://github.com/cloudai-x/world-labs-skills --skill world-labs-api` | World Labs **Marble** `api.worldlabs.ai` text/image/pano/video→3D world (mesh+gaussian splats); curl/Python examples in SKILL.md | **`WLT-Api-Key`** from platform.worldlabs.ai (paid credits, $1=1,250 cr) | **CAUTION** — §2c: same-day repo dump, no LICENSE, `allowed-tools: Bash+WebFetch`. Content plausible but provenance weakest of all candidates. |
| **10** | web-3d-asset-pipeline (50) — openai/plugins | `https://github.com/openai/plugins --skill web-3d-asset-pipeline` | unknown (content not fetched) | unknown | **ORG (official OpenAI, 7.4k★, active)** but repo license field null; **content unchecked**. |
| — | *also seen, unchecked:* `scenario-labs/skills` (scenario-3d 373, scenario-rodin 296, scenario-meshy 304 — Rodin/Meshy/Scenario APIs), `atlascloudai/atlas-cloud-skills` (703), `modelslab-3d-generation` (89), `calesthio/generative-media-skills` (tripo-3d 97, meshy-3d 90, 3d-asset-production 96 — MIT, 202★), `majidmanzarpour/blender-game-skills/blender-image-to-3d` (213), `tencentcloud … hy-3d-generation` (3), `pixazo-ai/skills` (tripo3d/trellis3d/meshy…), `eachlabs`/`openclaw`/`skills.volces.com` clones of `3d-model-generation` | various | mostly API wrappers | keys vary | **UNCHECKED** — plausible but not inspected |

**Recommendation:** For 3D **asset generation** pick **#2 meshy-3d-generation** (official vendor, MIT, markdown-only install, tests+CI) or **#1 threejs-3d-generator** (already fully audited SAFE, richest docs — but its Python script spends Tripo credits). Use **#3/#4** when you want zero-key or zero-executable options. **Avoid installing anything from cloudai-x for asset generation** — its only AG offering (#9) has the weakest provenance of the set; official World Labs docs would be a better source for Marble API guidance.

---

## 4. Gaps / uncertainties

1. **100-result cap per query** — `threejs`, `3d`, `3d-asset` etc. each returned exactly `count: 100`; deeper-tail skills beyond rank 100 per query were not enumerable. Overlap across 10 queries mitigates but does not eliminate this.
2. **Search API has no pagination parameter discovered** (no `page`/`offset` observed) — long-tail completeness is best-effort.
3. **Descriptions** only read for 8 skills (skill-page SKILL.md excerpts); focus classifications for UNCHECKED rows are inferred from names/repos.
4. **Per-skill security badges** fetched only for: threejs-loaders, meshy-3d-generation, fal-3d, eachlabs 3d-model-generation, layer-3d, openmontage 3d-asset-generation, threejs-3d-generator, img2threejs. Others' Gen/Socket/Snyk status = not fetched (badges exist at `/<owner>/<repo>/<skill>/security/<provider>`).
5. **Payload-type (scripts vs markdown)** verified via git tree for: cloudai-x/world-labs-skills (md only), meshy-3d-agent (skill dirs = md only; repo has build/test scripts outside install scope), cloudai-x/threejs-skills (prior audit: md only). fal-3d's `generate-3d.sh` and eachlabs/layer payloads **not tree-checked** — flagged accordingly.
6. **Star counts unverifiable as organic** — especially img2threejs (18k★ in 3 months) and the cloudai-x star/commit asymmetry; treated as weak signals only.
7. **skills.sh automated audits** (Gen/Socket/Snyk) are scanners, not proof of safety; all "Pass" ≠ audited content manually. `img2threejs` carries a **Socket "Warn"** I did not drill into.
8. Install counts = anonymous telemetry (skills.sh docs), snapshot 2026-10-14; they move daily.
9. No install/execution performed anywhere; `npx skills add` behavior claims come from prior audit of the CLI's README/package.json.

---

## 5. Sources

- [skills.sh search API (threejs)](https://skills.sh/api/search?q=threejs) — primary catalog enumeration (Algolia JSON, 100-cap).
- [skills.sh search API (3d-asset)](https://skills.sh/api/search?q=3d-asset) — asset-gen candidates.
- [skills.sh search API (3d-generation)](https://skills.sh/api/search?q=3d-generation) — generation candidates.
- [skills.sh search API (gltf)](https://skills.sh/api/search?q=gltf) · [(webgl)](https://skills.sh/api/search?q=webgl) · [(three)](https://skills.sh/api/search?q=three) · [(3d)](https://skills.sh/api/search?q=3d) · [(3d model generation, semantic)](https://skills.sh/api/search?q=3d+model+generation) — remaining queries.
- [skills.sh search API (cloudai-x)](https://skills.sh/api/search?q=cloudai-x) — full cloudai-x skills.sh inventory (55 hits incl. mirrors).
- [skills.sh repo page: cloudai-x/threejs-skills](https://skills.sh/cloudai-x/threejs-skills) — 10 skills, 125.5K installs.
- [skill page: threejs-loaders](https://skills.sh/cloudai-x/threejs-skills/threejs-loaders) — install cmd, SKILL.md excerpt, stars, Gen/Socket/Snyk = Pass/Pass/Pass.
- [skill page: meshy-3d-generation](https://skills.sh/meshy-dev/meshy-3d-agent/meshy-3d-generation) — Meshy CLI 0.4.0 workflow, Pass/Pass/Pass.
- [skill page: fal-3d](https://skills.sh/fal-ai-community/skills/fal-3d) — ships `generate-3d.sh`, Pass/Pass/Pass.
- [skill page: 3d-model-generation](https://skills.sh/eachlabs/skills/3d-model-generation) — each::sense, Pass/Pass/Pass.
- [skill page: layer-3d](https://skills.sh/layerai/skills/layer-3d) — Layer pipeline stages, Pass/Pass/Pass.
- [skill page: 3d-asset-generation](https://skills.sh/calesthio/openmontage/3d-asset-generation) — routing table (Kenney/Atlas/fal/Blender), Pass/Pass/Pass.
- [skill page: threejs-3d-generator](https://skills.sh/majidmanzarpour/threejs-game-skills/threejs-3d-generator) — Tripo, TRIPO_API_KEY hygiene note, Pass/Pass/Pass.
- [skill page: img2threejs](https://skills.sh/img2threejs/img2threejs/img2threejs) — Gen Pass / **Socket Warn** / Snyk Pass, 18.1k★, Apache-2.0.
- [skills.sh docs](https://skills.sh/docs) + [/audits](https://skills.sh/audits) — registry mechanics, audit sources (Gen Agent Trust Hub, Socket, Snyk), top-50 audit list.
- [GitHub API: CloudAI-X/world-labs-skills](https://api.github.com/repos/CloudAI-X/world-labs-skills) + [git tree](https://api.github.com/repos/CloudAI-X/world-labs-skills/git/trees/main?recursive=1) — same-day create/push, 4★, no license, README+8 SKILL.md only.
- [world-labs-api/SKILL.md](https://raw.githubusercontent.com/CloudAI-X/world-labs-skills/main/world-labs-api/SKILL.md) — `allowed-tools: Bash, WebFetch`; Marble API, `WLT-Api-Key`, `api.worldlabs.ai`.
- [GitHub API: CloudAI-X repos](https://api.github.com/users/CloudAI-X/repos) — 12-repo inventory (dates/stars/licenses).
- [GitHub API: meshy-dev/meshy-3d-agent](https://api.github.com/repos/meshy-dev/meshy-3d-agent) + [tree](https://api.github.com/repos/meshy-dev/meshy-3d-agent/git/trees/main?recursive=1) — MIT, official org, skill dirs = md only, CI + tests.
- [GitHub API: fal-ai-community/skills](https://api.github.com/repos/fal-ai-community/skills) — 251★, license null.
- [GitHub API: eachlabs/skills](https://api.github.com/repos/eachlabs/skills) — 39★, license null.
- [GitHub API: layerai/skills](https://api.github.com/repos/layerai/skills) — MIT, official Layer org.
- [GitHub API: calesthio/generative-media-skills](https://api.github.com/repos/calesthio/generative-media-skills) — MIT, 202★.
- [GitHub API: img2threejs/img2threejs](https://api.github.com/repos/img2threejs/img2threejs) — Apache-2.0, 18,071★.
- [GitHub API: Runware/runware-skills](https://api.github.com/repos/runware/runware-skills) — official, 4★, no license, md-only.
- [GitHub API: openai/plugins](https://api.github.com/repos/openai/plugins) — official OpenAI org, 7,431★.
- Local prior audit: `.agents/researcher/skill-security-audit-2026-10-14.md` — SAFE/SAFE/CAUTION verdicts reused as SAFE\*/CAUTION flags.
