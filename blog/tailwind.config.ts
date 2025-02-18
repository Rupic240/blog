/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
		fontFamily: {
			mono: ['JetBrains Mono', 'monospace'],
		},
  		keyframes: {
  			bouncing: {
  				'0%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-28px)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
  			fade_out: {
  				to: {
  					opacity: 0
  				}
  			},
  			fade_in: {
  				from: {
  					opacity: 0
  				},
  				to: {
  					opacity: 1
  				}
  			},
  			tranX_in: {
  				from: {
  					transform: 'translateX(350px)'
  				},
  				to: {
  					transform: 'translateX(0)'
  				}
  			},
  			tranX_out: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(1000px)'
  				}
  			},
  		},
  		animation: {
  			bouncing: 'bouncing 2.5s linear infinite',
  			fade_out: 'fade_out .5s ease forwards',
  			fade_in: 'fade_in .5s ease forwards',
  			tranX_in: 'tranX_in .5s ease forwards',
  			tranX_out: 'tranX_out .5s ease forwards'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}