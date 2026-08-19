/**
 * সার্চ সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * ডিফল্ট সার্চ ফলাফলের সংখ্যা
 */
export const DEFAULT_PAGE_SIZE = 20;

/**
 * সর্বোচ্চ সার্চ ফলাফল
 */
export const MAX_PAGE_SIZE = 100;

/**
 * ডিফল্ট পেজ নম্বর
 */
export const DEFAULT_PAGE = 1;

/**
 * ডিফল্ট সার্চ টাইমআউট (মিলিসেকেন্ড)
 */
export const SEARCH_TIMEOUT_MS = 5000;

/**
 * ডিফল্ট সার্চ ল্যাঙ্গুয়েজ
 */
export const DEFAULT_SEARCH_LANGUAGE = 'bn';

/**
 * সার্চের মিনিমাম ক্যারেক্টার লিমিট
 */
export const MIN_SEARCH_QUERY_LENGTH = 2;

/**
 * সার্চের ম্যাক্সিমাম ক্যারেক্টার লিমিট
 */
export const MAX_SEARCH_QUERY_LENGTH = 200;

/**
 * সার্চ ক্যোয়ারী ভ্যালিডেশন এরর মেসেজ
 */
export const SEARCH_VALIDATION_ERRORS = {
  QUERY_TOO_SHORT: `সার্চ ক্যোয়ারী কমপক্ষে ${MIN_SEARCH_QUERY_LENGTH} ক্যারেক্টার হতে হবে`,
  QUERY_TOO_LONG: `সার্চ ক্যোয়ারী সর্বোচ্চ ${MAX_SEARCH_QUERY_LENGTH} ক্যারেক্টার হতে পারে`,
  INVALID_PAGE: 'পেজ নম্বর অবশ্যই পজিটিভ সংখ্যা হতে হবে',
  INVALID_PAGE_SIZE: `পেজ সাইজ ${DEFAULT_PAGE_SIZE} থেকে ${MAX_PAGE_SIZE} এর মধ্যে হতে হবে`,
} as const;

/**
 * সার্চ ক্যোয়ারী টাইপ
 */
export type SearchQuery = {
  query: string;
  page?: number;
  pageSize?: number;
  language?: string;
  type?: string;
};
