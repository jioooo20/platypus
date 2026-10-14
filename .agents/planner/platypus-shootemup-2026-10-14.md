---
plan_id: platypus-shootemup-2026-10-14
status: in_progress
created: 2026-10-14
updated: 2026-10-14
total: 9
completed: 3
---

# Title: Platypus — Game Browser 2.5D Shoot-'em-Up

**Date:** 2026-10-14  
**Priority:** High  
**Status:** Planning

## Objective
Membangun game browser desktop single-player 2.5D shoot-'em-up yang orisinal dan benar-benar dapat dimainkan menggunakan Three.js langsung, TypeScript, Vite, HTML/CSS, Web Audio API, dan backend Node.js/TypeScript Fastify. Seluruh model utama dibuat dan dirender secara prosedural dari kode di proyek, tanpa Blender/aplikasi pemodelan eksternal atau aset model wajib. Selesaikan siklus menu–gelombang–bos–hasil–leaderboard, API leaderboard in-memory, tes, pemeriksaan visual, build, dan dokumentasi; game inti tetap berjalan tanpa backend. Laporan penyerahan akhir wajib berbahasa Indonesia dan membedakan hasil terverifikasi, belum diuji, dan belum selesai.

## Research Summary
N/A — plan dibuat dari `MASTER-PROMPT.md` dan pemeriksaan workspace read-only sesuai instruksi tanpa riset eksternal.

## Fakta workspace dan risiko awal
- Workspace berisi `MASTER-PROMPT.md`, `skills-lock.json`, materi riset Three.js sebelumnya, dan direktori `.agents/skills/`; tidak tampak scaffold aplikasi pada daftar awal. Executor tetap harus memeriksa seluruh workspace/status repositori sebelum mengubah atau menimpa berkas.
- `AGENT.md`, `CLAUDE.md`, dan `.agents/AGENT.md` tidak ditemukan di root/lokasi yang diminta. Ada `CLAUDE.md` di dalam skill img2threejs; jangan anggap sebagai konvensi proyek dan jangan memuat/mengikuti skill itu untuk produksi aset. Jangan memakai tool generator eksternal sebagai dependensi: aset game harus dibuat dengan TypeScript/Three.js.
- OS terdeteksi Windows dan workspace `C:\A_Data\codacode\platypus`. Node/npm, browser, izin menjalankan server, dan tool otomasi belum diverifikasi; implementasi harus memeriksanya dahulu.
- Risiko utama: lingkup visual/gameplay besar; integrasi frontend-backend; lifecycle pembersihan Three.js; leaderboard in-memory sengaja hilang saat proses backend restart; dan pengujian visual/browser bergantung pada tool yang tersedia.

## Tasks

### Task 1: Pemeriksaan lingkungan dan keputusan arsitektur
- **Priority:** High
- **Status:** Completed
- **Evidence:** Windows 11 environment, Node 22/npm 10, Chromium/Playwright available; no Git or project agents; orthographic XY/world Z architecture and npm workspaces established.
- **Dependencies:** None
- **Complexity:** Low
- **Description:** Audit file/status workspace, OS, Node.js/package manager, izin, browser/otomasi, serta kemampuan menjalankan build dan server lokal. Catat apa yang tersedia dan keterbatasannya. Tentukan versi paket kompatibel, arah visual orisinal, orientasi kamera ortografis, batas koordinat X/Y, pemisahan Z visual, struktur modular frontend/backend, konfigurasi skor maksimum, API URL/CORS, dan strategi pengujian. Jangan menimpa artefak yang sudah ada tanpa pemeriksaan.
- **Acceptance Criteria:**
  - [x] Kondisi workspace dan tool aktual tercatat; asumsi yang tidak dapat diverifikasi dinyatakan.
  - [x] Arsitektur memisahkan rendering, gameplay, aset, UI, audio, API client, dan backend.
  - [x] Aturan koordinat, konfigurasi gameplay/score, API URL, dan deployment frontend/backend ditetapkan konsisten dengan prompt.
  - [x] Tidak ada ketergantungan wajib pada Blender, generator/modeling eksternal, layanan berbayar, DB, autentikasi, atau storage eksternal.

