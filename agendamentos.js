const API_URL = 'https://api-clientes-jqkq.onrender.com';
const token = localStorage.getItem('token');

if (!token) window.location.href = 'index.html';

document.getElementById('btn-sair').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
});

function loading(ativo) {
  document.getElementById('btn-texto').classList.toggle('d-none', ativo);
  document.getElementById('btn-loading').classList.toggle('d-none', !ativo);
}

async function carregarClientes() {
  const resposta = await fetch(API_URL + '/clientes', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const clientes = await resposta.json();
  const select = document.getElementById('cliente-id');
  clientes.forEach(c => {
    select.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
  });
}

async function listarAgendamentos() {
  const resposta = await fetch(API_URL + '/agendamentos', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const agendamentos = await resposta.json();
  const lista = document.getElementById('lista-agendamentos');
  lista.innerHTML = '';

  agendamentos.forEach(a => {
    lista.innerHTML += `
      <div class="col-md-4">
        <div class="card bg-secondary text-white shadow">
          <div class="card-body">
            <h5 class="card-title">${a.servico}</h5>
            <p class="card-text">
              <i class="bi bi-person"></i> ${a.cliente_nome}<br>
              <i class="bi bi-calendar"></i> ${a.data}<br>
              <i class="bi bi-clock"></i> ${a.hora}
            </p>
            <button class="btn btn-sm btn-danger" onclick="excluirAgendamento(${a.id})">
              <i class="bi bi-trash"></i> Cancelar
            </button>
          </div>
        </div>
      </div>`;
  });
}

document.getElementById('agendamento-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const cliente_id = document.getElementById('cliente-id').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;
  const servico = document.getElementById('servico').value;

  loading(true);
  await fetch(API_URL + '/agendamentos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ cliente_id, data, hora, servico })
  });
  loading(false);
  e.target.reset();
  listarAgendamentos();
});

async function excluirAgendamento(id) {
  await fetch(API_URL + '/agendamentos/' + id, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  });
  listarAgendamentos();
}

carregarClientes();
listarAgendamentos();