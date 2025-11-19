// Espera o carregamento completo do DOM antes de executar o cÃ³digo
document.addEventListener("DOMContentLoaded", async () => {
    // Seleciona o corpo da tabela onde os agendamentos serÃ£o exibidos
    const tbody = document.querySelector("#bookingsTable tbody");

    // FunÃ§Ã£o que busca os agendamentos no servidor e exibe na tabela
    async function carregarAgendamentos() {
        // Limpa a tabela antes de inserir os novos dados
        tbody.innerHTML = "";
        try {
            // Faz uma requisiÃ§Ã£o GET para o backend local
            const res = await fetch("http://localhost:3000/agendamentos");
            const agendamentos = await res.json();

            // Percorre cada agendamento retornado e cria uma linha na tabela
            agendamentos.forEach(a => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${a.nome}</td>
                    <td>${a.telefone}</td>
                    <td>${a.servico}</td>
                    <td>${a.data}</td>
                    <td>${a.horario}</td>
                    <td>
                        <button class="edit-btn" data-id="${a.id}">Editar</button>
                        <button class="delete-btn" data-id="${a.id}">Deletar</button>
                    </td>
                `;
                // Adiciona a linha na tabela
                tbody.appendChild(tr);
            });

            // Depois de criar as linhas, adiciona os eventos nos botÃµes
            adicionarEventos();
        } catch (erro) {
            alert("Erro ao carregar os agendamentos: " + erro);
        }
    }

    // FunÃ§Ã£o que adiciona os eventos aos botÃµes de editar e deletar
    function adicionarEventos() {

        // --- DELETE ---
        // Seleciona todos os botÃµes de deletar e adiciona evento de clique
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;

                // Confirma antes de deletar
                if (confirm("Deseja realmente deletar este agendamento?")) {
                    try {
                        const res = await fetch(`http://localhost:3000/agendamentos/${id}`, {
                            method: "DELETE"
                        });
                        const texto = await res.text();
                        alert(texto);
                        // Recarrega a lista apÃ³s deletar
                        carregarAgendamentos();
                    } catch (erro) {
                        alert("Erro ao deletar: " + erro);
                    }
                }
            });
        });

        // --- PATCH ---
        // Permite editar o horÃ¡rio do agendamento (pode mudar depois para editar mais campos)
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;
                const novoHorario = prompt("Digite o novo horÃ¡rio (HH:MM):");

                if (novoHorario) {
                    try {
                        const res = await fetch(`http://localhost:3000/agendamentos/${id}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ horario: novoHorario })
                        });
                        const texto = await res.text();
                        alert(texto);
                        // Recarrega a lista apÃ³s atualizar
                        carregarAgendamentos();
                    } catch (erro) {
                        alert("Erro ao atualizar: " + erro);
                    }
                }
            });
        });
    }

    // Quando a pÃ¡gina carregar, busca e exibe todos os agendamentos
    carregarAgendamentos();
});