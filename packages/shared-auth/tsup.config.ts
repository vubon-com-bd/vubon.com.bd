import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry points - barrel files + individual modules for granular imports
  entry: {
    // Root barrel
    index: 'src/index.ts',

    // Folder barrels
    'client/index': 'src/client/index.ts',
    'react/index': 'src/react/index.ts',
    'guards/index': 'src/guards/index.ts',

    // Client individual modules (for granular tree-shaking)
    'client/auth-client': 'src/client/auth.client.ts',
    'client/token-storage': 'src/client/token-storage.ts',
    'client/token-refresh': 'src/client/token-refresh.ts',
    'client/session-manager': 'src/client/session-manager.ts',
    'client/device-fingerprint': 'src/client/device-fingerprint.client.ts',
    'client/mfa-client': 'src/client/mfa.client.ts',
    'client/account-lock-client': 'src/client/account-lock.client.ts',
    'client/verification-client': 'src/client/verification.client.ts',
    'client/social-client': 'src/client/social.client.ts',

    // React individual modules
    'react/use-auth': 'src/react/useAuth.ts',
    'react/use-permission': 'src/react/usePermission.ts',
    'react/use-session': 'src/react/useSession.ts',
    'react/use-social-auth': 'src/react/useSocialAuth.ts',
    'react/use-mfa': 'src/react/useMFA.ts',
    'react/use-account-lock': 'src/react/useAccountLock.ts',
    'react/use-verification': 'src/react/useVerification.ts',
    'react/use-device-trust': 'src/react/useDeviceTrust.ts',
    'react/auth-context': 'src/react/AuthContext.tsx',
    'react/auth-provider': 'src/react/AuthProvider.tsx',

    // Guards individual modules
    'guards/require-auth': 'src/guards/RequireAuth.tsx',
    'guards/public-route': 'src/guards/PublicRoute.tsx',
    'guards/require-role': 'src/guards/RequireRole.tsx',
    'guards/require-permission': 'src/guards/RequirePermission.tsx',
    'guards/require-mfa': 'src/guards/RequireMFA.tsx',
    'guards/require-device-trust': 'src/guards/RequireDeviceTrust.tsx',
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
    'react',
    'react-dom',
    'jose',                    // was 'jwt-decode'
    'js-cookie',
    '@vubon/shared-api',       // was '@vubon/auth-api'
    '@vubon/auth-constants',
    '@vubon/shared-types',     // was '@vubon/auth-types'
    '@vubon/auth-schemas',
    '@vubon/shared-utils',     // was '@vubon/auth-utils'
    '@vubon/shared-config',    // was '@vubon/auth-config'
  ],

  // Platform - browser (React components run in browser)
  platform: 'browser',

  // Enable shims for compatibility
  shims: false,

  // Keep names intact for debugging
  keepNames: true,

  // Skip build if errors
  skipNodeModulesBundle: true,

  // No need to bundle node modules
  noExternal: [],

  // Environment variables
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
    console.log('✅ @vubon/shared-auth build complete!');
    console.log('📦 Output: dist/');
    console.log('📝 Formats: CommonJS + ESM');
    console.log('🔷 Types: .d.ts files generated');
    console.log('🔗 External dependencies: react, react-dom, jose, js-cookie');
    console.log('📁 Total entry points: 25 (4 barrels + 21 individual modules)');
  },
});
