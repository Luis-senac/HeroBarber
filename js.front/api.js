const API_BASE = "/api";

export async function fetchAgendamentos() {
  const res = await fetch(`${API_BASE}/agendamentos`);
  return await res.json();
}

export async function salvarAgendamento(agendamento) {
  const res = await fetch(`${API_BASE}/agendamentos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(agendamento),
  });
  return await res.json();
}
