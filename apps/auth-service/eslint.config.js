import baseConfig from '../../eslint.config.js';

export default [
  // গ্লোবাল ইগনোর প্যাটার্ন
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'src/generated/**',
      '**/generated/**',
      '**/*.generated.ts',
      'coverage/**',
    ],
  },
  // src/ ফোল্ডারের জন্য বেস কনফিগ
  {
    files: ['src/**/*.ts'],
    rules: {
      ...baseConfig[1]?.rules || {},
    },
  },
];
