/**
 * Number Format Constants
 * @module shared-constants/common/number-format.constants
 */

export const NUMBER_FORMAT = {
  // Decimal separators
  DECIMAL_SEPARATOR: {
    DOT: '.',
    COMMA: ',',
  } as const,

  // Thousand separators
  THOUSAND_SEPARATOR: {
    COMMA: ',',
    DOT: '.',
    SPACE: ' ',
    NONE: '',
  } as const,

  // Currency formats
  CURRENCY: {
    BDT: {
      symbol: '৳',
      decimalSeparator: '.',
      thousandSeparator: ',',
      decimalPlaces: 2,
    },
    USD: {
      symbol: '$',
      decimalSeparator: '.',
      thousandSeparator: ',',
      decimalPlaces: 2,
    },
    EUR: {
      symbol: '€',
      decimalSeparator: '.',
      thousandSeparator: ',',
      decimalPlaces: 2,
    },
    GBP: {
      symbol: '£',
      decimalSeparator: '.',
      thousandSeparator: ',',
      decimalPlaces: 2,
    },
  },

  // Percentage format
  PERCENTAGE: {
    format: '{value}%',
    decimalPlaces: 2,
    separator: '%',
  },

  // Number formats
  NUMBERS: {
    INTEGER: {
      decimalPlaces: 0,
    },
    DECIMAL: {
      decimalPlaces: 2,
    },
    CURRENCY: {
      decimalPlaces: 2,
    },
    PERCENTAGE: {
      decimalPlaces: 2,
    },
    SCIENTIFIC: {
      decimalPlaces: 4,
    },
  },

  // Formatting options
  OPTIONS: {
    ROUNDING: {
      HALF_UP: 'half_up',
      HALF_DOWN: 'half_down',
      HALF_EVEN: 'half_even',
      DOWN: 'down',
      UP: 'up',
    } as const,
  },

  // Defaults
  DEFAULT: {
    DECIMAL_PLACES: 2,
    DECIMAL_SEPARATOR: '.',
    THOUSAND_SEPARATOR: ',',
    CURRENCY_SYMBOL: '৳',
  },
} as const;

export type DecimalSeparator =
  (typeof NUMBER_FORMAT.DECIMAL_SEPARATOR)[keyof typeof NUMBER_FORMAT.DECIMAL_SEPARATOR];
export type ThousandSeparator =
  (typeof NUMBER_FORMAT.THOUSAND_SEPARATOR)[keyof typeof NUMBER_FORMAT.THOUSAND_SEPARATOR];
export type RoundingMethod =
  (typeof NUMBER_FORMAT.OPTIONS.ROUNDING)[keyof typeof NUMBER_FORMAT.OPTIONS.ROUNDING];
