import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry points - barrel files + individual modules for granular imports
  entry: {
    // Root barrel
    index: 'src/index.ts',
    
    // Folder barrels
    'client/index': 'src/client/index.ts',
    'endpoints/index': 'src/endpoints/index.ts',
    
    // Client individual modules (for granular tree-shaking)
    'client/axios': 'src/client/axios.client.ts',
    'client/fetch': 'src/client/fetch.client.ts',
    'client/interceptors': 'src/client/interceptors.ts',
    'client/rate-limit': 'src/client/rate-limit.client.ts',
    'client/retry': 'src/client/retry.client.ts',
    
    // Endpoints individual modules (for granular tree-shaking)
    'endpoints/auth': 'src/endpoints/auth.endpoints.ts',
    'endpoints/social': 'src/endpoints/social.endpoints.ts',
    'endpoints/user': 'src/endpoints/user.endpoints.ts',
    'endpoints/role': 'src/endpoints/role.endpoints.ts',
    'endpoints/permission': 'src/endpoints/permission.endpoints.ts',
    'endpoints/session': 'src/endpoints/session.endpoints.ts',
    'endpoints/mfa': 'src/endpoints/mfa.endpoints.ts',
    'endpoints/device': 'src/endpoints/device.endpoints.ts',
    'endpoints/verification': 'src/endpoints/verification.endpoints.ts',
    'endpoints/account-lock': 'src/endpoints/account-lock.endpoints.ts',
  },
  
  // Output formats - both CommonJS and ESM
  format: ['cjs', 'esm'],
  
  // Generate TypeScript declarations
  dts: true,
  
  // Clean output directory before build
  clean: true,
  
  // Generate source maps for debugging
  sourcemap: true,
  
  // Minify for production (smaller bundle size)
  minify: true,
  
  // Target modern JavaScript
  target: 'es2022',
  
  // Enable tree shaking to remove unused code
  treeshake: true,
  
  // Output directory
  outDir: 'dist',
  
  // Split chunks? No - each file independent
  splitting: false,
  
  // Bundle dependencies? No - dependencies should be external
  bundle: false,
  
  // External dependencies (peer dependencies)
  external: [
    'axios',
    'zod',
    // Peer dependencies
    '@vubon/auth-constants',
    '@vubon/shared-types',
    '@vubon/auth-schemas',
    '@vubon/shared-utils',
    '@vubon/shared-config',
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
  
  // Environment variables (none needed for API layer)
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  
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
    console.log('✅ @vubon/shared-api build complete!');
    console.log('📦 Output: dist/');
    console.log('📝 Formats: CommonJS + ESM');
    console.log('🔷 Types: .d.ts files generated');
    console.log('🔗 External dependencies: axios, zod');
    console.log('📁 Total entry points: 18 (3 barrels + 15 individual modules)');
  },
});
