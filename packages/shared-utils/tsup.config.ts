import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry points - barrel files + individual utilities for granular imports
  entry: {
    // Root barrel
    index: 'src/index.ts',
    
    // Folder barrels
    'crypto/index': 'src/crypto/index.ts',
    'validation/index': 'src/validation/index.ts',
    'formatter/index': 'src/formatter/index.ts',
    'device/index': 'src/device/index.ts',
    'token/index': 'src/token/index.ts',
    
    // Individual utilities (for granular tree-shaking)
    // Crypto
    'crypto/hash.util': 'src/crypto/hash.util.ts',
    'crypto/encrypt.util': 'src/crypto/encrypt.util.ts',
    'crypto/random.util': 'src/crypto/random.util.ts',
    
    // Validation
    'validation/email.util': 'src/validation/email.util.ts',
    'validation/phone.util': 'src/validation/phone.util.ts',
    'validation/sanitize.util': 'src/validation/sanitize.util.ts',
    'validation/validator.util': 'src/validation/validator.util.ts',
    
    // Formatter
    'formatter/date.util': 'src/formatter/date.util.ts',
    'formatter/currency.util': 'src/formatter/currency.util.ts',
    'formatter/string.util': 'src/formatter/string.util.ts',
    'formatter/number.util': 'src/formatter/number.util.ts',
    
    // Device
    'device/fingerprint.util': 'src/device/fingerprint.util.ts',
    'device/user-agent.util': 'src/device/user-agent.util.ts',
    'device/ip.util': 'src/device/ip.util.ts',

    // Async utilities
'async/sleep.util': 'src/async/sleep.util.ts',

// Environment utilities
'env/env.util': 'src/env/env.util.ts',

// Logger utilities
'logger/logger.util': 'src/logger/logger.util.ts',

    
    // Token
    'token/jwt.util': 'src/token/jwt.util.ts',
    'token/refresh-token.util': 'src/token/refresh-token.util.ts',
  },
  
  // Output formats - both CommonJS and ESM
  format: ['cjs', 'esm'],
  
  // Generate TypeScript declarations
  dts: true,
  
  // Clean output directory before build
  clean: true,
  
  // Generate source maps for debugging
  sourcemap: true,
  
  // Don't minify - utilities should be readable for debugging
  minify: false,
  
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
    'bcryptjs',
    'date-fns',
    'jose',
    'libphonenumber-js',
    'ua-parser-js',
    'validator',
    // Peer dependencies
    '@vubon/auth-constants',
  ],
  
  // Platform - neutral (works in Node.js)
  platform: 'node',
  
  // Enable shims for compatibility
  shims: false,
  
  // Keep names intact
  keepNames: true,
  
  // Skip build if errors
  skipNodeModulesBundle: true,
  
  // No need to bundle node modules
  noExternal: [],
  
  // Environment variables (none needed for utils)
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
    console.log('✅ @vubon/shared-utils build complete!');
    console.log('📦 Output: dist/');
    console.log('📝 Formats: CommonJS + ESM');
    console.log('🔷 Types: .d.ts files generated');
    console.log('🔗 External dependencies: bcryptjs, date-fns, jose, libphonenumber-js, ua-parser-js, validator');
    console.log('📁 Total entry points: 22 (6 barrels + 16 individual utils)');
  },
});
