import { app } from './app.js';

const port = Number(process.env.PORT ?? 3001);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT deve ser um inteiro entre 1 e 65535.');
}

const server = app.listen(port, () => {
  console.log(`API Cajurasp disponível em http://localhost:${port}`);
});

server.on('error', (error) => {
  console.error('Não foi possível iniciar a API:', error.message);
  process.exitCode = 1;
});
