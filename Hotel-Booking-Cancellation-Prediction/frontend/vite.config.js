import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The dev server is pinned to port 5173 because the FastAPI CORS settings in
// backend/app.py allow exactly that origin. If you change the port here,
// update `allowed_origins` in backend/app.py (or set CORS_ORIGINS) as well.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 4173,
  },
});
