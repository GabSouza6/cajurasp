# Cajurasp

Sistema pessoal para duas pessoas controlarem a distribuição e as vendas de raspadinhas, substituindo o controle em papel. Ambas terão acesso aos mesmos dados.

## Exemplo principal

Um vendedor possui 50 raspadinhas. Ao informar que sobraram 20, o sistema registra 30 vendidas e atualiza o saldo para 20, preservando o histórico.

## Stack planejada

- Frontend: React + TypeScript + Vite + Tailwind CSS.
- Backend: Node.js + TypeScript + Express.
- Banco: PostgreSQL hospedado no Supabase.
- Autenticação: Supabase Auth.
- Acesso ao banco e migrações: Prisma no backend.
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

Projeto em preparação. Existem apenas as referências visuais e a documentação inicial. As funcionalidades e a stack descritas ainda serão implementadas.

As imagens em `design/` são referências visuais provisórias e ainda não foram aprovadas.

## Fluxo de desenvolvimento

Uma issue por vez, diretamente na `main`, com commits pequenos seguindo Conventional Commits. As verificações automatizadas serão adicionadas nas próximas tarefas.
