import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry points - all constants files (including env.constants)
  entry: {
  // ===== Core Entry Point =====
  index: 'src/index.ts',

  // ===== API & HTTP =====
  'api.constants': 'src/api.constants.ts',
  'http-status.constants': 'src/http-status.constants.ts',

  // ===== Auth & Identity =====
  'auth.constants': 'src/auth.constants.ts',
  'session.constants': 'src/session.constants.ts',
  'mfa.constants': 'src/mfa.constants.ts',
  'mfa-generator.constants': 'src/mfa-generator.constants.ts',
  'social.constants': 'src/social.constants.ts',
  'token-generator.constants': 'src/token-generator.constants.ts',

  // ===== User & Device =====
  'user.constants': 'src/user.constants.ts',
  'device.constants': 'src/device.constants.ts',
  'device-patterns.constants': 'src/device-patterns.constants.ts',
  'user-agent.constants': 'src/user-agent.constants.ts',

  // ===== Password =====
  'password-hasher.constants': 'src/password-hasher.constants.ts',
  'password-history.constants': 'src/password-history.constants.ts',
  'password-patterns.constants': 'src/password-patterns.constants.ts',
  'password-reset.constants': 'src/password-reset.constants.ts',
  'reset-method.constants': 'src/reset-method.constants.ts',

  // ===== Permission & Role =====
  'permission.constants': 'src/permission.constants.ts',
  'role.constants': 'src/role.constants.ts',

  // ===== Audit & Lock =====
  'audit.constants': 'src/audit.constants.ts',
  'lock.constants': 'src/lock.constants.ts',

  // ===== Cache & Queue =====
  'cache.constants': 'src/cache.constants.ts',
  'queue.constants': 'src/queue.constants.ts',

  // ===== Notification & Email =====
  'notification.constants': 'src/notification.constants.ts',
  'email-verification.constants': 'src/email-verification.constants.ts',

  // ===== Security & Regex =====
  'security.constants': 'src/security.constants.ts',
  'regex.constants': 'src/regex.constants.ts',

  // ===== ID Patterns =====
  'id-patterns.constants': 'src/id-patterns.constants.ts',

  // ===== Risk & Transaction =====
  'risk-thresholds.constants': 'src/risk-thresholds.constants.ts',
  'transaction-manager.constants': 'src/transaction-manager.constants.ts',

  // ===== Pagination =====
  'pagination.constants': 'src/pagination.constants.ts',

  // ===== Validation Messages =====
  'validation-messages.constants': 'src/validation-messages.constants.ts',

  // ===== Environment (CRITICAL: Must be included) =====
  'env.constants': 'src/env.constants.ts',
  }

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

  // No esbuild plugins needed
  esbuildPlugins: [],

  // No metadata
  metafile: false,

  // No watch in production
  watch: false,

  // No legacy output
  legacyOutput: false,
});
