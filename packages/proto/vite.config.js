import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        login: 'login.html',
        'one-piece-main': 'one-piece/main.html',
        'one-piece-higher-lower': 'one-piece/higher-lower.html',
        'one-piece-value-guess': 'one-piece/value-guess.html',
        'pokemon-main': 'pokemon/main.html',
        'pokemon-higher-lower': 'pokemon/higher-lower.html',
        'pokemon-value-guess': 'pokemon/value-guess.html'
      }
    }
  }
});