// ইউজার রোলস
export const AUTH_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  USER: 'USER',
  MERCHANT: 'MERCHANT',
} as const;

export type AuthRole = typeof AUTH_ROLES[keyof typeof AUTH_ROLES];

// ভ্যালিডেশন কনস্ট্যান্টস
export const AUTH_VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 30,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 20,
};

// টোকেন এক্সপায়ারি টাইম
export const TOKEN_EXPIRY = {
  ACCESS_TOKEN: '15m',     // ১৫ মিনিট
  REFRESH_TOKEN: '7d',     // ৭ দিন
  COOKIE_MAX_AGE: 7 * 24 * 60 * 60 * 1000, // ৭ দিন (মিলিসেকেন্ডে)
};

// কমন এরর মেসেজ
export const AUTH_ERROR_MESSAGES = {
  UNAUTHORIZED: 'আপনার এই অ্যাকশনটি নেওয়ার অনুমতি নেই।',
  INVALID_CREDENTIALS: 'ইমেইল অথবা পাসওয়ার্ডটি সঠিক নয়।',
  EMAIL_ALREADY_EXISTS: 'এই ইমেইলটি দিয়ে অলরেডি অ্যাকাউন্ট তৈরি করা আছে।',
  PASSWORD_TOO_SHORT: `পাসওয়ার্ড অবশ্যই কমপক্ষে ${AUTH_VALIDATION.MIN_PASSWORD_LENGTH} অক্ষরের হতে হবে।`,
  TOKEN_EXPIRED: 'আপনার সেশন শেষ হয়ে গেছে, দয়া করে আবার লগইন করুন।',
};
