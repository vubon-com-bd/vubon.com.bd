import { CURRENCY, CURRENCY_DETAILS, LOCALE } from '@vubon/shared-constants';

// Locale map constant
const LOCALE_MAP: Record<string, string> = {
  BN: 'bn-BD',
  EN: 'en-US',
};

/**
 * Format Price
 * মূল্য ফরম্যাট করা
 */
export const formatPrice = (amount: number, currency: keyof typeof CURRENCY = 'BDT'): string => {
  const currencyDetails = CURRENCY_DETAILS[currency];

  const formatted = new Intl.NumberFormat(currency === 'BDT' ? 'bn-BD' : 'en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: currencyDetails.decimalPlaces,
    maximumFractionDigits: currencyDetails.decimalPlaces,
  }).format(amount);

  return formatted;
};

/**
 * Format Date
 * তারিখ ফরম্যাট করা
 */
export const formatDate = (
  date: Date | string,
  format: string = 'DD-MM-YYYY',
  locale: keyof typeof LOCALE = 'BN'
): string => {
  const d = typeof date === 'string' ? new Date(date) : date;

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear());
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  const monthNames =
    locale === 'BN'
      ? [
          'জানুয়ারি',
          'ফেব্রুয়ারি',
          'মার্চ',
          'এপ্রিল',
          'মে',
          'জুন',
          'জুলাই',
          'আগস্ট',
          'সেপ্টেম্বর',
          'অক্টোবর',
          'নভেম্বর',
          'ডিসেম্বর',
        ]
      : [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];

  const monthName = monthNames[d.getMonth()];
  const dayName = d.toLocaleDateString(locale === 'BN' ? 'bn-BD' : 'en-US', { weekday: 'long' });

  const replacements: Record<string, string> = {
    DD: day,
    MM: month,
    YYYY: year,
    YY: year.slice(-2),
    HH: hours,
    mm: minutes,
    ss: seconds,
    MMMM: monthName,
    MMM: monthName.slice(0, 3),
    ddd: dayName.slice(0, 3),
    dddd: dayName,
  };

  let result = format;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(key, value);
  }

  return result;
};

/**
 * Format Phone
 * ফোন নম্বর ফরম্যাট করা
 */
export const formatPhone = (phone: string, country: string = 'BD'): string => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');

  if (country === 'BD') {
    // Format: +880 1712-345678
    if (digits.length === 11) {
      return `+88 ${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    } else if (digits.length === 13 && digits.startsWith('880')) {
      return `+${digits.slice(0, 3)} ${digits.slice(3, 6)}-${digits.slice(6, 10)}-${digits.slice(10)}`;
    }
  }

  return phone;
};

/**
 * Format Bangla Number
 * বাংলা সংখ্যা ফরম্যাট করা
 */
export const formatBanglaNumber = (number: number | string): string => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const str = typeof number === 'number' ? number.toString() : number;

  let result = '';
  for (const char of str) {
    if (char >= '0' && char <= '9') {
      result += banglaDigits[parseInt(char)];
    } else {
      result += char;
    }
  }

  return result;
};

/**
 * Format Bangla Date
 * বাংলা তারিখ ফরম্যাট করা
 */
export const formatBanglaDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const banglaMonths = [
    'জানুয়ারি',
    'ফেব্রুয়ারি',
    'মার্চ',
    'এপ্রিল',
    'মে',
    'জুন',
    'জুলাই',
    'আগস্ট',
    'সেপ্টেম্বর',
    'অক্টোবর',
    'নভেম্বর',
    'ডিসেম্বর',
  ];

  const day = formatBanglaNumber(d.getDate());
  const month = banglaMonths[d.getMonth()];
  const year = formatBanglaNumber(d.getFullYear());

  return `${day} ${month} ${year}`;
};

/**
 * Format Time
 * সময় ফরম্যাট করা
 */
export const formatTime = (date: Date | string, locale: keyof typeof LOCALE = 'BN'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;

  return d.toLocaleTimeString(locale === 'BN' ? 'bn-BD' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: locale === 'EN',
  });
};

/**
 * Format Currency
 * কারেন্সি ফরম্যাট করা
 */
export const formatCurrency = (
  amount: number,
  currency: keyof typeof CURRENCY = 'BDT',
  locale: keyof typeof LOCALE = 'BN'
): string => {
  const localeStr = LOCALE_MAP[locale] || 'en-US';

  return new Intl.NumberFormat(localeStr, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format Number
 * সংখ্যা ফরম্যাট করা
 */
export const formatNumber = (number: number, locale: keyof typeof LOCALE = 'BN'): string => {
  if (locale === 'BN') {
    return formatBanglaNumber(number);
  }

  const localeStr = LOCALE_MAP[locale] || 'en-US';
  return new Intl.NumberFormat(localeStr).format(number);
};
