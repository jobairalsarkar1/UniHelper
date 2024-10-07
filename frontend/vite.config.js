import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      external: ["@fortawesome/free-solid-svg-icons"],
    },
  },
});

// server: {
//   host: "0.0.0.0",
//   port: 5173,
//   proxy: {
//     "/api": "http://localhost:5000",
//   },
// },
