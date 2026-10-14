# Execution: Install 10 Keyless Three.js Skills

**Date:** 2026-10-14
**Source:** Direct Order (plan = §4 of `.agents/researcher/threejs-keyless-skills-2026-10-14.md`)
**AGENT.md / CLAUDE.md / .agents/AGENT.md / opencode.jsonc:** Not Found (checked first; proceeded with defaults)
**Platform:** Windows (win32), PowerShell 5.1, working dir `C:\A_Data\codacode\platypus` (not a git repo)

## 1. CLI discovery

| Item | Value |
|---|---|
| Package | npm `skills` (vercel-labs/skills) |
| Version used for installs | **1.7.2** (registry latest; npx had **1.5.18** cached — forced latest via `npx -y skills@latest`) |
| Engine note | skills@1.7.2 declares `node >=22.20.0`; host node is v22.17.1 → npm prints `EBADENGINE` warning only; CLI ran fine (all 10 installs completed) |
| `--version` output | `1.7.2` |
| Discovery commands | `npx -y skills --help`, `npx -y skills add --help` (errors without a source arg), `npx -y skills add <repo> --list` |

**Flags identified & used:**

| Purpose | Flag | Value used |
|---|---|---|
| Non-interactive confirm | `-y` (`--yes`) | always passed (plus `-y` on `npx` itself to auto-confirm package fetch) |
| Agent target | `-a` (`--agent <agents>`) | **`opencode`** — listed and accepted (CLI renders it as "OpenCode") |
| Scope | default = **project** (`-g` = global, NOT used) | project scope → `./.agents/skills/` |
| Skill selection | `-s`/`--skill <name>` | one explicit skill per command (never `--all`/`*`) |
| Symlink vs copy | `--copy` | **Not needed** — see §2 |
| Telemetry | env | `$env:DISABLE_TELEMETRY="1"` set before every command |

Pre-install sanity: `npx -y skills@latest add <repo> --list` on repo A confirmed all 9 skills exist (6 keyless targets present; the 3 keyed generator skills listed but deliberately NOT selected).

## 2. Install mode: COPY (not symlink)

The CLI's default is symlinking, but on this host it **automatically fell back to copy** on every install (summary line reads `copy → OpenCode`, result `(copied)`). No symlink errors occurred, so the documented `--copy` retry was never needed. Post-install check: **zero `LinkType` entries** under `./.agents/skills/` — all 10 are real directory copies. No admin/Developer Mode required.

## 3. Install table (10/10)

Command template used for every row (only `--skill` and repo change):

```
$env:DISABLE_TELEMETRY="1"; npx -y skills@latest add <repo> --skill <name> -a opencode -y
```

| # | Skill | Repo (source) | Command outcome | Final on-disk path | SKILL.md exists |
|---|---|---|---|---|---|
| 1 | threejs-game-director | majidmanzarpour/threejs-game-skills | ✓ success (`Installed 1 skill`, copied) | `.\.agents\skills\threejs-game-director\` | yes |
| 2 | threejs-gameplay-systems | majidmanzarpour/threejs-game-skills | ✓ success (copied) | `.\.agents\skills\threejs-gameplay-systems\` | yes |
| 3 | threejs-aaa-graphics-builder | majidmanzarpour/threejs-game-skills | ✓ success (copied) | `.\.agents\skills\threejs-aaa-graphics-builder\` | yes |
| 4 | threejs-game-ui-designer | majidmanzarpour/threejs-game-skills | ✓ success (copied) | `.\.agents\skills\threejs-game-ui-designer\` | yes |
| 5 | threejs-debug-profiler | majidmanzarpour/threejs-game-skills | ✓ success (copied) | `.\.agents\skills\threejs-debug-profiler\` | yes |
| 6 | threejs-qa-release | majidmanzarpour/threejs-game-skills | ✓ success (copied) | `.\.agents\skills\threejs-qa-release\` | yes |
| 7 | img2threejs | img2threejs/img2threejs | ✓ success (copied) | `.\.agents\skills\img2threejs\` | yes |
| 8 | threejs-scene-setup | gamedev-skills/awesome-gamedev-agent-skills | ✓ success (copied) | `.\.agents\skills\threejs-scene-setup\` | yes |
| 9 | threejs-materials-lighting | gamedev-skills/awesome-gamedev-agent-skills | ✓ success (copied) | `.\.agents\skills\threejs-materials-lighting\` | yes |
| 10 | threejs-gltf-loading | gamedev-skills/awesome-gamedev-agent-skills | ✓ success (copied) | `.\.agents\skills\threejs-gltf-loading\` | yes |

**Failures/retries: none.** All 10 succeeded on first attempt; no `--copy` retries required.

## 4. Verification

- **Destination root:** `C:\A_Data\codacode\platypus\.agents\skills\` (project scope, agent target OpenCode)
- Folder enumeration: exactly **10** skill directories, no extras.
- `SKILL.md` present in every folder: **10/10 ✓**
- `npx skills@latest ls` (CLI's own view) lists all 10 project skills; each shows `Agents: Antigravity CLI, Gemini CLI, GitHub Copilot, OpenCode` (the `.agents/skills/` location is read by multiple agents — OpenCode is the intended target) and `Source:` = one of the 3 canonical repos.
- `skills-lock.json` (created by the CLI) lists exactly the same 10 skills with GitHub sources + content hashes:
  - majidmanzarpour/threejs-game-skills → 6
  - img2threejs/img2threejs → 1
  - gamedev-skills/awesome-gamedev-agent-skills → 3
- **Exclusion check PASSED:** no `threejs-3d-generator`, `threejs-audio-generator`, `threejs-image-generator` (keyed), no cloudai-x, no nexu-io, no fork/mirror sources anywhere on disk or in the lockfile.
- **Stray artifacts check:** root contained only `.agents/` before; after installs it contains `.agents/` + `skills-lock.json`. `skills-lock.json` is the CLI's own project-scope provenance lockfile (legitimate CLI write, kept intentionally — it pins hashes for `skills update` / re-audit). No other files outside `.agents/skills/` were created; nothing written outside the workspace.

## 5. Summary

| Metric | Result |
|---|---|
| Pass/fail | **10/10 pass, 0 fail** |
| Agent target | `opencode` (OpenCode) |
| Scope | project (`./.agents/skills/`, no `-g`) |
| Mode | **copy** (CLI auto-fallback on Windows; no symlinks, `--copy` flag not needed) |
| CLI version | skills@1.7.2 (via `npx -y skills@latest`; npx cache had 1.5.18) |
| Telemetry | `DISABLE_TELEMETRY=1` set for every command |
| Keyed/flagged skills installed | none |
