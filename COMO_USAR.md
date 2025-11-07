# 🚀 Como Usar - Sistema de Gerenciamento Financeiro

Guia completo para rodar o projeto frontend e backend.

## 📋 Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL rodando
- Git (opcional)

## 🔧 Configuração

### 1️⃣ Configurar Backend

```bash
# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Configure o arquivo .env
# Crie um arquivo .env na pasta backend com:
DATABASE_URL="postgresql://usuario:senha@localhost:5432/gerenciamento_financeiro?schema=public"
JWT_SECRET="seu_secret_muito_seguro_aqui"
PORT=3333

# Execute as migrations do Prisma
npm run prisma:migrate

# Gere o Prisma Client
npm run prisma:generate

# Inicie o servidor backend
npm run dev
```

O backend estará rodando em `http://localhost:3333` ✅

### 2️⃣ Configurar Frontend

Abra um **novo terminal** e execute:

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor frontend
npm run dev
```

O frontend estará rodando em `http://localhost:5173` ✅

## 🎯 Testando a Aplicação

### 1. Acessar o Frontend
Abra seu navegador em `http://localhost:5173`

### 2. Criar uma Conta
- Clique em "Cadastre-se" na página de login
- Preencha: Nome, Email, Senha e Confirmação de Senha
- Clique em "Cadastrar"
- Você será redirecionado para o Dashboard

### 3. Fazer Login
- Na página de login, digite seu email e senha
- Clique em "Entrar"
- Você será redirecionado para o Dashboard

### 4. Logout
- No Dashboard, clique em "Sair"
- Você será redirecionado para a página de login

## 🎨 Recursos Visuais

### Animação de Fundo (Finisher Header)
- As páginas de Login e Register possuem uma animação de fundo linda
- 12 partículas coloridas em movimento
- Cores vibrantes: roxo, laranja, azul e rosa

### Design Moderno
- Interface limpa e moderna
- Formulários com validação
- Mensagens de erro claras
- Totalmente responsivo (funciona em mobile)

## 🛠️ Scripts Úteis

### Backend
```bash
npm run dev           # Modo desenvolvimento
npm run build         # Compilar TypeScript
npm start             # Rodar em produção
npm run prisma:studio # Abrir interface visual do banco
npm run prisma:migrate # Rodar migrations
```

### Frontend
```bash
npm run dev           # Modo desenvolvimento
npm run build         # Build para produção
npm run preview       # Visualizar build
npm run lint          # Verificar erros
```

## 🔐 Endpoints da API

### Autenticação

**POST** `/api/auth/register`
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

**POST** `/api/auth/login`
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**GET** `/api/health`
- Verifica se o servidor está rodando

## 📝 Estrutura do Projeto

```
gerenciamento-financeiro/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── lib/
│   │   └── index.ts
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── public/
    │   └── finisher-header.es5.min.js
    ├── src/
    │   ├── hooks/
    │   ├── pages/
    │   ├── services/
    │   ├── styles/
    │   ├── App.tsx
    │   └── main.tsx
    └── package.json
```

## ⚠️ Problemas Comuns

### Backend não inicia
- ✅ Verifique se o PostgreSQL está rodando
- ✅ Verifique se o arquivo `.env` está configurado corretamente
- ✅ Execute `npm run prisma:generate` novamente

### Frontend não conecta com o backend
- ✅ Verifique se o backend está rodando em `http://localhost:3333`
- ✅ Verifique o console do navegador para ver erros
- ✅ Verifique se o CORS está habilitado no backend

### Erro ao fazer login/cadastro
- ✅ Verifique se o banco de dados foi criado
- ✅ Verifique se as migrations foram executadas
- ✅ Veja os logs do backend para detalhes do erro

## 🎉 Pronto!

Agora você tem um sistema completo de autenticação com:
- ✅ Backend em Node.js + Express + Prisma
- ✅ Frontend em React + TypeScript + Styled Components
- ✅ Autenticação JWT
- ✅ Animações lindas
- ✅ Design moderno e responsivo

## 📚 Próximos Passos

- Adicionar funcionalidades de gerenciamento financeiro
- Criar dashboard com gráficos
- Adicionar categorias de despesas
- Implementar relatórios
- Adicionar notificações
- Criar sistema de metas financeiras

Divirta-se codando! 🚀

