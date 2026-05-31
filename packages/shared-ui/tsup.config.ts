import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry points - barrel files + individual components for granular imports
  entry: {
    // Root barrel
    index: 'src/index.ts',

    // Folder barrels
    'components/index': 'src/components/index.ts',
    'components/ui/index': 'src/components/ui/index.ts',
    'components/forms/index': 'src/components/forms/index.ts',
    'components/layout/index': 'src/components/layout/index.ts',
    'hooks/index': 'src/hooks/index.ts',

    // ============================================================
    // Individual UI Components (granular tree-shaking)
    // ============================================================
    'components/ui/Alert': 'src/components/ui/Alert.tsx',
    'components/ui/Avatar': 'src/components/ui/Avatar.tsx',
    'components/ui/Badge': 'src/components/ui/Badge.tsx',
    'components/ui/Breadcrumb': 'src/components/ui/Breadcrumb.tsx',
    'components/ui/Button': 'src/components/ui/Button.tsx',
    'components/ui/Card': 'src/components/ui/Card.tsx',
    'components/ui/Dropdown': 'src/components/ui/Dropdown.tsx',
    'components/ui/Input': 'src/components/ui/Input.tsx',
    'components/ui/Modal': 'src/components/ui/Modal.tsx',
    'components/ui/Pagination': 'src/components/ui/Pagination.tsx',
    'components/ui/Progress': 'src/components/ui/Progress.tsx',
    'components/ui/Select': 'src/components/ui/Select.tsx',
    'components/ui/Skeleton': 'src/components/ui/Skeleton.tsx',
    'components/ui/Spinner': 'src/components/ui/Spinner.tsx',
    'components/ui/Switch': 'src/components/ui/Switch.tsx',
    'components/ui/Table': 'src/components/ui/Table.tsx',
    'components/ui/Tabs': 'src/components/ui/Tabs.tsx',
    'components/ui/Toast': 'src/components/ui/Toast.tsx',
    'components/ui/Tooltip': 'src/components/ui/Tooltip.tsx',

    // ============================================================
    // Individual Form Components
    // ============================================================
    'components/forms/Form': 'src/components/forms/Form.tsx',
    'components/forms/FormCheckbox': 'src/components/forms/FormCheckbox.tsx',
    'components/forms/FormInput': 'src/components/forms/FormInput.tsx',
    'components/forms/FormSelect': 'src/components/forms/FormSelect.tsx',

    // ============================================================
    // Individual Layout Components
    // ============================================================
    'components/layout/Container': 'src/components/layout/Container.tsx',
    'components/layout/Grid': 'src/components/layout/Grid.tsx',
    'components/layout/Stack': 'src/components/layout/Stack.tsx',

    // ============================================================
    // Individual Hooks
    // ============================================================
    'hooks/useClickOutside': 'src/hooks/useClickOutside.ts',
    'hooks/useDebounce': 'src/hooks/useDebounce.ts',
    'hooks/useLocalStorage': 'src/hooks/useLocalStorage.ts',
    'hooks/useMediaQuery': 'src/hooks/useMediaQuery.ts',
    'hooks/useModal': 'src/hooks/useModal.ts',
    'hooks/useToast': 'src/hooks/useToast.ts',
    'hooks/useWindowSize': 'src/hooks/useWindowSize.ts',

    // ============================================================
    // Utils
    // ============================================================
    'utils/cn': 'src/utils/cn.ts',
  },

  // ============================================================
  // Output Configuration
  // ============================================================
  format: ['cjs', 'esm'],        // Dual format: CommonJS + ESM
  dts: true,                      // Generate TypeScript declarations (no separate tsc needed)
  clean: true,                   // Clean dist before build
  sourcemap: true,               // Source maps for debugging
  minify: false,                 // DON'T minify - UI library should be readable
  target: 'es2022',              // Modern JavaScript target
  treeshake: true,               // Remove unused code
  splitting: false,              // Each file independent
  bundle: false,                 // Keep dependencies external

  // ============================================================
  // External Dependencies (not bundled)
  // ============================================================
  external: [
    'react',
    'react-dom',
    'clsx',
    'tailwind-merge',
    'class-variance-authority',
    'framer-motion',
  ],

  // ============================================================
  // Platform & Compatibility
  // ============================================================
  platform: 'browser',           // UI components run in browser
  shims: false,                  // No extra shims needed
  keepNames: true,               // Preserve component names for debugging
  skipNodeModulesBundle: true,   // Don't bundle node_modules
  noExternal: [],                // Bundle nothing extra

  // ============================================================
  // Environment Variables
  // ============================================================
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },

  // ============================================================
  // Build Optimizations
  // ============================================================
  replace: {},
  esbuildPlugins: [],
  metafile: false,               // No metadata file
  watch: false,                  // No watch in production
  legacyOutput: false,

  // ============================================================
  // Next.js App Router Compatibility
  // Adds "use client" directive to all output files
  // ============================================================
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },

  // ============================================================
  // Build Completion Hook
  // ============================================================
  onSuccess: async () => {
    console.log('\n✅ @vubon/shared-ui build complete!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📦 Output: dist/');
    console.log('📝 Formats: CommonJS + ESM');
    console.log('🔷 Types: .d.ts files generated (tsup built-in)');
    console.log('🔗 External dependencies: react, react-dom, clsx, tailwind-merge, cva, framer-motion');
    console.log('📁 Total entry points: 39');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  },
});
