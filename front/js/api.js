// Detecta automaticamente se está no localhost ou no Render
const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://herobarber.onrender.com";

// GET - Buscar agendamentos
export async function fetchAgendamentos() {
  const res = await fetch(`${API_BASE}/api/agendamento`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Erro ao carregar agendamentos.");
  return data;
}

// POST - Salvar agendamento
export async function salvarAgendamento(agendamento) {
  const res = await fetch(`${API_BASE}/api/agendamento`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(agendamento),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Erro ao salvar agendamento.");
  return data;
}
