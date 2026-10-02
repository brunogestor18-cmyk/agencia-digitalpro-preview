"use strict";

// Todo o conteúdo abaixo é sintético e permanece no navegador.
let squads = [
  ["Executivo","Diagnóstico, estratégia, decisão e briefing.",["Estratégia","Decisões","Briefings"],"◆"],
  ["Projetos e Operações","Planos, tarefas, prazos, riscos e acompanhamento.",["Planos","Riscos","Prazos"],"✓"],
  ["Marketing e Conteúdo","Pesquisa, campanha, copy, arte e calendário editorial.",["Pesquisa","Copy","Calendário"],"✦"],
  ["Comercial e Clientes","Oferta, diagnóstico, proposta e follow-up em prévia.",["Ofertas","Propostas","Prévia"],"◎"],
  ["Tecnologia e Dados","Código, arquitetura, análise, QA e segurança.",["Código","Dados","QA"],"⌘"],
  ["Conhecimento e Documentos","Leitura, fontes, memória e documentação.",["Fontes","Memória","Documentos"],"▤"]
];
let tasks = [
  ["Resumir links e comparar abordagens","Conhecimento","Relatório com fontes"],
  ["Briefing executivo do projeto","Executivo","Briefing de decisão"],
  ["Pesquisa com fontes e data","Marketing","Relatório datado"],
  ["Converter decisão em plano e tarefas","Projetos","Plano com responsáveis"],
  ["Revisar documento com crítico independente","Conhecimento","Parecer de revisão"],
  ["Preparar proposta comercial em prévia","Comercial","Proposta bloqueada"],
  ["Criar calendário de conteúdo sem publicar","Marketing","Calendário editorial"],
  ["Analisar planilha e sinalizar conflitos","Tecnologia","Análise de conflitos"],
  ["Gerar artefato técnico com testes","Tecnologia","Código testado"],
  ["Organizar conhecimento e registrar decisão","Conhecimento","Decisão registrada"]
];
let approvals = [
  ["Escopo do piloto Atlas","Projetos e Operações","Alto","Confirmar módulo inicial e limite de 20 usuários sintéticos.","Prazo: +5 dias · Custo simulado: R$ 48,00"],
  ["Tom da campanha Aurora","Marketing e Conteúdo","Médio","Opção B: linguagem direta, educativa e sem promessas de resultado.","12 peças em rascunho · Sem publicação"],
  ["Retenção da memória do projeto","Conhecimento e Documentos","Baixo","Reter registros sintéticos por 30 dias e solicitar nova confirmação.","Escopo: Projeto Atlas · Fonte: notas sintéticas"]
];
let memories = [
  ["empresa","Política de ações externas","Toda ação externa exige aprovação específica.","Proposta v0.2","Permanente"],
  ["projeto","Objetivo do Projeto Atlas","Validar briefing diário com equipe interna fictícia.","Briefing sintético · 22/09","30 dias"],
  ["cliente","Preferência do Cliente Horizonte","Receber propostas em formato conciso e comparável.","Entrevista simulada · 20/09","90 dias"],
  ["usuario","Formato de decisão","Mostrar impacto, alternativas e recomendação.","Configuração do protótipo","Até correção"],
  ["projeto","Divergência de receita","Planilha A e relatório B apresentam diferença de 3,2%.","Dados sintéticos · 22/09","7 dias"]
];
let audits = [
  ["22:04","Briefing Hoje consultado","Proprietário","Leitura concluída","ok"],
  ["21:58","Envio de proposta solicitado","Guardião","Ação bloqueada","block"],
  ["18:30","Prévia comercial gerada","Squad Comercial","Artefato criado","ok"],
  ["16:12","Divergência em métricas detectada","Crítico","Revisão solicitada","block"],
  ["09:00","Memória do projeto consultada","Alfa","Fonte registrada","ok"]
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function renderData() {
  $("#squad-grid").innerHTML = squads.map((s, i) => `<article class="squad-card" data-squad="${i + 1}"><span class="icon" aria-hidden="true">${s[3]}</span><p class="eyebrow">SQUAD ${String(i + 1).padStart(2,"0")}</p><h3>${s[0]}</h3><p>${s[1]}</p><ul>${s[2].map(x => `<li>${x}</li>`).join("")}</ul></article>`).join("");
  $("#task-table").innerHTML = tasks.map((t, i) => `<tr data-task="${i + 1}"><td>${String(i + 1).padStart(2,"0")}</td><td><strong>${t[0]}</strong></td><td>${t[1]}</td><td>${t[2]}</td><td><span class="state">${t[3] || "Catalogada"}</span></td></tr>`).join("");
  $("#approval-list").innerHTML = approvals.map((a, i) => `<article class="approval-card" data-approval="${i + 1}"><div class="approval-summary"><span class="tag purple">AGUARDA DECISÃO</span><h3>${a[0]}</h3><p>${a[1]} preparou uma recomendação. Revise a prévia ao lado.</p><div class="approval-meta"><span><b>Risco:</b> ${a[2]}</span><span><b>Dados:</b> Sintéticos</span></div></div><div class="preview"><p class="eyebrow">PRÉVIA · NÃO EXECUTADA</p><h4>${a[3]}</h4><blockquote>${a[4]}</blockquote><div class="blocked-actions"><button type="button" disabled aria-disabled="true">Aprovar e executar</button><button type="button" disabled aria-disabled="true">Rejeitar</button></div><p class="lock-note">🔒 Execução indisponível neste piloto</p></div></article>`).join("");
  renderMemories("todos");
  $("#audit-list").innerHTML = audits.map(a => `<div class="audit-row"><time>${a[0]}</time><strong>${a[1]}</strong><span>${a[2]}</span><span class="audit-result ${a[4]}">${a[3]}</span></div>`).join("");
}
function renderMemories(filter) {
  const rows = filter === "todos" ? memories : memories.filter(m => m[0] === filter);
  $("#memory-list").innerHTML = rows.map(m => `<article class="memory-card" data-scope="${m[0]}"><div><span class="tag">${m[0].toUpperCase()}</span><h3>${m[1]}</h3><p>${m[2]}</p></div><div class="memory-field"><small>Escopo</small><strong>${m[0]}</strong></div><div class="memory-field"><small>Fonte</small><strong>${m[3]}</strong></div><div class="memory-field"><small>Retenção</small><strong>${m[4]}</strong></div></article>`).join("");
}
const viewTitles = { hoje:"Hoje", comando:"Comando", squads:"Squads", tarefas:"Tarefas", aprovacoes:"Aprovações", memoria:"Memória", auditoria:"Auditoria" };
function openView(id) {
  if (!viewTitles[id]) return;
  $$(".view").forEach(v => v.classList.toggle("active", v.id === id));
  $$(".nav-item").forEach(b => { const on = b.dataset.view === id; b.classList.toggle("active", on); on ? b.setAttribute("aria-current","page") : b.removeAttribute("aria-current"); });
  const label = viewTitles[id];
  $("#page-title").textContent = label;
  document.title = `${label} — Alfa`;
  history.replaceState(null, "", `#${id}`);
  closeMenu();
  $("#conteudo").focus({preventScroll:true});
  window.scrollTo({top:0, behavior:"smooth"});
}
function closeMenu(){ $(".sidebar").classList.remove("open"); $("#menu-toggle").setAttribute("aria-expanded","false"); $("#scrim").hidden = true; }
// Respostas derivadas do estado real do piloto. Nenhuma consulta sai da máquina.
function respostaDoPiloto(e, normalized) {
  if (normalized.includes("depende") || normalized.includes("aprova")) {
    const titulos = e.briefing.pendencias_humanas.map(p => p.titulo).join("; ");
    return `${e.resumo.previas} prévias aguardam você: ${titulos}. Nenhuma tem controle de execução disponível.`;
  }
  if (normalized.includes("bloque") || normalized.includes("segurança") || normalized.includes("política")) {
    const motivos = [...new Set(e.briefing.bloqueios.map(b => b.motivo))].join(", ");
    return `${e.briefing.bloqueios.length} pedidos foram interrompidos. Motivos registrados: ${motivos}.`;
  }
  if (normalized.includes("número") || normalized.includes("compare") || normalized.includes("diverg")) {
    const divergencias = e.briefing.divergencias_preservadas;
    if (!divergencias.length) return "Nenhuma divergência de métrica foi preservada nesta rodada.";
    return divergencias.map(d => `${d.titulo}: divergência em ${d.metricas.join(", ")}, sem fonte oficial declarada.`).join(" ");
  }
  if (normalized.includes("plano") || normalized.includes("decisão") || normalized.includes("memória")) {
    if (!e.memorias.length) return "Nenhum candidato de memória foi criado; os portões de governança bloquearam os registros incompletos.";
    return e.memorias.map(m => `${m.titulo}: candidato em ${m.projeto}, retenção de ${m.retencao_dias} dias, estado ${m.estado}.`).join(" ");
  }
  if (normalized.includes("link") || normalized.includes("pesquisa") || normalized.includes("campanha")) {
    return `Neste piloto não acesso a rede. ${e.resumo.concluidas} pesquisas foram concluídas com fontes sintéticas datadas e ${e.resumo.eventos_auditados} eventos auditados.`;
  }
  return `Piloto em modo ${e.piloto.modo.replace("_", " ")}: ${e.resumo.casos} pedidos processados, ${e.resumo.conformes} no estado esperado e nenhum efeito externo.`;
}
function simulateCommand(text) {
  const normalized = text.toLocaleLowerCase("pt-BR");
  let answer = "Posso transformar isso em um plano local, mas nenhuma ação será executada nesta fase.";
  if (estado) answer = respostaDoPiloto(estado, normalized);
  else if (normalized.includes("depende") || normalized.includes("aprova")) answer = "Há 3 decisões aguardando: escopo do Atlas, tom da campanha Aurora e retenção de memória. Todas seguem bloqueadas para execução.";
  else if (normalized.includes("plano") || normalized.includes("decisão")) answer = "Plano simulado: 1) confirmar objetivo; 2) decompor em tarefas; 3) atribuir responsáveis; 4) registrar critérios; 5) solicitar aprovação.";
  else if (normalized.includes("número") || normalized.includes("compare")) answer = "Comparação simulada: há divergência de 3,2% entre duas fontes. Recomendo validar período e critério antes de decidir.";
  else if (normalized.includes("link") || normalized.includes("pesquisa")) answer = "Na Fase A não acesso links nem a rede. Posso demonstrar o formato de um relatório com fontes sintéticas.";
  const wrap = $("#conversation");
  wrap.insertAdjacentHTML("beforeend", `<div class="message user"><span>DP</span><div><strong>Você</strong><p></p></div></div><div class="message alfa"><span>A</span><div><strong>Alfa · simulação</strong><p></p></div></div>`);
  const messages = $$(".message p", wrap); messages[messages.length - 2].textContent = text; messages[messages.length - 1].textContent = answer;
  wrap.scrollTop = wrap.scrollHeight;
}

// Fase C: se estado.js estiver presente, o cockpit passa a exibir o resultado real
// do motor da Fase B. Sem ele, o conteúdo sintético da Fase A permanece.
const estado = typeof window !== "undefined" ? window.__ESTADO_PILOTO__ : null;
function horaCurta(iso) { return new Date(iso).toLocaleTimeString("pt-BR", {hour:"2-digit", minute:"2-digit"}); }
function iniciais(nome) { return nome.split(" ").filter(p => p.length > 2).slice(0, 2).map(p => p[0]).join("") || nome[0]; }
// Centro de comando: núcleo no meio, especialistas em volta e as passagens de
// trabalho que realmente aconteceram. Quem não atuou aparece apagado — nenhum
// selo "online" decorativo, porque especialista aqui não fica ligado esperando.
function renderCentroDeComando(e) {
  const agentes = e.sala_de_reuniao;
  const ativos = agentes.filter(a => a.presente).length;
  $("#centro-selo").textContent = `${ativos} de ${agentes.length} atuaram nesta rodada`;
  $("#centro-nucleo-valor").textContent = e.resumo.eventos_auditados;
  $("#centro-nucleo-rotulo").textContent = "eventos auditados";

  const cartao = a => {
    const classes = ["no", a.presente ? "ativo" : "ausente", a.transversal ? "transversal" : ""].filter(Boolean).join(" ");
    const marca = a.bloqueios ? `<span class="no-bloqueios">${a.bloqueios} bloqueios</span>` : "";
    return `<article class="${classes}" data-agente="${a.nome}" title="${a.descricao}">
      <span class="no-avatar">${iniciais(a.nome)}</span>
      <div class="no-texto"><strong>${a.nome}</strong><small>${a.papel}</small>
      <span class="no-estado">${a.presente ? `${a.participacoes} ações` : "fora da rodada"}</span>${marca}</div>
    </article>`;
  };

  // Moldura em vez de círculo: posição determinística, sem sobreposição possível.
  // Os três transversais ficam no topo, por atravessarem todo fluxo.
  const transversais = agentes.filter(a => a.transversal);
  const squads = agentes.filter(a => !a.transversal);
  const areas = {
    "#centro-topo": transversais.slice(0, 3),
    "#centro-esq": squads.slice(0, 2),
    "#centro-dir": squads.slice(2, 4),
    "#centro-base": squads.slice(4),
  };
  for (const [seletor, lista] of Object.entries(areas)) {
    $(seletor).innerHTML = lista.map(cartao).join("");
  }

  const interacoes = e.interacoes.slice(0, 8);
  $("#centro-sala-nota").textContent = `${e.interacoes.length} passagens de trabalho registradas entre especialistas.`;
  $("#centro-interacoes").innerHTML = interacoes.map(i => `<li${i.terminou_em_bloqueio ? ' class="com-bloqueio"' : ""}>
    <span class="i-de">${i.de}</span><span class="i-seta" aria-hidden="true">→</span><span class="i-para">${i.para}</span>
    <span class="i-vezes">${i.vezes}x</span>${i.terminou_em_bloqueio ? `<span class="i-bloqueio">${i.terminou_em_bloqueio} bloqueadas</span>` : ""}
  </li>`).join("");

  $("#centro-comando").hidden = false;
  desenharLigacoes(agentes);
  window.addEventListener("resize", () => desenharLigacoes(agentes));
}
// As linhas são medidas do DOM já posicionado; nenhuma coordenada é chutada.
function desenharLigacoes(agentes) {
  const mapa = $(".centro-mapa");
  const nucleo = $(".centro-nucleo");
  const svg = $("#centro-linhas");
  if (!mapa || !nucleo || mapa.offsetWidth === 0) return;
  const base = mapa.getBoundingClientRect();
  const n = nucleo.getBoundingClientRect();
  const cx = n.left - base.left + n.width / 2;
  const cy = n.top - base.top + n.height / 2;
  const porNome = Object.fromEntries(agentes.map(a => [a.nome, a]));
  const maior = Math.max(...agentes.map(a => a.participacoes), 1);

  svg.setAttribute("viewBox", `0 0 ${base.width} ${base.height}`);
  svg.innerHTML = $$(".no", mapa).map(no => {
    const a = porNome[no.dataset.agente];
    if (!a) return "";
    const r = no.getBoundingClientRect();
    const x = r.left - base.left + r.width / 2;
    const y = r.top - base.top + r.height / 2;
    const forca = a.participacoes / maior;
    const largura = (1 + forca * 2.4).toFixed(2);
    const opacidade = a.presente ? (0.22 + forca * 0.5).toFixed(2) : 0.1;
    return `<line x1="${cx.toFixed(1)}" y1="${cy.toFixed(1)}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" class="linha${a.presente ? "" : " apagada"}" style="stroke-width:${largura};opacity:${opacidade}"></line>`;
  }).join("");
}
// Cérebro e sala de reunião: tudo medido nos eventos de auditoria da rodada.
function renderAgencia(e) {
  const c = e.cerebro;
  $("#cerebro-motor").textContent = c.motor;
  $("#cerebro-modo").textContent = e.piloto.modo.replace("_", " ");
  $("#cerebro-sabe").innerHTML = c.sabe.map(s => `<div><strong>${s.valor}</strong><small>${s.rotulo}</small></div>`).join("");
  $("#cerebro-memoria").innerHTML = `<p class="cerebro-numero">${c.memoria.candidatos} candidato${c.memoria.candidatos === 1 ? "" : "s"}</p><p>${c.memoria.projetos.join(", ") || "nenhum projeto"} · ${c.memoria.promovidos_sem_humano} promovidos sem humano</p><p class="cerebro-regra">${c.memoria.regra}</p>`;
  $("#cerebro-recusa").innerHTML = c.recusa.map(r => `<li><span>${r.motivo}</span><b>${r.vezes}</b></li>`).join("");
  $("#cerebro-limites").innerHTML = c.limites.map(l => `<li>${l}</li>`).join("");

  const presentes = e.sala_de_reuniao.filter(a => a.presente).length;
  $("#sala-resumo").textContent = `${presentes} de ${e.sala_de_reuniao.length} na mesa`;
  $("#sala-grid").innerHTML = e.sala_de_reuniao.map(a => `<article class="agente${a.presente ? "" : " ausente"}" title="${a.descricao}"><span class="agente-avatar${a.transversal ? " transversal" : ""}" aria-hidden="true">${iniciais(a.nome)}</span><div class="agente-info"><strong>${a.nome}</strong><small>${a.papel}</small></div><div class="agente-metricas"><span>${a.participacoes} ações</span>${a.bloqueios ? `<span class="agente-bloqueio">${a.bloqueios} bloqueios</span>` : ""}</div></article>`).join("");
  $("#agencia").hidden = false;
}
function aplicarEstadoPiloto(e) {
  squads = e.squads.map(s => [s.nome, s.descricao, s.focos, s.icone]);
  tasks = e.tarefas.map(t => [t.nome, t.squad, t.entrega, t.estado]);
  approvals = e.aprovacoes.map(a => [a.titulo, a.area, a.risco, a.recomendacao, a.detalhe]);
  memories = e.memorias.map(m => [m.escopo, m.titulo, m.valor, m.fonte, `${m.retencao_dias} dias`]);
  audits = e.auditoria.slice(-40).reverse().map(l => [
    horaCurta(l.horario), `${l.evento} · ${l.case_id}`, l.ator, l.resultado,
    ["blocked", "stopped"].includes(l.resultado) ? "block" : "ok",
  ]);

  renderCentroDeComando(e);
  renderAgencia(e);
  $(".topbar .eyebrow").textContent = "COCKPIT INTERNO · FASE C · PILOTO DE AGÊNCIA";
  $(".welcome h2").textContent = "Bruno, aqui está o resultado real do piloto.";
  $(".welcome p:last-of-type").textContent = e.briefing.resumo;
  $(".welcome .eyebrow").textContent = `${e.piloto.nome.toUpperCase()} · ${e.piloto.modo.replace("_", " ").toUpperCase()}`;
  $(".metrics").innerHTML = [
    ["blue", "✓", e.resumo.concluidas, "Entregas concluídas"],
    ["purple", "◇", e.resumo.previas, "Prévias aguardando você"],
    ["amber", "!", e.resumo.bloqueadas + e.resumo.falhas_seguras, "Pedidos interrompidos"],
    ["green", "⌁", e.resumo.eventos_auditados, "Eventos auditados"],
  ].map(([cor, icone, valor, rotulo]) => `<article><span class="metric-icon ${cor}" aria-hidden="true">${icone}</span><div><strong>${valor}</strong><small>${rotulo}</small></div></article>`).join("");

  // Só o que espera uma decisão sua. Os pedidos interrompidos já estão
  // listados por inteiro no painel ao lado; repeti-los aqui seria ruído.
  const prioridades = [
    ...e.briefing.pendencias_humanas.map(p => ({titulo: p.titulo, texto: `Prévia pronta em ${p.area}, sem execução disponível.`, meta: `${p.area} · aguarda revisão`, destino: "aprovacoes", rotulo: "Ver prévia →"})),
    ...e.briefing.divergencias_preservadas.map(d => ({titulo: d.titulo, texto: `Divergência preservada em ${d.metricas.join(", ")}; nenhuma fonte foi declarada oficial.`, meta: `${d.area} · exige decisão humana`, destino: "auditoria", rotulo: "Ver evidência →"})),
  ];
  const painelFoco = $(".priority-list").closest(".panel");
  painelFoco.querySelector("h3").textContent = "Esperando sua decisão";
  $(".priority-list").innerHTML = prioridades.length
    ? prioridades.map((p, i) => `<li><span class="rank${i === 0 ? " urgent" : ""}">${i + 1}</span><div><strong>${p.titulo}</strong><p>${p.texto}</p><small>${p.meta}</small></div><button class="text-action" data-go="${p.destino}">${p.rotulo}</button></li>`).join("")
    : `<li class="vazio"><div><strong>Nada trava você agora.</strong><p>Nenhuma prévia ou divergência aguarda decisão nesta rodada.</p></div></li>`;
  painelFoco.querySelector(".tag").textContent = `${prioridades.length} ${prioridades.length === 1 ? "item" : "itens"}`;
  const totalInterrompidos = e.briefing.bloqueios.length;
  painelFoco.querySelector(".rodape-foco")?.remove();
  painelFoco.insertAdjacentHTML("beforeend", `<p class="rodape-foco">${totalInterrompidos} pedidos foram interrompidos pela política e não precisam de você — estão detalhados ao lado. <button class="text-action" data-go="auditoria">Ver auditoria →</button></p>`);
  $('[data-view="aprovacoes"] .count').textContent = String(e.resumo.previas);

  const paineis = $$(".stack .panel");
  const cor = {Alto: "red", Médio: "amber", Baixo: "green"};
  paineis[0].querySelector("h3").textContent = "Pedidos interrompidos";
  $$(".risk", paineis[0]).forEach(r => r.remove());
  paineis[0].insertAdjacentHTML("beforeend", e.briefing.bloqueios.map(b => `<div class="risk"><span class="risk-dot ${cor[b.risco] || "amber"}"></span><div><strong>${b.titulo}</strong><p>${b.motivo} · ${b.area}</p></div><span class="tag ${cor[b.risco] || "amber"}">${b.risco}</span></div>`).join(""));
  paineis[1].querySelector(".tag").textContent = `${e.aprovacoes.length} abertas`;
  $$(".decision", paineis[1]).forEach(d => d.remove());
  paineis[1].insertAdjacentHTML("beforeend", e.aprovacoes.map((a, i) => `<button class="decision" data-go="aprovacoes"><span>${String(i + 1).padStart(2,"0")}</span><div><strong>${a.titulo}</strong><small>${a.area} · sem execução disponível</small></div><b>›</b></button>`).join(""));
}
if (estado) aplicarEstadoPiloto(estado);

renderData();
$$(".nav-item").forEach(b => b.addEventListener("click", () => openView(b.dataset.view)));
$$('[data-go]').forEach(b => b.addEventListener("click", () => openView(b.dataset.go)));
$("#memory-filter").addEventListener("change", e => renderMemories(e.target.value));
$("#command-form").addEventListener("submit", e => { e.preventDefault(); const input = $("#command-input"); simulateCommand(input.value.trim()); input.value = ""; input.focus(); });
$$("[data-command]").forEach(b => b.addEventListener("click", () => { $("#command-input").value = b.dataset.command; $("#command-input").focus(); }));
$("#menu-toggle").addEventListener("click", () => { const open = $(".sidebar").classList.toggle("open"); $("#menu-toggle").setAttribute("aria-expanded", String(open)); $("#scrim").hidden = !open; });
$("#scrim").addEventListener("click", closeMenu);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
window.addEventListener("hashchange", () => { const id = location.hash.slice(1); if (viewTitles[id]) openView(id); });
const initial = location.hash.slice(1); if (viewTitles[initial]) openView(initial);
