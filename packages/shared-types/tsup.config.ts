import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry points - all barrel files
  entry: {
  index: 'src/index.ts',
  'auth/index': 'src/auth/index.ts',
  'common/index': 'src/common/index.ts',
  
  // Auth individual type files
  'auth/user.types': 'src/auth/user.types.ts',
  'auth/session.types': 'src/auth/session.types.ts',
  'auth/mfa.types': 'src/auth/mfa.types.ts',
  'auth/role.types': 'src/auth/role.types.ts',
  'auth/permission.types': 'src/auth/permission.types.ts',
  'auth/token.types': 'src/auth/token.types.ts',
  'auth/device.types': 'src/auth/device.types.ts',
  'auth/social.types': 'src/auth/social.types.ts',
  'auth/verification.types': 'src/auth/verification.types.ts',
  'auth/account-lock.types': 'src/auth/account-lock.types.ts',
  'auth/login-attempt.types': 'src/auth/login-attempt.types.ts',
  'auth/reset-method.types': 'src/auth/reset-method.types.ts',        
  
  // Common individual type files
  'common/api.types': 'src/common/api.types.ts',
  'common/pagination.types': 'src/common/pagination.types.ts',
  'common/audit.types': 'src/common/audit.types.ts',
  'common/location.types': 'src/common/location.types.ts',
  'common/seo.types': 'src/common/seo.types.ts',
  'common/rate-limit.types': 'src/common/rate-limit.types.ts',       
  'common/cache.types': 'src/common/cache.types.ts',                 
  'common/notification.types': 'src/common/notification.types.ts',    
  'common/mfa-generator.types': 'src/common/mfa-generator.types.ts',  
  'common/password-hasher.types': 'src/common/password-hasher.types.ts', 
  'common/token-generator.types': 'src/common/token-generator.types.ts', 
  'common/transaction-manager.types': 'src/common/transaction-manager.types.ts', 
  'common/value-object.types': 'src/common/value-object.types.ts',    
  'common/domain-event.types': 'src/common/domain-event.types.ts',   
  'common/event.types': 'src/common/event.types.ts',                
  'common/client-info.types': 'src/common/client-info.types.ts',      
}
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
  external: ['@vubon/shared-constants'],

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
