import daisyui from 'daisyui'

import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            keyframes: {
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
            },
            animation: {
                blink: 'blink 1s infinite',
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: ['light', 'dark', 'dracula', 'forest', 'halloween', 'sunset', 'dim'],
    },
}
export default config
