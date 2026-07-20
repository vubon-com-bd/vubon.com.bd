/**
 * ============================================================================
 * Vubon.com.bd - Enterprise Monorepo Prettier Configuration (ESM)
 * ============================================================================
 */

export default {
  // --------------------------------------------------------------------------
  // General Formatter Settings
  // --------------------------------------------------------------------------
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,

  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',

  trailingComma: 'all',

  bracketSpacing: true,
  bracketSameLine: false,

  arrowParens: 'always',

  endOfLine: 'lf',

  // --------------------------------------------------------------------------
  // Markdown & HTML Styling
  // --------------------------------------------------------------------------
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  embeddedLanguageFormatting: 'auto',

  // --------------------------------------------------------------------------
  // Plugins (ESM-compatible import resolution)
  // --------------------------------------------------------------------------
  plugins: ['@trivago/prettier-plugin-sort-imports'],

  // --------------------------------------------------------------------------
  // Import Sorting Rules
  // --------------------------------------------------------------------------
  importOrder: [
    '^node:(.*)$',
    '^react$',
    '^react/(.*)$',

    '^@nestjs/(.*)$',
    '^@prisma/(.*)$',

    '^@vubon/shared-config$',
    '^@vubon/shared-constants$',
    '^@vubon/shared-schemas$',
    '^@vubon/shared-types$',
    '^@vubon/shared-utils$',

    '^@/(.*)$',

    '^\\.{2}/(.*)$',
    '^\\./(.*)$',
  ],

  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,

  // --------------------------------------------------------------------------
  // Parser Overrides for Decorator Support
  // --------------------------------------------------------------------------
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
  ],
};
