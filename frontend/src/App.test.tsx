import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';

function mockHealthResponse() {
  return {
    ok: true,
    json: async () => ({ status: 'ok', service: 'cajurasp-api' }),
  };
}

describe('App', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('mostra o estado de carregamento enquanto consulta a API', () => {
    const pendingRequest = new Promise<Response>(() => {});
    vi.stubGlobal('fetch', vi.fn(() => pendingRequest));

    render(<App />);

    expect(screen.getByRole('status')).toHaveTextContent('Verificando conexão');
  });

  it('mostra a conexão estabelecida quando a API responde com sucesso', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockHealthResponse()));

    render(<App />);

    expect(await screen.findByText(/Conexão estabelecida/)).toBeInTheDocument();
  });

  it('mostra falha quando a API responde com erro HTTP', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({}),
      }),
    );

    render(<App />);

    expect(await screen.findByText(/Não foi possível conectar/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tentar novamente' })).toBeInTheDocument();
  });

  it('mostra falha quando o backend está indisponível', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Backend indisponível')));

    render(<App />);

    expect(await screen.findByText(/Não foi possível conectar/)).toBeInTheDocument();
  });
});
