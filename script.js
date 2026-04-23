const API_URL = 'https://api-clientes-jqkq.onrender.com';
const linkLogin = document.getElementById('show-login');
const linkRegistro = document.getElementById('show-register');
const formLogin = document.getElementById('login-form');
const formRegistro = document.getElementById('register-form');

linkLogin.addEventListener('click', function() {
  formLogin.classList.remove('hidden-form');
  formRegistro.classList.add('hidden-form');
});

linkRegistro.addEventListener('click', function() {
  formRegistro.classList.remove('hidden-form');
  formLogin.classList.add('hidden-form');
});

// Registrar
document.getElementById('register-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = document.getElementById('register-email').value;
  const senha = document.getElementById('register-password').value;

  try {
    const resposta = await fetch(API_URL + '/auth/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert('Registro feito com sucesso! Faça login.');
      document.getElementById('register-form').reset();
    } else {
      alert(dados.erro || 'Erro ao registrar');
    }
  } catch (erro) {
    alert('Erro de conexão com o servidor');
  }
});

// Login
document.getElementById('login-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const senha = document.getElementById('login-password').value;

  try {
    const resposta = await fetch(API_URL + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      localStorage.setItem('token', dados.token);
      alert('Login realizado com sucesso!');
      window.location.href = 'dashboard.html';
    } else {
      alert(dados.erro || 'Erro ao fazer login');
    }
  } catch (erro) {
    alert('Erro de conexão com o servidor');
  }
});