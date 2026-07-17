/**
 * ============================================================================
 * Vubon.com.bd - Enterprise Monorepo Prettier Configuration
 * ============================================================================
 */

module.exports = {
  // --------------------------------------------------------------------------
  // General
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
  // Markdown
  // --------------------------------------------------------------------------
  proseWrap: 'preserve',

  // --------------------------------------------------------------------------
  // HTML
  // --------------------------------------------------------------------------
  htmlWhitespaceSensitivity: 'css',

  // --------------------------------------------------------------------------
  // Embedded Languages
  // --------------------------------------------------------------------------
  embeddedLanguageFormatting: 'auto',

  // --------------------------------------------------------------------------
  // Plugins
  // --------------------------------------------------------------------------
  plugins: ['@trivago/prettier-plugin-sort-imports'],

  // --------------------------------------------------------------------------
  // Import Sorting
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
    '^\\./(.*)$'
  ],

  importOrderSeparation: true,

  importOrderSortSpecifiers: true,

  importOrderCaseInsensitive: true
};
