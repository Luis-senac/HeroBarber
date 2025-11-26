const API_BASE = "/api";

export async function fetchAgendamentos() {
  const res = await fetch(`${API_BASE}/agendamento`);
  return await res.json();
}

export async function salvarAgendamento(agendamento) {
  const res = await fetch(`${API_BASE}/agendamento`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(agendamento),
  });
  return await res.json();
}
