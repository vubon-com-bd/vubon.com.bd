import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry points - barrel files + individual hooks for granular imports
  entry: {
    // Root barrel
    index: 'src/index.ts',
    
    // Folder barrels
    'auth/index': 'src/auth/index.ts',
    'user/index': 'src/user/index.ts',
    'session/index': 'src/session/index.ts',
    'mfa/index': 'src/mfa/index.ts',
    'device/index': 'src/device/index.ts',
    'verification/index': 'src/verification/index.ts',
    
    // Individual auth hooks (for granular tree-shaking)
    'auth/use-login': 'src/auth/useLogin.ts',
    'auth/use-register': 'src/auth/useRegister.ts',
    'auth/use-logout': 'src/auth/useLogout.ts',
    'auth/use-refresh-token': 'src/auth/useRefreshToken.ts',
    'auth/use-social-login': 'src/auth/useSocialLogin.ts',
    'auth/use-social-callback': 'src/auth/useSocialCallback.ts',
    'auth/use-link-social': 'src/auth/useLinkSocial.ts',
    'auth/use-unlink-social': 'src/auth/useUnlinkSocial.ts',
    'auth/use-forgot-password': 'src/auth/useForgotPassword.ts',
    'auth/use-reset-password': 'src/auth/useResetPassword.ts',
    'auth/use-verify-email': 'src/auth/useVerifyEmail.ts',
    'auth/use-resend-verification': 'src/auth/useResendVerification.ts',
    
    // Individual user hooks
    'user/use-user': 'src/user/useUser.ts',
    'user/use-update-profile': 'src/user/useUpdateProfile.ts',
    'user/use-change-password': 'src/user/useChangePassword.ts',
    'user/use-update-settings': 'src/user/useUpdateSettings.ts',
    'user/use-delete-account': 'src/user/useDeleteAccount.ts',
    
    // Individual session hooks
    'session/use-sessions': 'src/session/useSessions.ts',
    'session/use-revoke-session': 'src/session/useRevokeSession.ts',
    'session/use-revoke-all-sessions': 'src/session/useRevokeAllSessions.ts',
    
    // Individual MFA hooks
    'mfa/use-mfa': 'src/mfa/useMFA.ts',
    'mfa/use-enable-mfa': 'src/mfa/useEnableMFA.ts',
    'mfa/use-disable-mfa': 'src/mfa/useDisableMFA.ts',
    'mfa/use-verify-mfa': 'src/mfa/useVerifyMFA.ts',
    'mfa/use-recovery-codes': 'src/mfa/useRecoveryCodes.ts',
    
    // Individual device hooks
    'device/use-devices': 'src/device/useDevices.ts',
    'device/use-trust-device': 'src/device/useTrustDevice.ts',
    'device/use-revoke-device': 'src/device/useRevokeDevice.ts',
    
    // Individual verification hooks
    'verification/use-email-verification': 'src/verification/useEmailVerification.ts',
    'verification/use-phone-verification': 'src/verification/usePhoneVerification.ts',
    'verification/use-password-reset': 'src/verification/usePasswordReset.ts',
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
    '@tanstack/react-query',
    '@vubon/shared-api',
    '@vubon/shared-auth',
    '@vubon/auth-constants',
    '@vubon/shared-types',
    '@vubon/auth-schemas',
    '@vubon/shared-utils',
    '@vubon/shared-config',
  ],

  // Platform - browser (React hooks run in browser)
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
    console.log('✅ @vubon/auth-hooks build complete!');
    console.log('📦 Output: dist/');
    console.log('📝 Formats: CommonJS + ESM');
    console.log('🔷 Types: .d.ts files generated');
    console.log('🔗 External dependencies: react, @tanstack/react-query');
    console.log('📁 Total entry points: 34 (7 barrels + 27 individual hooks)');
  },
});
