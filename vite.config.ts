import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-chat-mock',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/chat' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                reply: "Elsa AI (Standalone Mock): I'm running in your dedicated Terminal app! Set up GROQ_API_KEY for live responses."
              }));
            });
            return;
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    open: true
  }
});
