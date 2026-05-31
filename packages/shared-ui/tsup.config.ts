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
    
    // Individual UI components (for granular tree-shaking)
    'components/ui/Button': 'src/components/ui/Button.tsx',
    'components/ui/Input': 'src/components/ui/Input.tsx',
    'components/ui/Select': 'src/components/ui/Select.tsx',
    'components/ui/Modal': 'src/components/ui/Modal.tsx',
    'components/ui/Table': 'src/components/ui/Table.tsx',
    'components/ui/Card': 'src/components/ui/Card.tsx',
    'components/ui/Badge': 'src/components/ui/Badge.tsx',
    'components/ui/Avatar': 'src/components/ui/Avatar.tsx',
    'components/ui/Spinner': 'src/components/ui/Spinner.tsx',
    'components/ui/Toast': 'src/components/ui/Toast.tsx',
    'components/ui/Alert': 'src/components/ui/Alert.tsx',
    'components/ui/Tooltip': 'src/components/ui/Tooltip.tsx',
    'components/ui/Dropdown': 'src/components/ui/Dropdown.tsx',
    'components/ui/Tabs': 'src/components/ui/Tabs.tsx',
    'components/ui/Pagination': 'src/components/ui/Pagination.tsx',
    'components/ui/Breadcrumb': 'src/components/ui/Breadcrumb.tsx',
    'components/ui/Skeleton': 'src/components/ui/Skeleton.tsx',
    'components/ui/Progress': 'src/components/ui/Progress.tsx',
    'components/ui/Switch': 'src/components/ui/Switch.tsx',
    
    // Individual form components
    'components/forms/Form': 'src/components/forms/Form.tsx',
    'components/forms/FormInput': 'src/components/forms/FormInput.tsx',
    'components/forms/FormSelect': 'src/components/forms/FormSelect.tsx',
    'components/forms/FormCheckbox': 'src/components/forms/FormCheckbox.tsx',
    
    // Individual layout components
    'components/layout/Container': 'src/components/layout/Container.tsx',
    'components/layout/Grid': 'src/components/layout/Grid.tsx',
    'components/layout/Stack': 'src/components/layout/Stack.tsx',
    
    // Individual hooks
    'hooks/useDebounce': 'src/hooks/useDebounce.ts',
    'hooks/useModal': 'src/hooks/useModal.ts',
    'hooks/useToast': 'src/hooks/useToast.ts',
    'hooks/useClickOutside': 'src/hooks/useClickOutside.ts',
    'hooks/useWindowSize': 'src/hooks/useWindowSize.ts',
    'hooks/useLocalStorage': 'src/hooks/useLocalStorage.ts',
    'hooks/useMediaQuery': 'src/hooks/useMediaQuery.ts',
    
    // Utils
    'utils/cn': 'src/utils/cn.ts',
  },
  
  // Output formats - both CommonJS and ESM
  format: ['cjs', 'esm'],
  
  // Generate TypeScript declarations (using tsc separately for better control)
  dts: false,
  
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
    'clsx',
    'tailwind-merge',
    'class-variance-authority',
    'framer-motion',
  ],
  
  // Platform - browser (UI components run in browser)
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
  
  // Add 'use client' directive for Next.js compatibility
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
  
  // Enable onSuccess hook for logging
  onSuccess: async () => {
    console.log('✅ @vubon/shared-ui build complete!');
    console.log('📦 Output: dist/');
    console.log('📝 Formats: CommonJS + ESM');
    console.log('🔷 Types: .d.ts files generated (via tsc)');
    console.log('🔗 External dependencies: react, react-dom, framer-motion');
    console.log('📁 Total entry points: 44 (7 barrels + 37 individual modules)');
  },
});
