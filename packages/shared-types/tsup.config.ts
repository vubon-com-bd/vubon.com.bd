import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry points - all barrel files
  entry: {
    index: 'src/index.ts',
    'auth/index': 'src/auth/index.ts',
    'common/index': 'src/common/index.ts',
  },

  // Output formats - both CommonJS and ESM
  format: ['cjs', 'esm'],

  // Generate TypeScript declarations
  dts: true,

  // Clean output directory before build
  clean: true,

  // Generate source maps for debugging
  sourcemap: true,

  // Don't minify - types should be readable
  minify: false,

  // Target modern JavaScript
  target: 'es2020',

  // Enable tree shaking to remove unused code
  treeshake: true,

  // Output directory
  outDir: 'dist',

  // Split chunks? No - each file independent
  splitting: false,

  // Bundle all dependencies? No - peer dependencies external
  bundle: false,

  // External dependencies (peer dependencies)
  external: ['@vubon/auth-constants'],

  // Platform - neutral (works in Node.js and browser)
  platform: 'neutral',

  // Enable shims for compatibility
  shims: false,

  // Keep names intact
  keepNames: true,

  // Skip build if errors
  skipNodeModulesBundle: true,

  // No need to bundle node modules
  noExternal: [],

  // Environment variables (none needed for types)
  define: {},

  // No replacement needed
  replace: {},

  // No esbuild plugins needed
  esbuildPlugins: [],

  // No metadata
  metafile: false,

  // No watch in production (use dev script)
  watch: false,

  // No legacy output
  legacyOutput: false,

  // Enable onSuccess hook for logging
  onSuccess: async () => {
    console.log('✅ @vubon/shared-types build complete!');
    console.log('📦 Output: dist/');
    console.log('📝 Formats: CommonJS + ESM');
    console.log('🔷 Types: .d.ts files generated');
    console.log('🔗 External: @vubon/shared-constants (type-only)');
  },
});
