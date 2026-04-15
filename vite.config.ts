import type { Connect, Plugin } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

function liveDashboardMiddleware(): Connect.NextHandleFunction {
  return async (req, res, next) => {
    const request = req as { method?: string; url?: string };

    if (request.method !== 'GET' || request.url !== '/api/live-dashboard') {
      next();
      return;
    }

    try {
      const { getLiveDashboardSnapshot } = await import('./server/liveDashboardProxy');
      const payload = await getLiveDashboardSnapshot();
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(payload));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(
        JSON.stringify({
          error: error instanceof Error ? error.message : 'Unknown live dashboard proxy error',
        }),
      );
    }
  };
}

function liveDashboardPlugin(): Plugin {
  return {
    name: 'live-dashboard-proxy',
    configureServer(server) {
      server.middlewares.use(liveDashboardMiddleware());
    },
    configurePreviewServer(server) {
      server.middlewares.use(liveDashboardMiddleware());
    },
  };
}

export default defineConfig({
  plugins: [react(), liveDashboardPlugin()],
  server: {
    host: '127.0.0.1',
  },
  preview: {
    host: '127.0.0.1',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
  },
});