### Task 2: Fondasi repo, scripts, scene, dan API liveness
- **Priority:** High
- **Status:** Completed
- **Evidence:** `npm run typecheck`, `npm run build`; Vite localhost returned 200; Fastify `/api/health` returned 200. Vite bundle warns >500 KB.
- **Dependencies:** Task 1
- **Complexity:** Medium
- **Description:** Siapkan monorepo frontend/backend TypeScript, Vite/Three.js, Fastify, Vitest, konfigurasi typecheck/build/test, scripts akar untuk dev frontend+backend dan produksi. Implementasikan scene inicial dengan kamera ortografis, resize, render loop delta-time, pencahayaan dasar, lifecycle dispose, serta backend HTTP com endpoint health; valide inicialização local dos dois lados.
- **Acceptance Criteria:**
  - [x] Dependensi e versões estáveis documentadas; scripts do root executam dev, teste, typecheck e build.
  - [x] Frontend abre uma cena Three.js responsiva e backend responde health via HTTP.
  - [x] TypeScript estrito/consistente, sem `any` não justificado e sem dependências não necessárias.
  - [x] Frontend e backend podem ser desenvolvidos/testados separadamente e integrados por configuração, sem URL localhost fixa em produção.

### Task 3: Núcleo lógico testável e protótipo jogável
- **Priority:** High
- **Status:** Pending
- **Dependencies:** Task 2
- **Complexity:** High
- **Description:** Implementar estados do jogo e lógica desacoplada do render: input WASD/setas e espaço, movimento com limites, shooting, entidades, padrões distintos de movimento, projéteis, colisões no plano gameplay, saúde/vidas e pontuação. Usar delta-time, evitar scroll das teclas e pausar/resumir em Esc e perda de foco. Construir protótipo com feedback visual simples antes da produção artística.
- **Acceptance Criteria:**
  - [ ] Jogador move, atira e respeita os limites; controles funcionam sem rolagem da página.
  - [ ] Inimigos/projéteis interagem por colisão coerente com X/Y, não afetada acidentalmente pela profundidade Z.
  - [ ] Saúde, pontuação, pausa, retomada e transições de estado funcionam.
  - [ ] Testes Vitest cobrem limites de movimento, colisão, saúde, score e estados básicos.
  - [ ] Um ciclo mínimo é jogável no browser antes do polimento final.

### Task 4: Kit de modelos e efeitos Three.js procedurais
- **Priority:** High
- **Status:** In progress
- **Evidence:** Factories render in Chromium canvas; screenshot pixel sample ~52%. No measured scorecard/gameplay visual inspection yet.
- **Dependencies:** Task 3
- **Complexity:** High
- **Description:** Definir guia de arte e criar módulos TypeScript independentes para modelo de jogador, três inimigos de silhuetas/proporções/cores/animações diferentes, chefe visualmente mais complexo e animável, projéteis, explosões/impactos/flash/respawn, propulsor e camadas ambientais parallax. Usar geometrias customizadas e técnicas Three.js (Shape/Extrude, BufferGeometry, geometrias auxiliares, Groups, materiais e luzes); implementar opções de variação e descarte de recursos. Integrar no gameplay e iterar visualmente em escala real.
- **Acceptance Criteria:**
  - [ ] Todos os modelos principais são produzidos por código TypeScript/Three.js executável no projeto; nenhum GLB ou export externo é pré-requisito.
  - [ ] Caça do jogador tem corpo, asas, cockpit, motores, painéis, emissivos e animação de propulsão.
  - [ ] Três tipos de inimigo têm silhuetas, animação, pontos de tiro e hitboxes distintos; não são apenas recolorações.
  - [ ] Chefe possui silhueta grande, módulos/armas visíveis, animação idle e feedback visual ao atacar/sofrer dano.
  - [ ] Projéteis, explosão, impacto, tiros, spawn e ambiente procedural estão integrados e legíveis.
  - [ ] Modelos foram visualmente inspecionados pelo browser quando possível; anotar indisponibilidade e revisar problemas de escala, orientação, material, legibilidade e performance.
  - [ ] Recursos temporários (geometrias, materiais, texturas e objetos) são liberados adequadamente.

