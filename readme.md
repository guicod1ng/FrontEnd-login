# 🖥️ Front-end - Dashboard de Clientes

Interface web para consumo de API REST com autenticação JWT, permitindo gerenciamento completo de clientes.

---

## ⚙️ Stack

HTML • CSS • JavaScript (Vanilla) • Font Awesome

---

## 📌 Funcionalidades

* Registro e login com JWT
* Proteção de rotas (sem token → redirecionamento)
* CRUD completo de clientes
* Logout
* Layout responsivo e interativo

---

## 🔗 Integração com API

API: https://api-clientes-xxxx.onrender.com

Repositório: https://github.com/guicod1ng/API-Node-POstgreSQL

---

## 📁 Estrutura

```bash
frontend-login/
├── index.html            → Login e Registro
├── dashboard.html        → CRUD de Clientes
├── agendamentos.html     → CRUD de Agendamentos
├── style.css             → Tema escuro responsivo
├── script.js             → Conexão API (auth)
├── dashboard.js          → Conexão API (clientes)
└── agendamentos.js       → Conexão API (agendamentos)
```

---

## 🚀 Como usar

1. Abra o `index.html` no navegador
2. Registre um usuário ou faça login
3. Acesse o dashboard para gerenciar clientes

---

## 🚧 Melhorias futuras

* Página de agendamentos
* Feedback visual (loading e validações)
* Tema claro/escuro
* Deploy (GitHub Pages ou Vercel)

---

## 💡 Sobre

Projeto front-end desenvolvido para integração com API própria, focado em autenticação, consumo de dados e organização de interface.
