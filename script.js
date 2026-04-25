const API_URL = 'https://api-clientes-jqkq.onrender.com';
let modo = 'login'; // 'login' ou 'registro'

const formTitulo = document.getElementById('form-titulo');
const btnTexto = document.getElementById('btn-texto');
const btnLoading = document.getElementById('btn-loading');
const toggleLink = document.getElementById('toggle-form');
const mensagem = document.getElementById('mensagem');

toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  modo = modo === 'login' ? 'registro' : 'login';
  formTitulo.textContent = modo === 'login' ? 'Entrar' : 'Criar Conta';
  btnTexto.textContent = modo === 'login' ? 'Entrar' : 'Registrar';
  toggleLink.textContent = modo === 'login' ? 'Criar uma conta' : 'Já tenho conta';
  mensagem.classList.add('d-none');
});

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = `alert alert-${tipo}`;
}

function loading(ativo) {
  btnTexto.classList.toggle('d-none', ativo);
  btnLoading.classList.toggle('d-none', !ativo);
}

document.getElementById('auth-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const endpoint = modo === 'login' ? '/auth/login' : '/auth/registro';

  loading(true);
  try {
    const resposta = await fetch(API_URL + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    const dados = await resposta.json();

    if (resposta.ok) {
      if (modo === 'login') {
        localStorage.setItem('token', dados.token);
        window.location.href = 'dashboard.html';
      } else {
        mostrarMensagem('Conta criada! Faça login.', 'success');
        toggleLink.click();
      }
    } else {
      mostrarMensagem(dados.erro || 'Erro', 'danger');
    }
  } catch {
    mostrarMensagem('Erro de conexão', 'danger');
  }
  loading(false);
});