### Task 5: Sessão completa, ondas, chefe, efeitos e áudio
- **Priority:** High
- **Status:** Pending
- **Dependencies:** Tasks 3, 4
- **Complexity:** High
- **Description:** Implementar sistema parametrizado de ondas, formações/velocidades/padrões e ataques variados, escalada de dificuldade, combate do chefe com barra de vida, condições de vitória/derrota, retomada e reinício sem reload. Integrar SFX via Web Audio ou opção browser apropriada e efeitos visuais para eventos importantes; manter o feedback claro sem obstruir o jogo.
- **Acceptance Criteria:**
  - [ ] Sessão completa progride do início por várias ondas até chefe e termina em vitória ou derrota.
  - [ ] Inimigos variam movimento e ataque; configuração centraliza HP, cadência, delays, limites de score e parâmetros de dificuldade.
  - [ ] Pausar/retomar, vitória/derrota e replay funcionam sem recarregar a página nem deixar estado/resíduos da sessão anterior.
  - [ ] Áudio é controlável/mutável e eventos de jogo têm feedback audiovisual apropriado.
  - [ ] Testes cobrem aparecimento/progresso das ondas e resultados de vitória/derrota.

### Task 6: UI completa e leaderboard HTTP in-memory
- **Priority:** High
- **Status:** In progress
- **Evidence:** API injection suite and loopback GET/POST/rejection smoke pass; browser menu/HUD/pause smoke pass. UI score submit/leaderboard/error/retry not browser-driven; sound UI toggle missing.
- **Dependencies:** Tasks 2, 5
- **Complexity:** High
- **Description:** Implementar menu em Bahasa Indonesia, controles/instruções, som, leaderboard, HUD (score, vidas/saúde, onda, chefe, pausa) e tela de resultado com nome, score, envio, retry, status e replay. Construir Fastify `GET /api/leaderboard` e `POST /api/leaderboard` com validação server-side, ordenação determinística, limite de resultados, score máximo alinhado ao jogo e somente nome+score em memória de processo. Integrar API; falha do serviço não bloqueia gameplay, envio repetido acidental é evitado e erro permite retry sem afirmar sucesso antes da confirmação.
- **Acceptance Criteria:**
  - [ ] Todas as ações exibidas funcionam; UI é legível, responsiva a resize e em Bahasa Indonesia.
  - [ ] GET inicial retorna lista vazia, resultados ordenados descendentemente com desempate estável e limite (até 100).
  - [ ] POST aceita dados válidos e rejeita nome vazio/só espaço, >20 caracteres, controles indevidos e scores inválidos/negativos/não finitos/acima do máximo, com status/mensagem adequados.
  - [ ] Cada entrada contém apenas nome e score; armazenamento dura durante o processo, sobrevive a reload do frontend e é zerado após reiniciar o backend.
  - [ ] Frontend mostra loading/sucesso/erro, evita dupla submissão, permite retry e continua jogável sem backend.
  - [ ] URL do API e CORS são configuráveis para ambientes diferentes; nenhuma afirmação de proteção anti-cheat é feita.

### Task 7: Testes unitários, integração HTTP, browser e visual
- **Priority:** High
- **Status:** In progress
- **Evidence:** Final `npm test` 11/11, `npm run typecheck`, `npm run build`; Playwright title/pause/resume/mobile-overflow smoke and live health/GET/POST/400 pass. No full bot playthrough or visual scorecard.
- **Dependencies:** Tasks 3, 4, 5, 6
- **Complexity:** High
- **Description:** Ampliar suíte lógica para colisões, saúde, score, limites, transições, waves, vitória/derrota e client validation. Testar API com server real: vazio, POST válido, GET persistido, ordenação, entradas inválidas, limite e restart/reset. Fazer playtest browser automatizado se disponível, cobrindo fluxo de menu a leaderboard, reload e indisponibilidade do backend. Verificar console, requests, câmera, formas, UI, memória de recursos e performance sem alegar FPS sem medição.
- **Acceptance Criteria:**
  - [x] Testes unitários, typecheck e build de produção são executados e resultados registrados; falhas são corrigidas ou explicitamente anotadas.
  - [ ] Teste de integração HTTP confirma GET/POST/ordenação/validação e reinício real do processo limpando o leaderboard; testes fecham recursos e não deixam servidor órfão.
  - [ ] Playtest confirma início, movimento, tiro, inimigos/score, pausa, fim da sessão, envio/listagem de score e backend desligado, se browser/automação disponíveis.
  - [ ] Se automação não está disponível, documentar testes manuais e lacuna, sem marcar browser test como sucesso.
  - [ ] Inspeção verifica legibilidade de gameplay, renderização/modelos, mensagens de rede, console, resize, delta-time e limpeza de recursos.

