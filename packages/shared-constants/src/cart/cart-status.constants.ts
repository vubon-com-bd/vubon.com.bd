/**
 * কার্ট স্ট্যাটাস এবং ট্রানজিশন সংক্রান্ত কনস্ট্যান্ট
 * কার্টের বিভিন্ন স্ট্যাটাস এবং তাদের ট্রানজিশন সংক্রান্ত কনস্ট্যান্ট
 */

/**
 * কার্টের সমস্ত স্ট্যাটাস
 */
export const CART_STATUS_LIST = {
  ACTIVE: 'active',
  CHECKED_OUT: 'checked_out',
  ABANDONED: 'abandoned',
  EXPIRED: 'expired',
  MERGED: 'merged',
  CONVERTED: 'converted',
} as const;

export type CartStatusList = (typeof CART_STATUS_LIST)[keyof typeof CART_STATUS_LIST];

/**
 * কোন স্ট্যাটাস থেকে কোন স্ট্যাটাসে যাওয়া যায়
 */
export const CART_STATUS_TRANSITIONS: Record<CartStatusList, CartStatusList[]> = {
  [CART_STATUS_LIST.ACTIVE]: [
    CART_STATUS_LIST.CHECKED_OUT,
    CART_STATUS_LIST.ABANDONED,
    CART_STATUS_LIST.EXPIRED,
    CART_STATUS_LIST.MERGED,
    CART_STATUS_LIST.CONVERTED,
  ],
  [CART_STATUS_LIST.CHECKED_OUT]: [],
  [CART_STATUS_LIST.ABANDONED]: [CART_STATUS_LIST.ACTIVE, CART_STATUS_LIST.EXPIRED],
  [CART_STATUS_LIST.EXPIRED]: [],
  [CART_STATUS_LIST.MERGED]: [CART_STATUS_LIST.ACTIVE],
  [CART_STATUS_LIST.CONVERTED]: [CART_STATUS_LIST.CHECKED_OUT],
};

/**
 * প্রতিটি স্ট্যাটাসের জন্য UI কালার
 */
export const CART_STATUS_COLORS: Record<CartStatusList, string> = {
  [CART_STATUS_LIST.ACTIVE]: '#4CAF50',
  [CART_STATUS_LIST.CHECKED_OUT]: '#2196F3',
  [CART_STATUS_LIST.ABANDONED]: '#FF9800',
  [CART_STATUS_LIST.EXPIRED]: '#F44336',
  [CART_STATUS_LIST.MERGED]: '#9C27B0',
  [CART_STATUS_LIST.CONVERTED]: '#00BCD4',
};

/**
 * প্রতিটি স্ট্যাটাসের ইউজার-ফ্রেন্ডলি নাম
 */
export const CART_STATUS_LABELS: Record<CartStatusList, string> = {
  [CART_STATUS_LIST.ACTIVE]: 'Active',
  [CART_STATUS_LIST.CHECKED_OUT]: 'Checked Out',
  [CART_STATUS_LIST.ABANDONED]: 'Abandoned',
  [CART_STATUS_LIST.EXPIRED]: 'Expired',
  [CART_STATUS_LIST.MERGED]: 'Merged',
  [CART_STATUS_LIST.CONVERTED]: 'Converted',
};

/**
 * অ্যাক্টিভ কার্টের স্ট্যাটাস লিস্ট
 */
export const ACTIVE_CART_STATUSES: CartStatusList[] = [
  CART_STATUS_LIST.ACTIVE,
  CART_STATUS_LIST.ABANDONED,
];

/**
 * শেষ অবস্থা (CHECKED_OUT, EXPIRED)
 */
export const TERMINAL_CART_STATUSES: CartStatusList[] = [
  CART_STATUS_LIST.CHECKED_OUT,
  CART_STATUS_LIST.EXPIRED,
];
