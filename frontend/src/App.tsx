import { useEffect, useState } from 'react';

export function App() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    let active = true;
    setStatus('loading');

    async function checkConnection() {
      try {
        const response = await fetch('/api/health', { signal: controller.signal });
        if (!response.ok) throw new Error('Falha na conexão');
        const data: unknown = await response.json();
        if (
          typeof data !== 'object' || data === null ||
          !('status' in data) || data.status !== 'ok'
        ) throw new Error('Resposta inesperada');
        if (active) setStatus('ready');
      } catch {
        if (active) setStatus('error');
      } finally {
        clearTimeout(timeout);
      }
    }

    void checkConnection();
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-900">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Cajurasp</p>
        <h1 className="mt-3 text-3xl font-bold">Controle de raspadinhas</h1>
        <p className="mt-4 text-slate-600">Estamos preparando o sistema para acompanhar estoque, vendedores e vendas.</p>
        <p role="status" className="mt-8 rounded-lg bg-slate-100 p-4">
          {status === 'loading' && 'Verificando conexão…'}
          {status === 'ready' && 'Conexão estabelecida. Sistema em desenvolvimento.'}
          {status === 'error' && 'Não foi possível conectar ao servidor. Tente novamente.'}
        </p>
        {status === 'error' && (
          <button
            type="button"
            onClick={() => setAttempt(value => value + 1)}
            className="mt-4 rounded-lg bg-green-700 px-4 py-2 font-medium text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            Tentar novamente
          </button>
        )}
      </section>
    </main>
  );
}
