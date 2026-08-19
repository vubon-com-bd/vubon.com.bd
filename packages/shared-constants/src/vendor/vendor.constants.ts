/**
 * ভেন্ডার মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * ভেন্ডার আইডি প্রিফিক্স
 */
export const VENDOR_ID_PREFIX = 'VEN-';

/**
 * ভেন্ডার কোড প্যাটার্ন - শুধুমাত্র অক্ষর, সংখ্যা, ড্যাশ এবং আন্ডারস্কোর অনুমোদিত
 */
export const VENDOR_CODE_PATTERN = /^[A-Za-z0-9_-]+$/;

/**
 * ডিফল্ট ভেন্ডার স্ট্যাটাস
 */
export const DEFAULT_VENDOR_STATUS = 'PENDING';

/**
 * ভেন্ডার নামের ন্যূনতম দৈর্ঘ্য
 */
export const VENDOR_NAME_MIN_LENGTH = 2;

/**
 * ভেন্ডার নামের সর্বোচ্চ দৈর্ঘ্য
 */
export const VENDOR_NAME_MAX_LENGTH = 100;

/**
 * সর্বোচ্চ ভেন্ডার ডকুমেন্ট সংখ্যা
 */
export const MAX_VENDOR_DOCUMENTS = 10;

/**
 * ভেন্ডার লোগোর সর্বোচ্চ সাইজ (২ এমবি)
 */
export const VENDOR_LOGO_MAX_SIZE = 2 * 1024 * 1024;

/**
 * সমর্থিত ইমেজ ফরম্যাটসমূহ
 */
export const SUPPORTED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp'] as const;

/**
 * ভেন্ডার স্ট্যাটাস টাইপ (শুধুমাত্র বেসিক স্ট্যাটাস)
 * @deprecated - ব্যবহার করুন VendorStatusValue from vendor-status.constants
 */
export type VendorStatusBasic = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';

/**
 * ভেন্ডার স্ট্যাটাস লেবেলসমূহ (বেসিক)
 * @deprecated - ব্যবহার করুন VendorStatusLabels from vendor-status.constants
 */
export const VENDOR_STATUS_LABELS: Record<VendorStatusBasic, string> = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  SUSPENDED: 'Suspended',
};
