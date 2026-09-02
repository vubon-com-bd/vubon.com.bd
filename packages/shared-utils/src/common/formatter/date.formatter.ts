/**
 * Format Date
 * তারিখ ফরম্যাট করা
 */
export const formatDate = (
  date: Date | string,
  format: string = 'DD-MM-YYYY',
  locale: 'bn' | 'en' = 'bn'
): string => {
  const d = typeof date === 'string' ? new Date(date) : date;

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear());
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  const monthNames =
    locale === 'bn'
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
  const dayName = d.toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-US', { weekday: 'long' });

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
export const formatTime = (date: Date | string, locale: 'bn' | 'en' = 'bn'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;

  return d.toLocaleTimeString(locale === 'bn' ? 'bn-BD' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: locale === 'en',
  });
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
 * Get Relative Time
 * আপেক্ষিক সময় পাওয়া
 */
export const getRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? '1 year ago' : `${years} years ago`;
  }
  if (months > 0) {
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }
  if (days > 0) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  }
  if (hours > 0) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  }
  if (minutes > 0) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  }
  return seconds <= 5 ? 'Just now' : `${seconds} seconds ago`;
};

/**
 * Check if date is today
 * তারিখ আজকের কিনা চেক করা
 */
export const isToday = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if date is in past
 * তারিখ পেছনের কিনা চেক করা
 */
export const isPast = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.getTime() < Date.now();
};

/**
 * Check if date is in future
 * তারিখ ভবিষ্যতের কিনা চেক করা
 */
export const isFuture = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.getTime() > Date.now();
};
