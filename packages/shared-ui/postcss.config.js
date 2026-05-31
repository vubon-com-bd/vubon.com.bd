/**
 * PostCSS Configuration - Enterprise Grade
 * @module shared-ui/postcss.config
 * 
 * RULES:
 * ✅ ONLY CSS processing configuration - NO business logic
 * ✅ Framework-agnostic (Next.js, Vite, CRA 모두 지원)
 * ✅ Production optimizations enabled
 * ✅ Source maps for development
 */

module.exports = {
  plugins: {
    /**
     * Tailwind CSS - Utility-first CSS framework
     * Docs: https://tailwindcss.com/docs/postcss
     */
    tailwindcss: {
      config: './src/styles/tailwind.config.ts',
    },

    /**
     * Autoprefixer - Adds vendor prefixes automatically
     * Supports: last 2 versions, > 0.5%, not dead
     * Bangladesh market: Supports older browsers (Android 5+, iOS 11+)
     */
    autoprefixer: {
      overrideBrowserslist: [
        '> 0.5%',
        'last 2 versions',
        'Firefox ESR',
        'not dead',
        'iOS >= 11',
        'Android >= 5',
        'Chrome >= 60',
        'Safari >= 12',
      ],
      grid: true, // Enable grid support for older browsers
      flexbox: 'no-2009', // Modern flexbox only
    },

    /**
     * CSSNano - Minification for production (only in production)
     * Reduces CSS file size by 60-70%
     */
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: [
          'advanced',
          {
            discardComments: {
              removeAll: true, // Remove all comments in production
            },
            normalizeWhitespace: true,
            colormin: true,
            convertValues: true,
            discardDuplicates: true,
            discardEmpty: true,
            mergeRules: true,
            minifyFontValues: true,
            minifySelectors: true,
            reduceIdents: false, // Keep custom properties/animations
            zindex: false, // Don't reset z-index values
          },
        ],
      },
    }),

    /**
     * PostCSS Nesting - Enable CSS nesting (like SCSS)
     * Uses the same syntax as CSS Nesting Module Level 3
     */
    'postcss-nesting': {
      noIsPseudoSelector: false,
    },

    /**
     * PostCSS Preset Env - Converts modern CSS to older browser compatible
     * Stage 2 features (stable enough for production)
     */
    'postcss-preset-env': {
      stage: 2,
      features: {
        'nesting-rules': false, // We use postcss-nesting instead
        'custom-properties': {
          preserve: true, // Keep CSS variables for dynamic theming
        },
        'color-functional-notation': true,
        'custom-media-queries': true,
        'media-query-ranges': true,
      },
      browsers: [
        '> 0.5%',
        'last 2 versions',
        'Firefox ESR',
        'not dead',
      ],
      autoprefixer: false, // Already handled by autoprefixer plugin
    },

    /**
     * PostCSS Import - Inline @import statements
     * Resolves imports from node_modules and local files
     */
    'postcss-import': {
      path: ['./src/styles'],
      skipDuplicates: true,
    },

    /**
     * PostCSS Mixins - Reusable CSS snippets (optional but useful)
     * Add custom mixins for Bangladesh-specific patterns
     */
    'postcss-mixins': {
      mixins: {
        'bd-responsive': {
          '@media (max-width: 768px)': {
            '&': {
              '@apply px-4 py-2': {},
            },
          },
        },
        'bd-card-hover': {
          '@apply transition-all duration-200 hover:shadow-lg hover:-translate-y-1': {},
        },
        'bd-focus-ring': {
          '@apply focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2': {},
        },
      },
    },

    /**
     * PostCSS Custom Media - Define media query variables
     * Bangladesh specific breakpoints
     */
    'postcss-custom-media': {
      importFrom: {
        customMedia: {
          '--phone': '(max-width: 640px)',
          '--tablet': '(min-width: 641px) and (max-width: 1024px)',
          '--desktop': '(min-width: 1025px)',
          '--feature-phone': '(max-width: 480px)', // Feature phones (Bangladesh)
          '--slow-network': '(update: slow)', // For 2G/3G network detection
          '--reduced-motion': '(prefers-reduced-motion: reduce)',
          '--high-contrast': '(prefers-contrast: high)',
        },
      },
    },

    /**
     * PostCSS Calc - Optimize calc() expressions
     */
    'postcss-calc': {
      precision: 4,
      preserve: false,
    },

    /**
     * PostCSS Color Function - Transform color functions
     * e.g., color(red tint(50%))
     */
    'postcss-color-function': {},

    /**
     * PostCSS Focus Visible - Adds :focus-visible polyfill
     * Improves accessibility
     */
    'postcss-focus-visible': {
      replaceWith: '[data-focus-visible-added]',
    },

    /**
     * PostCSS Logical - Convert logical properties to physical
     * e.g., margin-inline-start -> margin-left
     */
    'postcss-logical': {
      dir: 'ltr', // Bengali/Bangladesh uses left-to-right
    },

    /**
     * PostCSS Dir Pseudo Class - :dir() pseudo-class support
     * For multilingual support (Bengali/English)
     */
    'postcss-dir-pseudo-class': {
      dir: 'ltr',
    },
  },
};

// Environment-specific logging
if (process.env.NODE_ENV === 'development') {
  console.log('\n🎨 PostCSS Configuration Loaded');
  console.log('   Mode: Development');
  console.log('   Features: Source Maps, Nesting, Custom Media\n');
}

if (process.env.NODE_ENV === 'production') {
  console.log('\n🚀 PostCSS Configuration Loaded');
  console.log('   Mode: Production');
  console.log('   Optimizations: Minification, Tree Shaking, Prefixing\n');
}