### Task 8: Documentação, execução e deployment
- **Priority:** Medium
- **Status:** Completed
- **Evidence:** `README.md` documents scripts, architecture, procedural assets, API validation, environment/CORS and split static/Node deployment; QA gaps are explicit.
- **Dependencies:** Tasks 2, 4, 6, 7
- **Complexity:** Medium
- **Description:** Escrever README em Bahasa Indonesia com requisitos, instalação, scripts, arquitetura, modelos/efeitos procedurais, controls, configuração, testes, API, CORS, limitações de leaderboard in-memory, execução e deployment separado de frontend estático e backend Node. Explicar que hospedagem estática não executa Fastify; registrar limitações não resolvidas e dependências ambientais.
- **Acceptance Criteria:**
  - [ ] README permite que outro desenvolvedor instale, execute, teste e gere build a partir do root.
  - [ ] Arquitetura e localização de código de assets/gameplay/API são descritas; endpoints e validações documentados.
  - [ ] Instruções distinguem deploy frontend estático de hospedagem backend Node e indicam configuração de API/CORS.
  - [ ] Limitações reais e pré-requisitos verificados são declarados; nenhuma alegação de deployment externo não autorizado.

### Task 9: Verificação final e relatório de entrega em Bahasa Indonesia
- **Priority:** High
- **Status:** In progress
- **Evidence:** Final tests/typecheck/build and category-level gap analysis recorded in `.agents/executor/platypus-shootemup-2026-10-14.md`; full completion is withheld because gameplay and visual QA acceptance gaps remain.
- **Dependencies:** Tasks 1–8
- **Complexity:** Medium
- **Description:** Rodar os scripts finais de teste/typecheck/build e verificações disponíveis; comparar cada critério de conclusão do `MASTER-PROMPT.md` com evidências concretas. Entregar relatório final em Bahasa Indonesia com resumo, arquitetura, assets, comandos, resultados por teste, lacunas, limitações, instruções de deployment e paths importantes. Classificar cada item como comprovado, não testado ou incompleto; não declarar conclusão plena se houver requisito obrigatório pendente.
- **Acceptance Criteria:**
  - [ ] Evidências de comandos/resultados finais são registradas sem fabricar resultados.
  - [ ] Todas as categorias de saída obrigatórias do item 16 em `MASTER-PROMPT.md` são cobertas.
  - [ ] Critérios A–D do item 14 são revisados, e cada não atendido possui justificativa clara.
  - [ ] Relatório está em Bahasa Indonesia e separa explicitamente “Berhasil diverifikasi”, “Belum diuji” e “Belum selesai”.

## Dependências e sequência sugerida
1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9, com UI/backend (Task 6) iniciando quando a base (Task 2) estiver pronta, e asset production (Task 4) em paralelo ao polimento de gameplay após Task 3 se o executor puder manter integração por interfaces. Testes da lógica devem acompanhar cada fase; Task 7 é a verificação integrada final.

## Riscos e mitigação
- **Escopo visual alto:** estabilizar protótipo jogável antes do polimento; criar módulos reutilizáveis e avaliar legibilidade na câmera final, sem sacrificar funcionalidade.
- **Ferramentas locais desconhecidas:** medir versões e disponibilidade na fase 1 e adaptar a automação, preservando stack exigida.
- **Complexidade de integração:** manter contratos de entidades, estados e API explícitos; separar pure logic de render.
- **Leaderboard não persistente por desenho:** deixar a semântica de reset explícita na UI/documentação e testar restart, sem adicionar DB.
- **Cheating de score client-side:** validar robustamente payloads e limites, mas declarar que o score enviado pelo browser pode ser manipulado.
- **Limitações de browser/visual automation:** usar inspeção manual e testes HTTP quando necessário, descrevendo exatamente o que não foi verificado.
