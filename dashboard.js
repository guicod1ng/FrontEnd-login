const API_URL = 'https://api-clientes-jqkq.onrender.com';
const token = localStorage.getItem('token');

if (!token) window.location.href = 'index.html';

document.getElementById('btn-sair').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
});

function mostrarMensagem(texto, tipo) {
  const m = document.getElementById('mensagem');
  m.textContent = texto;
  m.className = `alert alert-${tipo}`;
}

function loading(ativo) {
  document.getElementById('btn-texto').classList.toggle('d-none', ativo);
  document.getElementById('btn-loading').classList.toggle('d-none', !ativo);
}

async function listarClientes() {
  try {
    const resposta = await fetch(API_URL + '/clientes', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const clientes = await resposta.json();
    const lista = document.getElementById('lista-clientes');
    lista.innerHTML = '';

    clientes.forEach(cliente => {
      lista.innerHTML += `
        <div class="col-md-4">
          <div class="card bg-secondary text-white shadow">
            <div class="card-body">
              <h5 class="card-title">${cliente.nome}</h5>
              <p class="card-text"><i class="bi bi-telephone"></i> ${cliente.telefone}</p>
              <button class="btn btn-sm btn-warning me-1" onclick="editarCliente(${cliente.id}, '${cliente.nome}', '${cliente.telefone}')">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-sm btn-danger" onclick="excluirCliente(${cliente.id})">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>`;
    });
  } catch (erro) {
    console.log('Erro:', erro);
  }
}

function editarCliente(id, nome, telefone) {
  document.getElementById('cliente-id').value = id;
  document.getElementById('cliente-nome').value = nome;
  document.getElementById('cliente-telefone').value = telefone;
  document.getElementById('btn-texto').innerHTML = '<i class="bi bi-check-lg"></i> Atualizar';
}

document.getElementById('cliente-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('cliente-id').value;
  const nome = document.getElementById('cliente-nome').value;
  const telefone = document.getElementById('cliente-telefone').value;
  const metodo = id ? 'PUT' : 'POST';
  const url = id ? API_URL + '/clientes/' + id : API_URL + '/clientes';

  loading(true);
  const resposta = await fetch(url, {
    method: metodo,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ nome, telefone })
  });

  if (resposta.ok) {
    document.getElementById('cliente-id').value = '';
    document.getElementById('btn-texto').innerHTML = '<i class="bi bi-plus-lg"></i> Adicionar';
  }
  loading(false);
  e.target.reset();
  listarClientes();
});

async function excluirCliente(id) {
  await fetch(API_URL + '/clientes/' + id, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  });
  listarClientes();
}

listarClientes();