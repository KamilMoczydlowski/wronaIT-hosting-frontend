// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';
import { primeVuePassThrough } from './primevue';

export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },

	css: ['~/assets/styles/tailwind.css', '~/assets/styles/main.scss'],

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "~/assets/styles/_variables.scss" as *;',
				},
			},
		},
	},

	modules: [
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxt/scripts',
		'@primevue/nuxt-module',
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
	],

	image: {
		dir: 'assets/images',
	},

	primevue: {
		options: {
			theme: {
				preset: Aura,
			},
			pt: primeVuePassThrough,
		},
		components: {
			exclude: ['Form', 'FormField'],
		},
	},
	fonts: {
		families: [
			{
				name: 'Montserrat',
				provider: 'google',
			},
		],
	},

	runtimeConfig: {
		apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
		public: {
			strapiLocalUrl: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
		},
	},
});
