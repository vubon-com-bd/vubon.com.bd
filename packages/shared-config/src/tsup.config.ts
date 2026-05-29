import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry points - barrel files + individual configs for granular imports
  entry: {
    // Root barrel
    index: 'src/index.ts',
    
    // Folder barrels
    'env/index': 'src/env/index.ts',
    'oauth/index': 'src/oauth/index.ts',
    'seo/index': 'src/seo/index.ts',
    'security/index': 'src/security/index.ts',
    
    // Individual configs (for granular tree-shaking)
    // Env
    'env/schema': 'src/env/env.schema.ts',
    'env/validation': 'src/env/env.validation.ts',
    
    // OAuth
    'oauth/google': 'src/oauth/google.config.ts',
    'oauth/facebook': 'src/oauth/facebook.config.ts',
    'oauth/github': 'src/oauth/github.config.ts',
    'oauth/apple': 'src/oauth/apple.config.ts',
    'oauth/linkedin': 'src/oauth/linkedin.config.ts',
    
    // SEO
    'seo/seo': 'src/seo/seo.config.ts',
    'seo/robots': 'src/seo/robots.config.ts',
    'seo/sitemap': 'src/seo/sitemap.config.ts',
    
    // Security
    'security/cors': 'src/security/cors.config.ts',
    'security/rate-limit': 'src/security/rate-limit.config.ts',
    'security/helmet': 'src/security/helmet.config.ts',
  },
  
  // Output formats - both CommonJS and ESM
  format: ['cjs', 'esm'],
  
  // Generate TypeScript declarations
  dts: true,
  
  // Clean output directory before build
  clean: true,
  
  // Generate source maps for debugging
  sourcemap: true,
  
  // Don't minify - configs should be readable
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
    'dotenv',
    'dotenv-expand',
    'zod',
    // Peer dependencies
    '@vubon/auth-constants',
    '@vubon/shared-types',
    '@vubon/auth-schemas',
    '@vubon/shared-utils',
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
  
  // Environment variables (none needed for config)
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
    console.log('✅ @vubon/shared-config build complete!');
    console.log('📦 Output: dist/');
    console.log('📝 Formats: CommonJS + ESM');
    console.log('🔷 Types: .d.ts files generated');
    console.log('🔗 External dependencies: dotenv, dotenv-expand, zod');
    console.log('📁 Total entry points: 19 (5 barrels + 14 individual configs)');
  },
});
