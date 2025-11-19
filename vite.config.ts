import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",   // ღია ყველა ქსელის მისამართზე
    port: 8080,   // პორტი 8080
  },
  plugins: [
    react(),                              // React SWC plugin
    mode === "development" && componentTagger()  // განვითარების რეჟიმში componentTagger
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // მოკლე გზა src-ის ფოლდერში
    },
  },
}));
