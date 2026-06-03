import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'auth/index': 'src/auth/index.ts',
    'role/index': 'src/role/index.ts',
    'session/index': 'src/session/index.ts',
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
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false,
  target: 'es2022',
  treeshake: true,
  outDir: 'dist',
  splitting: false,
  bundle: false,
  external: ['zod'],
  platform: 'neutral',
  shims: false,
  keepNames: true,
  skipNodeModulesBundle: true,
  noExternal: [],
  define: {},
  replace: {},
  esbuildPlugins: [],
  metafile: false,
  watch: false,
  legacyOutput: false,
  onSuccess: async () => {
    console.log('✅ @vubon/shared-schemas build complete!');
    console.log('📦 Output: dist/');
    console.log('📝 Formats: CommonJS + ESM');
    console.log('🔷 Types: .d.ts files generated');
  },
});
