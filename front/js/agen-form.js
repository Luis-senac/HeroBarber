document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAgendamento");
  const btnVerMais = document.getElementById("btnVerMais");
  const horariosAdicionais = document.getElementById("horariosAdicionais");
  const botoesHorario = document.querySelectorAll(".botoes-horario button");
  const campoHorario = document.getElementById("horarioSelecionado");
  const erroProfissional = document.getElementById("erroProfissional");

  const API_BASE =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://streetbarber.onrender.com";

  // Botão ver mais
  btnVerMais.addEventListener("click", () => {
    horariosAdicionais.classList.toggle("horarios-escondidos");
    btnVerMais.textContent = horariosAdicionais.classList.contains(
      "horarios-escondidos"
    )
      ? "ver mais"
      : "ver menos";

    // FUNÇÃO QUE BUSCA AGENDAMENTOS E MOSTRA NO HTML
    async function carregarAgendamentos() {
      try {
        const res = await fetch(`${API_BASE}/api/agendamento`); // GET
        const lista = await res.json();

        const container = document.getElementById("lista-agendamentos");
        container.innerHTML = ""; // limpa antes de adicionar

        if (!Array.isArray(lista) || lista.length === 0) {
          container.innerHTML = "<p>Nenhum agendamento encontrado.</p>";
          return;
        }

        lista.forEach((item) => {
          const div = document.createElement("div");
          div.classList.add("agendamento-item");

          div.innerHTML = `
        <strong>Nome:</strong> ${item.nome} <br>
        <strong>Profissional:</strong> ${
          item.Profissional?.nome || "Desconhecido"
        } <br>
        <strong>Data:</strong> ${item.data_agendamento} <br>
        <strong>Horário:</strong> ${item.horarioSelecionado}
      `;

          container.appendChild(div);
        });
      } catch (erro) {
        console.error("Erro ao carregar agendamentos:", erro);
      }
    }

    carregarAgendamentos();
  });

  // Seleção de horário
  botoesHorario.forEach((btn) => {
    btn.addEventListener("click", () => {
      botoesHorario.forEach((b) => b.classList.remove("ativo"));
      btn.classList.add("ativo");
      campoHorario.value = btn.textContent.trim();
    });
  });

  // validação profissional
  window.validarSelecao = (input) => {
    const lista = ["Thiago Mendes", "Henrique Souza", "Lucas Silva"];
    if (!lista.includes(input.value)) {
      erroProfissional.style.display = "block";
      input.value = "";
    } else {
      erroProfissional.style.display = "none";
    }
  };

  // Envio do formulário
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const profissional = document.getElementById("profissional").value.trim();
    const horarioSelecionado = campoHorario.value.trim();
    const data_agendamento = document.getElementById("data").value;

    if (
      !nome ||
      !email ||
      !profissional ||
      !horarioSelecionado ||
      !data_agendamento
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/agendamento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          profissional,
          horarioSelecionado,
          data_agendamento,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ " + data.message);
        form.reset();
        campoHorario.value = "";
        botoesHorario.forEach((b) => b.classList.remove("ativo"));
      } else {
        alert("❌ " + data.error);
      }
    } catch (error) {
      alert("Erro ao enviar. Verifique sua conexão com o servidor.");
    }
  });
});
