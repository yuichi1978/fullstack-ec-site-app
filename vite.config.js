import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        tailwindcss(), // 1番目：Tailwindの処理
        laravel({      // 2番目：Laravelの処理
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),       // 3番目：Reactの処理
    ],
});