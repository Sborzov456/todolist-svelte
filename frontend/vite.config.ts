import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [svelte()],
    server: {
        host: "0.0.0.0",
        port: 5173,
        watch: {
            usePolling: true,
        },
        proxy: {
            "/api": {
                target: "http://backend:3001",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, "")
            },
        },
    },
    resolve: {
        alias: {
            "@shared": path.resolve(__dirname, "../shared"),
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
    },
});
