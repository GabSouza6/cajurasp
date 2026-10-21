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

Base das Issues 02 e 03 implementada: frontend React com Vite e Tailwind, API Express e TypeScript, organizados em npm workspaces. A tela inicial consulta `GET /api/health` e mostra carregamento, sucesso ou falha com opção de tentar novamente. ESLint, Vitest, Supertest e GitHub Actions estão configurados.

Banco, autenticação e funcionalidades de negócio ainda serão implementados.

As imagens em `design/` são referências visuais provisórias e ainda não foram aprovadas.

## Executar localmente

Requisitos: Node.js 22.18 ou superior e npm 10 ou superior. A base foi verificada com Node.js 22.18.0 e npm 10.9.3.

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
| `npm run lint` | Verifica problemas estáticos nos dois projetos |
| `npm run typecheck` | Verifica os tipos dos dois projetos, incluindo os testes |
| `npm run test` | Executa os testes uma vez e encerra |
| `npm run test:watch -w frontend` | Executa os testes do frontend em modo de observação |
| `npm run test:watch -w backend` | Executa os testes do backend em modo de observação |
| `npm run build` | Verifica os tipos e gera `frontend/dist` e `backend/dist` |
| `npm run check` | Executa lint, tipos, testes e build em sequência |
| `npm start` | Executa a API compilada, após o build |
| `npm run preview -w frontend` | Prévia local dos arquivos compilados do frontend |

`npm start` executa somente a API. A prévia do Vite não configura o proxy de desenvolvimento; para validar a conexão entre os projetos, use `npm run dev`. A hospedagem integrada do frontend e da API será preparada na etapa de publicação.

## Verificações e CI

O comando `npm run check` executa as verificações nesta ordem:

1. `npm run lint`: ESLint no frontend e no backend, com suporte a TypeScript e regras de hooks do React.
2. `npm run typecheck`: verificação de tipos sem gerar arquivos, incluindo os testes.
3. `npm run test`: Vitest uma vez em cada workspace. O frontend usa jsdom e React Testing Library; o backend usa Supertest.
4. `npm run build`: compila o backend e gera o build do frontend.

A execução para na primeira etapa que falhar. Os testes cobrem a rota `GET /api/health` e os estados de carregamento, sucesso e falha da página inicial. Eles não iniciam servidores manualmente e não acessam banco, internet ou Supabase.

O workflow `.github/workflows/ci.yml` roda em pushes para `main` e também pode ser iniciado manualmente. Ele instala as dependências com `npm ci`, usa Node.js 22.18.0 e executa `npm run check` com permissão somente de leitura (`contents: read`). O workflow não usa arquivos `.env`, credenciais ou dados de produção e não faz deploy.

O CI verifica o código depois do push. Por isso, execute `npm run check` localmente antes de enviar alterações. Para acompanhar no GitHub, abra a aba **Actions** do repositório, selecione o workflow **CI** e a execução correspondente ao commit; os detalhes mostram o resultado de cada etapa.

## Dependências e arquivos gerados

Há um único `package-lock.json`, na raiz. Instale as dependências pela raiz com `npm ci`; para adicionar um pacote, use `npm install <pacote> -w frontend` ou `npm install <pacote> -w backend`.

O `node_modules/` da raiz reúne as dependências compartilhadas. O Vite também cria `frontend/node_modules/.vite` e `.vite-temp` para cache e arquivos temporários; essa segunda pasta não significa uma instalação duplicada. O npm pode criar dependências locais quando versões diferentes forem necessárias.

Pastas `node_modules/`, `dist/` e arquivos `.env` são ignorados pelo Git. Os exemplos `.env.example` e o lockfile fazem parte do projeto. Cancelar alterações de código pode deixar caches e builds antigos no disco; eles não substituem os arquivos-fonte.

## Fluxo de desenvolvimento

Uma issue por vez, diretamente na `main`, com commits pequenos seguindo Conventional Commits. Antes de cada push, execute `npm run check`; o CI repete as verificações após o envio para `main`.
