const API_URL = 'https://api-clientes-jqkq.onrender.com';
const token = localStorage.getItem('token');

// Se não tiver token, volta para o login
if (!token) {
  window.location.href = 'index.html';
}

// Sair
document.getElementById('btn-sair').addEventListener('click', function() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
});

// Listar clientes
async function listarClientes() {
  try {
    const resposta = await fetch(API_URL + '/clientes', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const clientes = await resposta.json();
    const lista = document.getElementById('lista-clientes');
    lista.innerHTML = '';

    clientes.forEach(cliente => {
      const item = document.createElement('li');
      item.textContent = cliente.nome + ' - ' + cliente.telefone;

      const btnEditar = document.createElement('button');
      btnEditar.innerHTML = '<i class="fas fa-pen"></i>';
      btnEditar.title = 'Editar';
      btnEditar.addEventListener('click', () => {
        document.getElementById('cliente-id').value = cliente.id;
        document.getElementById('cliente-nome').value = cliente.nome;
        document.getElementById('cliente-telefone').value = cliente.telefone;
      });

      const btnExcluir = document.createElement('button');
      btnExcluir.innerHTML = '<i class="fas fa-trash"></i>';
      btnExcluir.title = 'Excluir';
      btnExcluir.addEventListener('click', () => excluirCliente(cliente.id));

      item.appendChild(btnEditar);
      item.appendChild(btnExcluir);
      lista.appendChild(item);
    });
  } catch (erro) {
    console.log('Erro ao listar:', erro);
  }
}

// Criar ou Atualizar cliente
document.getElementById('cliente-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const id = document.getElementById('cliente-id').value;
  const nome = document.getElementById('cliente-nome').value;
  const telefone = document.getElementById('cliente-telefone').value;

  if (id) {
    await fetch(API_URL + '/clientes/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ nome, telefone })
    });
    document.getElementById('cliente-id').value = '';
  } else {
    await fetch(API_URL + '/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ nome, telefone })
    });
  }

  this.reset();
  listarClientes();
});

// Excluir cliente
async function excluirCliente(id) {
  await fetch(API_URL + '/clientes/' + id, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  });
  listarClientes();
}

// Carregar lista ao iniciar
listarClientes();