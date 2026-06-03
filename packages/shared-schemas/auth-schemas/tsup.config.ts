import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry points - all barrel files + individual schemas for granular imports
  entry: {
    index: 'src/index.ts',
    'auth/index': 'src/auth/index.ts',
    'role/index': 'src/role/index.ts',
    'session/index': 'src/session/index.ts',
    // Individual schema exports for granular imports (tree-shaking friendly)
    'auth/user.schema': 'src/auth/user.schema.ts',
    'auth/login.schema': 'src/auth/login.schema.ts',
    'auth/register.schema': 'src/auth/register.schema.ts',
    'auth/mfa.schema': 'src/auth/mfa.schema.ts',
    'auth/verification.schema': 'src/auth/verification.schema.ts',
    'auth/password-reset.schema': 'src/auth/password-reset.schema.ts',
    'auth/social.schema': 'src/auth/social.schema.ts',
    'role/role.schema': 'src/role/role.schema.ts',
    'role/permission.schema': 'src/role/permission.schema.ts',
    'session/session.schema': 'src/session/session.schema.ts',
    'session/device.schema': 'src/session/device.schema.ts',
  },
  
  // Output formats - both CommonJS and ESM
  format: ['cjs', 'esm'],
  
  // Generate TypeScript declarations
  dts: true,
  
  // Clean output directory before build
  clean: true,
  
  // Generate source maps for debugging
  sourcemap: true,
  
  // Don't minify - schemas should be readable for debugging
  minify: false,
  
  // Target modern JavaScript
  target: 'es2022',
  
  // Enable tree shaking to remove unused code
  treeshake: true,
  
  // Output directory
  outDir: 'dist',
  
  // Split chunks? No - each file independent
  splitting: false,
  
  // Bundle dependencies? No - peer dependencies should be external
  bundle: false,
  
  // External dependencies (peer dependencies)
  external: [
    'zod',
    '@vubon/shared-constants',
    '@vubon/shared-types',
  ],
  
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
  
  // Environment variables (none needed for schemas)
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
    console.log('✅ @vubon/shared-schemas build complete!');
    console.log('📦 Output: dist/');
    console.log('📝 Formats: CommonJS + ESM');
    console.log('🔷 Types: .d.ts files generated');
    console.log('🔗 External dependencies: zod, @vubon/shared-constants, @vubon/shared-types');
  },
});
