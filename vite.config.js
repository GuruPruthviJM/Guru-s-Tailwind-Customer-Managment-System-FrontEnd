import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Map the CSS import to the actual file location in node_modules
      "react-leaflet-markercluster/dist/styles.min.css":
        "/node_modules/react-leaflet-markercluster/dist/styles.min.css",
    },
  },
})
