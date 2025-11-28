document.addEventListener("DOMContentLoaded", async function () {
  // === 1. CAPTURA DE ELEMENTOS DO DOM ===
  const corpoCalendario = document.getElementById("corpo-calendario");
  const mesAnoTitulo = document.getElementById("mes-ano-titulo");
  const btnAnterior = document.getElementById("btn-anterior");
  const btnProximo = document.getElementById("btn-proximo");
  const listaAgendamentos = document.getElementById("lista-agendamentos");

  // Elementos do Modal de Edição
  const editModal = document.getElementById("edit-modal");
  const closeButton = document.querySelector(".close-button");
  const modalDataTitulo = document.getElementById("modal-data");
  const statusSelect = document.getElementById("status-select");
  const agendamentosDoDiaDiv = document.getElementById("agendamentos-do-dia");
  const btnSalvarStatus = document.getElementById("btn-salvar-status");

  // === 2. VARIÁVEIS DE ESTADO ===
  let dataAtual = new Date();
  let agendamentos = [];
  let celulaSelecionada = null; // Para rastrear qual célula do dia foi clicada

  // === 3. CARREGAMENTO INICIAL DE DADOS ===
  try {
    // Supondo que a função fetchAgendamentos() está definida em 'api.js'
    // e retorna os dados brutos
    agendamentos = await fetchAgendamentos();
  } catch (err) {
    console.error("Erro ao buscar agendamentos:", err);
  }

  // Formata os dados de agendamentos para padronização
  agendamentos = agendamentos.map(a => {
    // Converte YYYY-MM-DD para DD/MM/YYYY
    const dataISO = a.data_agendamento || a.data;
    let dataFormatada = '-';

    if (dataISO) {
        const d = new Date(dataISO);
        dataFormatada = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth()+1).padStart(2, '0')}/${d.getFullYear()}`;
    }

    return {
        nome: a.nome_cliente || a.nome || '-',
        email: a.email_cliente || a.email || '-',
        profissional: a.Profissional?.nome || a.profissional || '-',
        data: dataFormatada,
        horario: a.horarioSelecionado || a.horario || '00:00'
    };
});


  // === 4. FUNÇÕES DO CALENDÁRIO ===

  /**
   * Gera o HTML do calendário para o mês atual.
   * Adiciona o listener de clique para abrir o Modal em cada dia.
   */
  function gerarCalendario(data) {
    const ano = data.getFullYear();
    const mes = data.getMonth(); // 0 a 11
    const nomeMes = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
      data
    );
    mesAnoTitulo.textContent = `${
      nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1)
    } ${ano}`;

    corpoCalendario.innerHTML = "";
    const primeiroDiaSemana = (new Date(ano, mes, 1).getDay() + 6) % 7; // Ajuste para Seg=0
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    let linha = document.createElement("tr");

    // Preencher dias vazios antes do 1º dia
    for (let i = 0; i < primeiroDiaSemana; i++) {
      linha.appendChild(document.createElement("td"));
    }

    for (let dia = 1; dia <= ultimoDia; dia++) {
      if (linha.children.length === 7) {
        corpoCalendario.appendChild(linha);
        linha = document.createElement("tr");
      }

      const celula = document.createElement("td");
      celula.textContent = dia;

      // Data formatada como DD/MM/AAAA para fácil comparação
      const dataCompleta = `${String(dia).padStart(2, "0")}/${String(
        mes + 1
      ).padStart(2, "0")}/${ano}`;

      celula.setAttribute("data-date", dataCompleta);
      celula.classList.add("dia-calendario");

      // === NOVO: EVENT LISTENER PARA O MODAL ===
      celula.addEventListener("click", function () {
        abrirModal(dataCompleta, celula);
      });
      // =======================================

      // Marca o dia de hoje
      const hoje = new Date();
      if (
        dia === hoje.getDate() &&
        mes === hoje.getMonth() &&
        ano === hoje.getFullYear()
      ) {
        celula.classList.add("dia-hoje");
      }

      // TODO: Se você tiver um LocalStorage ou dados de status, carregue as classes aqui:
      // if (statusSalvo[dataCompleta]) {
      //     celula.classList.add(`dia-status-${statusSalvo[dataCompleta]}`);
      // }

      linha.appendChild(celula);
    }

    // Preencher restante da linha
    while (linha.children.length < 7) {
      linha.appendChild(document.createElement("td"));
    }
    corpoCalendario.appendChild(linha);
  }

  /**
   * Navega para o mês anterior ou próximo.
   */
  function navegarMes(offset) {
    dataAtual.setMonth(dataAtual.getMonth() + offset);
    gerarCalendario(dataAtual);
  }

  // Eventos de navegação
  btnAnterior.addEventListener("click", () => navegarMes(-1));
  btnProximo.addEventListener("click", () => navegarMes(1));

  /**
   * Renderiza a lista detalhada de todos os agendamentos.
   */
  function renderListaAgendamentos() {
    listaAgendamentos.innerHTML = "";

    const agendamentosOrdenados = agendamentos.sort((a, b) => {
      // Converte DD/MM/AAAA para Date para ordenação
      const converterData = (dataStr, horarioStr) => {
        if (dataStr === "-") return new Date(0); // Coloca '-' no fim
        const [dia, mes, ano] = dataStr.split("/");
        return new Date(`${ano}-${mes}-${dia}T${horarioStr}:00`);
      };

      const dtA = converterData(a.data, a.horario);
      const dtB = converterData(b.data, b.horario);
      return dtA - dtB;
    });

    agendamentosOrdenados.forEach((ag) => {
      const p = document.createElement("p");
      p.textContent = `Nome: ${ag.nome} | Email: ${ag.email} | Data: ${ag.data} | Horário: ${ag.horario}`;
      listaAgendamentos.appendChild(p);
    });
  }

  // === 5. FUNÇÕES DO MODAL DE EDIÇÃO ===

  /**
   * Abre o modal e carrega os dados do dia selecionado.
   */
  function abrirModal(dataCompleta, celula) {
    celulaSelecionada = celula;

    // 1. Preenche o Título e a Data no Modal
    modalDataTitulo.textContent = dataCompleta;

    // 2. Preenche os agendamentos daquele dia no Modal
    const agendamentosDoDia = agendamentos.filter(
      (a) => a.data === dataCompleta
    );
    agendamentosDoDiaDiv.innerHTML = "";

    if (agendamentosDoDia.length === 0) {
      agendamentosDoDiaDiv.innerHTML =
        "<p>Nenhum agendamento encontrado para esta data.</p>";
    } else {
      agendamentosDoDia.forEach((ag) => {
        const p = document.createElement("p");
        p.textContent = `${ag.horario} - ${ag.nome} (${ag.profissional})`;
        agendamentosDoDiaDiv.appendChild(p);
      });
    }

    // 3. Define o status inicial no dropdown do modal (baseado nas classes atuais)
    // Classes de status: dia-status-feito, dia-status-pendente, dia-status-negado
    const classesDeStatus = [
      "dia-status-feito",
      "dia-status-pendente",
      "dia-status-negado",
    ];
    let statusAtual = "padrao";

    for (const cls of classesDeStatus) {
      if (celula.classList.contains(cls)) {
        statusAtual = cls.replace("dia-status-", "");
        break;
      }
    }
    statusSelect.value = statusAtual;

    // 4. Exibe o modal
    editModal.classList.add("is-visible");
  }

  /**
   * Fecha o modal.
   */
  function fecharModal() {
    editModal.classList.remove("is-visible");
    celulaSelecionada = null;
  }

  /**
   * Aplica o novo status à célula do calendário e fecha o modal.
   */
  function salvarStatus() {
    if (!celulaSelecionada) return;

    const novoStatus = statusSelect.value;
    const classesDeStatusRemover = [
      "dia-status-feito",
      "dia-status-pendente",
      "dia-status-negado",
      "dia-selecionado",
    ];

    // 1. Remove classes de status antigas
    celulaSelecionada.classList.remove(...classesDeStatusRemover);

    // 2. Aplica a nova classe de status
    if (novoStatus !== "padrao") {
      celulaSelecionada.classList.add(`dia-status-${novoStatus}`);
    }

    // TODO: **IMPORTANTE:** Adicione aqui a lógica para salvar o novo status de forma persistente
    // (Ex: LocalStorage ou enviando para o seu banco de dados via API)

    fecharModal();
  }

  // Eventos de Fechamento do Modal
  closeButton.addEventListener("click", fecharModal);
  btnSalvarStatus.addEventListener("click", salvarStatus);

  // Fechar ao clicar fora do modal
  window.addEventListener("click", (event) => {
    if (event.target === editModal) {
      fecharModal();
    }
  });

  // === 6. INICIALIZAÇÃO ===
  gerarCalendario(dataAtual);
  renderListaAgendamentos();
});
