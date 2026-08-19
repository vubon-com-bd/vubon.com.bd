/**
 * ভেন্ডার স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ভেন্ডার স্ট্যাটাস অবজেক্ট
 */
export const VendorStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DECLINED: 'DECLINED',
  DELETED: 'DELETED',
  BLOCKED: 'BLOCKED',
  SUSPENDED: 'SUSPENDED',
} as const;

/**
 * ভেন্ডার স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type VendorStatusValue = (typeof VendorStatus)[keyof typeof VendorStatus];

/**
 * ভেন্ডার স্ট্যাটাস লেবেলসমূহ (বাংলা ও ইংরেজি)
 */
export const VendorStatusLabels: Record<VendorStatusValue, { en: string; bn: string }> = {
  [VendorStatus.PENDING]: {
    en: 'Pending',
    bn: 'অপেক্ষমাণ',
  },
  [VendorStatus.ACTIVE]: {
    en: 'Active',
    bn: 'সক্রিয়',
  },
  [VendorStatus.INACTIVE]: {
    en: 'Inactive',
    bn: 'নিষ্ক্রিয়',
  },
  [VendorStatus.DECLINED]: {
    en: 'Declined',
    bn: 'বাতিল',
  },
  [VendorStatus.DELETED]: {
    en: 'Deleted',
    bn: 'মুছে ফেলা হয়েছে',
  },
  [VendorStatus.BLOCKED]: {
    en: 'Blocked',
    bn: 'অবরুদ্ধ',
  },
  [VendorStatus.SUSPENDED]: {
    en: 'Suspended',
    bn: 'স্থগিত',
  },
};

/**
 * ভেন্ডার স্ট্যাটাস রঙ কোডসমূহ (Tailwind CSS ক্লাস)
 */
export const VendorStatusColors: Record<VendorStatusValue, string> = {
  [VendorStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [VendorStatus.ACTIVE]: 'bg-green-100 text-green-800 border-green-300',
  [VendorStatus.INACTIVE]: 'bg-gray-100 text-gray-800 border-gray-300',
  [VendorStatus.DECLINED]: 'bg-red-100 text-red-800 border-red-300',
  [VendorStatus.DELETED]: 'bg-black-100 text-black-800 border-black-300',
  [VendorStatus.BLOCKED]: 'bg-red-200 text-red-900 border-red-400',
  [VendorStatus.SUSPENDED]: 'bg-orange-100 text-orange-800 border-orange-300',
};

/**
 * ভেন্ডার স্ট্যাটাস বিবরণসমূহ
 */
export const VendorStatusDescriptions: Record<VendorStatusValue, string> = {
  [VendorStatus.PENDING]: 'Vendor registration is pending for approval',
  [VendorStatus.ACTIVE]: 'Vendor is active and can operate',
  [VendorStatus.INACTIVE]: 'Vendor is inactive and cannot operate',
  [VendorStatus.DECLINED]: 'Vendor registration has been declined',
  [VendorStatus.DELETED]: 'Vendor has been permanently deleted',
  [VendorStatus.BLOCKED]: 'Vendor has been blocked due to policy violation',
  [VendorStatus.SUSPENDED]: 'Vendor has been temporarily suspended',
};

/**
 * সক্রিয় স্ট্যাটাসসমূহ (যে স্ট্যাটাসে ভেন্ডার অপারেট করতে পারে)
 */
export const ACTIVE_VENDOR_STATUSES: VendorStatusValue[] = [VendorStatus.ACTIVE] as const;

/**
 * নিষ্ক্রিয় স্ট্যাটাসসমূহ (যে স্ট্যাটাসে ভেন্ডার অপারেট করতে পারে না)
 */
export const INACTIVE_VENDOR_STATUSES: VendorStatusValue[] = [
  VendorStatus.INACTIVE,
  VendorStatus.DECLINED,
  VendorStatus.DELETED,
  VendorStatus.BLOCKED,
  VendorStatus.SUSPENDED,
] as const;

/**
 * পেন্ডিং স্ট্যাটাসসমূহ (যে স্ট্যাটাসে অনুমোদনের অপেক্ষায়)
 */
export const PENDING_VENDOR_STATUSES: VendorStatusValue[] = [VendorStatus.PENDING] as const;

/**
 * ভেন্ডার স্ট্যাটাস গ্রুপসমূহ
 */
export const VendorStatusGroups = {
  ACTIVE: ACTIVE_VENDOR_STATUSES,
  INACTIVE: INACTIVE_VENDOR_STATUSES,
  PENDING: PENDING_VENDOR_STATUSES,
} as const;

/**
 * ভেন্ডার স্ট্যাটাস ট্রানজিশন রুলস
 * কোন স্ট্যাটাস থেকে কোন স্ট্যাটাসে যাওয়া যায়
 */
export const VendorStatusTransitions: Record<VendorStatusValue, VendorStatusValue[]> = {
  [VendorStatus.PENDING]: [VendorStatus.ACTIVE, VendorStatus.DECLINED],
  [VendorStatus.ACTIVE]: [VendorStatus.INACTIVE, VendorStatus.BLOCKED, VendorStatus.SUSPENDED],
  [VendorStatus.INACTIVE]: [VendorStatus.ACTIVE, VendorStatus.DELETED],
  [VendorStatus.DECLINED]: [VendorStatus.PENDING],
  [VendorStatus.DELETED]: [],
  [VendorStatus.BLOCKED]: [VendorStatus.ACTIVE, VendorStatus.DELETED],
  [VendorStatus.SUSPENDED]: [VendorStatus.ACTIVE, VendorStatus.BLOCKED, VendorStatus.DELETED],
};
