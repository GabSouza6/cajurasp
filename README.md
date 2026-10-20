# Cajurasp

Sistema pessoal para duas pessoas controlarem a distribuição e as vendas de raspadinhas, substituindo o controle em papel. Ambas terão acesso aos mesmos dados.

## Exemplo principal

Um vendedor possui 50 raspadinhas. Ao informar que sobraram 20, o sistema registra 30 vendidas e atualiza o saldo para 20, preservando o histórico.

## Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS.
- Backend: Node.js + TypeScript + Express.
- Banco previsto: PostgreSQL hospedado no Supabase.
- Autenticação prevista: Supabase Auth.
- Acesso ao banco e migrações previstos: Prisma no backend.
- Organização: `frontend/` e `backend/` com npm workspaces.

## Funcionalidades previstas

- Login, logout e recuperação de senha, sem cadastro público.
- Contas autorizadas com as mesmas permissões.
- Cadastro e edição de vendedores com nome e cidade.
- Lista com busca, filtro por cidade e saldo atual.
- Entrada no estoque por quantidade ou intervalo de séries.
- Entregas aos vendedores.
- Registro de vendas informando a quantidade restante.
- Devoluções ao estoque central.
- Transferências entre vendedores por quantidade.
- Correções de lançamentos preservando o histórico.
- Cards de estoque disponível, unidades com vendedores e total vendido.
- Interface responsiva e instalação como PWA.

## Regras principais

- Contar os dois extremos dos intervalos: 110001 a 110100 são 100 unidades.
- Impedir séries repetidas e intervalos sobrepostos.
- Permitir entradas sem séries, controlando apenas quantidades.
- Não rastrear individualmente as séries nas vendas.
- Entregas diminuem o estoque central e aumentam o saldo do vendedor.
- Devoluções fazem o caminho inverso, sem gerar vendas.
- Transferências alteram somente os saldos dos vendedores.
- Impedir quantidades inválidas, saldos negativos e operações acima do disponível.
- Evitar duplicação por clique repetido e inconsistências em operações simultâneas.
- Registrar data e conta responsável pelas movimentações.
- No MVP, consultar dados atualizados e salvar operações exige internet.

## Fora do MVP

- Gravação offline com sincronização.
- Controle financeiro e comissões.
- Diferentes níveis de permissão.
- Edições com reutilização de séries.
- Rastreamento individual de raspadinhas.

## Estado atual

Base da Issue 02 implementada: frontend React com Vite e Tailwind, API Express e TypeScript, organizados em npm workspaces. A tela inicial consulta `GET /api/health` e mostra carregamento, sucesso ou falha com opção de tentar novamente.

Banco, autenticação e funcionalidades de negócio ainda serão implementados. ESLint, Vitest, Supertest e CI ficam para a Issue 03.

As imagens em `design/` são referências visuais provisórias e ainda não foram aprovadas.

## Executar localmente

Requisitos: Node.js 22.12 ou superior e npm 10 ou superior. A base foi verificada com Node.js 22.18 e npm 10.9.

Na raiz do repositório:

```sh
npm ci
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:3001/api/health
- Resposta esperada: `{"status":"ok","service":"cajurasp-api"}`

O comando `dev` inicia os dois processos. Use Ctrl+C para encerrá-los. A porta do frontend é fixa: se estiver ocupada, encerre a execução anterior antes de iniciar outra.

Os valores padrão permitem iniciar sem arquivos `.env`. Para personalizar, copie `backend/.env.example` para `backend/.env` e `frontend/.env.example` para `frontend/.env`.

| Variável | Arquivo | Uso |
| --- | --- | --- |
| `PORT` | `backend/.env` | Porta da API, padrão `3001` |
| `API_PROXY_TARGET` | `frontend/.env` | Destino do proxy local, padrão `http://localhost:3001` |

Se alterar a porta da API, ajuste também o destino do proxy e reinicie os processos. O navegador consulta `/api/health` no mesmo endereço do frontend; o Vite encaminha `/api` ao Express durante o desenvolvimento. `API_PROXY_TARGET` é usada apenas na configuração do Vite. Nunca coloque credenciais em variáveis com prefixo `VITE_`, pois elas são expostas ao navegador.

## Comandos

Execute na raiz:

| Comando | Resultado |
| --- | --- |
| `npm run dev` | Inicia frontend e backend com recarga |
| `npm run dev -w frontend` | Inicia somente o frontend |
| `npm run dev -w backend` | Inicia somente a API |
| `npm run typecheck` | Verifica os tipos dos dois projetos |
| `npm run build` | Verifica os tipos e gera `frontend/dist` e `backend/dist` |
| `npm start` | Executa a API compilada, após o build |
| `npm run preview -w frontend` | Prévia local dos arquivos compilados do frontend |

`npm start` executa somente a API. A prévia do Vite não configura o proxy de desenvolvimento; para validar a conexão entre os projetos, use `npm run dev`. A hospedagem integrada do frontend e da API será preparada na etapa de publicação.

## Dependências e arquivos gerados

Há um único `package-lock.json`, na raiz. Instale as dependências pela raiz com `npm ci`; para adicionar um pacote, use `npm install <pacote> -w frontend` ou `npm install <pacote> -w backend`.

O `node_modules/` da raiz reúne as dependências compartilhadas. O Vite também cria `frontend/node_modules/.vite` e `.vite-temp` para cache e arquivos temporários; essa segunda pasta não significa uma instalação duplicada. O npm pode criar dependências locais quando versões diferentes forem necessárias.

Pastas `node_modules/`, `dist/` e arquivos `.env` são ignorados pelo Git. Os exemplos `.env.example` e o lockfile fazem parte do projeto. Cancelar alterações de código pode deixar caches e builds antigos no disco; eles não substituem os arquivos-fonte.

## Fluxo de desenvolvimento

Uma issue por vez, diretamente na `main`, com commits pequenos seguindo Conventional Commits. As verificações automatizadas serão adicionadas nas próximas tarefas.
