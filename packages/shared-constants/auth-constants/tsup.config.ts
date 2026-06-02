import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry points - all constants files (including env.constants)
  entry: {
    index: 'src/index.ts',
    'auth.constants': 'src/auth.constants.ts',
    'env.constants': 'src/env.constants.ts',        // ✅ যোগ করা হলো
    'role.constants': 'src/role.constants.ts',
    'permission.constants': 'src/permission.constants.ts',
    'session.constants': 'src/session.constants.ts',
    'mfa.constants': 'src/mfa.constants.ts',
    'device.constants': 'src/device.constants.ts',
    'social.constants': 'src/social.constants.ts',
    'api.constants': 'src/api.constants.ts',
    'http-status.constants': 'src/http-status.constants.ts',
    'regex.constants': 'src/regex.constants.ts',
    'security.constants': 'src/security.constants.ts',
    'cache.constants': 'src/cache.constants.ts',
    'queue.constants': 'src/queue.constants.ts',
  },

  // Output formats - both CommonJS and ESM
  format: ['cjs', 'esm'],

  // Generate TypeScript declarations
  dts: true,

  // Clean output directory before build
  clean: true,

  // Generate source maps for debugging
  sourcemap: true,

  // Don't minify - constants should be readable
  minify: false,

  // Target modern JavaScript
  target: 'es2020',

  // Enable tree shaking to remove unused code
  treeshake: true,

  // Output directory
  outDir: 'dist',

  // Split chunks? No - each file independent
  splitting: false,

  // Bundle all dependencies? No - no external dependencies
  bundle: false,

  // No external dependencies (pure constants)
  external: [],

  // Platform - neutral (works in Node.js and browser)
  platform: 'neutral',

  // Enable shims for compatibility
  shims: false,

  // Keep names intact
  keepNames: true,

  // Skip build if errors
  skipNodeModulesBundle: true,

  // Enable onSuccess hook for logging
  onSuccess: async () => {
    console.log('✅ Build complete!');
    console.log('📦 Output: dist/');
    console.log('📝 Formats: CommonJS + ESM');
    console.log('🔷 Types: .d.ts files generated');
  },

  // Environment variables (none needed for constants)
  define: {},

  // No replacement needed
  replace: {},

  // No esbuild plugins needed
  esbuildPlugins: [],

  // No metadata
  metafile: false,

  // No watch in production
  watch: false,

  // No legacy output
  legacyOutput: false,
});
