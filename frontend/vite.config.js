import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/': {
				target: 'http://103.74.93.28:3006',
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
