const API_URL = 'https://api-clientes-jqkq.onrender.com';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'index.html';
}

// Sair
document.getElementById('btn-sair').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
});

// Ir para clientes
document.getElementById('btn-clientes').addEventListener('click', () => {
  window.location.href = 'dashboard.html';
});

// Carregar clientes no select
async function carregarClientes() {
  const resposta = await fetch(API_URL + '/clientes', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const clientes = await resposta.json();
  const select = document.getElementById('cliente-id');
  clientes.forEach(c => {
    const option = document.createElement('option');
    option.value = c.id;
    option.textContent = c.nome;
    select.appendChild(option);
  });
}

// Listar agendamentos
async function listarAgendamentos() {
  const resposta = await fetch(API_URL + '/agendamentos', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const agendamentos = await resposta.json();
  const lista = document.getElementById('lista-agendamentos');
  lista.innerHTML = '';

  agendamentos.forEach(a => {
    const item = document.createElement('li');
    item.textContent = `${a.data} ${a.hora} - ${a.cliente_nome} - ${a.servico}`;

    const btnExcluir = document.createElement('button');
    btnExcluir.innerHTML = '<i class="fas fa-trash"></i>';
    btnExcluir.title = 'Cancelar';
    btnExcluir.addEventListener('click', () => excluirAgendamento(a.id));

    item.appendChild(btnExcluir);
    lista.appendChild(item);
  });
}

// Criar agendamento
document.getElementById('agendamento-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const cliente_id = document.getElementById('cliente-id').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;
  const servico = document.getElementById('servico').value;

  await fetch(API_URL + '/agendamentos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ cliente_id, data, hora, servico })
  });

  this.reset();
  listarAgendamentos();
});

// Excluir agendamento
async function excluirAgendamento(id) {
  await fetch(API_URL + '/agendamentos/' + id, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  });
  listarAgendamentos();
}

carregarClientes();
listarAgendamentos();