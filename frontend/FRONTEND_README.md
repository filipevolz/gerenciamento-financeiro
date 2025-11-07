# Frontend - Gerenciamento Financeiro

Frontend em React com TypeScript, React Router, Styled Components e Finisher Header.

## 🚀 Tecnologias

- React 19
- TypeScript
- React Router DOM
- Styled Components
- Axios
- Finisher Header (animação de fundo)
- Vite

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Backend rodando em `http://localhost:3333`

## 🔧 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
frontend/
├── public/
│   └── finisher-header.es5.min.js  # Biblioteca de animação
├── src/
│   ├── hooks/
│   │   └── useFinisherHeader.ts    # Hook para animação de fundo
│   ├── pages/
│   │   ├── Login.tsx               # Página de login
│   │   ├── Register.tsx            # Página de cadastro
│   │   └── Dashboard.tsx           # Dashboard (após login)
│   ├── services/
│   │   └── api.ts                  # Configuração do Axios e serviços
│   ├── styles/
│   │   ├── AuthStyles.ts           # Estilos das páginas de auth
│   │   └── GlobalStyles.ts         # Estilos globais
│   ├── App.tsx                     # Componente principal com rotas
│   ├── main.tsx                    # Ponto de entrada
│   └── vite-env.d.ts               # Tipos TypeScript
├── index.html
└── package.json
```

## 🎯 Rotas Disponíveis

- `/` - Redireciona para `/login`
- `/login` - Página de login
- `/register` - Página de cadastro
- `/dashboard` - Dashboard (após autenticação)

## ✨ Funcionalidades

### Página de Login (`/login`)
- Formulário de login com email e senha
- Validação de campos
- Mensagens de erro
- Link para página de cadastro
- Animação de fundo com Finisher Header

### Página de Register (`/register`)
- Formulário de cadastro com nome, email, senha e confirmação
- Validação de senha (mínimo 6 caracteres)
- Verificação de senha (confirmação)
- Mensagens de erro
- Link para página de login
- Animação de fundo com Finisher Header

### Dashboard (`/dashboard`)
- Exibe informações do usuário logado
- Botão de logout
- Proteção de rota (requer autenticação)

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação:

1. Após login/cadastro bem-sucedido, o token é armazenado no `localStorage`
2. Todas as requisições autenticadas incluem o token no header `Authorization`
3. Os dados do usuário também são armazenados no `localStorage`

## 🎨 Styled Components

Todos os estilos são feitos com Styled Components:
- `AuthStyles.ts` - Estilos compartilhados entre Login e Register
- `GlobalStyles.ts` - Reset CSS e estilos globais

## 🌈 Finisher Header

A animação de fundo é feita com a biblioteca Finisher Header:
- 12 partículas animadas
- Cores: roxo, laranja, azul e rosa
- Efeito de blur e transparência
- Responsivo

### Configuração do Finisher Header

```javascript
{
  count: 12,                    // Número de partículas
  size: { min: 1300, max: 1500, pulse: 0 },
  speed: { x: { min: 0.6, max: 3 }, y: { min: 0.6, max: 3 } },
  colors: {
    background: "#953eff",
    particles: ["#ff681c", "#87ddfe", "#231efe", "#ff0a53"]
  },
  blending: "lighten",
  opacity: { center: 0.6, edge: 0 },
  skew: -1,
  shapes: ["c"]               // "c" = círculos
}
```

## 🔄 Fluxo de Autenticação

1. Usuário acessa `/login` ou `/register`
2. Preenche o formulário
3. Dados são enviados para o backend
4. Backend retorna token e dados do usuário
5. Token e dados são salvos no `localStorage`
6. Usuário é redirecionado para `/dashboard`
7. Para logout, token e dados são removidos do `localStorage`

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run preview` - Visualiza o build de produção localmente
- `npm run lint` - Executa o linter

## 📝 Notas

- Certifique-se de que o backend está rodando antes de usar o frontend
- O token JWT é válido por 7 dias
- As senhas devem ter no mínimo 6 caracteres
- A aplicação é totalmente responsiva

## 🎨 Paleta de Cores

- Primária: `#953eff` (Roxo)
- Secundária: `#764ba2` (Roxo escuro)
- Partículas: `#ff681c`, `#87ddfe`, `#231efe`, `#ff0a53`

## 🚀 Próximos Passos

- Adicionar proteção de rotas com componente PrivateRoute
- Adicionar página de perfil do usuário
- Implementar funcionalidades de gerenciamento financeiro
- Adicionar dark mode

