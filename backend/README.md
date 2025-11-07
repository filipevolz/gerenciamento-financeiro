# Backend - Gerenciamento Financeiro

Backend em Node.js com Express e Prisma para sistema de gerenciamento financeiro.

## 🚀 Tecnologias

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- TypeScript
- JWT (JSON Web Tokens)
- Bcrypt

## 📋 Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL rodando
- Arquivo `.env` configurado

## 🔧 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure o arquivo `.env` (use o `.env.example` como base):
```bash
cp .env.example .env
```

3. Configure a `DATABASE_URL` no arquivo `.env`:
```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
JWT_SECRET="seu_secret_muito_seguro_aqui"
PORT=3333
```

4. Execute as migrations do Prisma:
```bash
npm run prisma:migrate
```

5. Gere o Prisma Client:
```bash
npm run prisma:generate
```

## 🎯 Como usar

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## 📌 Rotas da API

### Autenticação

#### POST `/api/auth/register`
Registrar um novo usuário

**Body:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123",
  "name": "Nome do Usuário"
}
```

**Resposta (201):**
```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": "uuid",
    "email": "usuario@exemplo.com",
    "name": "Nome do Usuário",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_aqui"
}
```

#### POST `/api/auth/login`
Fazer login

**Body:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Resposta (200):**
```json
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": "uuid",
    "email": "usuario@exemplo.com",
    "name": "Nome do Usuário",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_aqui"
}
```

### Health Check

#### GET `/api/health`
Verificar se o servidor está rodando

**Resposta (200):**
```json
{
  "status": "ok",
  "message": "Servidor rodando!"
}
```

## 🔐 Autenticação

Para rotas protegidas (futuras), inclua o token JWT no header:
```
Authorization: Bearer seu_token_jwt_aqui
```

## 🛠️ Scripts disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Compila o TypeScript
- `npm start` - Inicia o servidor em produção
- `npm run prisma:generate` - Gera o Prisma Client
- `npm run prisma:migrate` - Executa as migrations
- `npm run prisma:studio` - Abre o Prisma Studio (interface visual do banco)

