/**
 * রিটার্নের কারণের বিভিন্ন টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * রিটার্ন কারণ টাইপ
 */
export const RETURN_REASON_TYPES = {
  PRODUCT_DEFECT: 'product_defect',
  WRONG_ITEM: 'wrong_item',
  DAMAGED: 'damaged',
  NOT_AS_DESCRIBED: 'not_as_described',
  CHANGE_OF_MIND: 'change_of_mind',
  SIZE_ISSUE: 'size_issue',
  DELIVERY_ISSUE: 'delivery_issue',
} as const;

/**
 * রিটার্ন কারণ টাইপ টাইপ
 */
export type ReturnReasonType = (typeof RETURN_REASON_TYPES)[keyof typeof RETURN_REASON_TYPES];

/**
 * রিটার্ন কারণ টাইপের বিবরণ
 */
export const RETURN_REASON_TYPE_DESCRIPTIONS: Record<ReturnReasonType, string> = {
  [RETURN_REASON_TYPES.PRODUCT_DEFECT]: 'পণ্য ত্রুটিপূর্ণ - পণ্যে প্রযুক্তিগত সমস্যা',
  [RETURN_REASON_TYPES.WRONG_ITEM]: 'ভুল আইটেম - অর্ডারের চেয়ে ভিন্ন পণ্য',
  [RETURN_REASON_TYPES.DAMAGED]: 'ক্ষতিগ্রস্ত - পণ্য পরিবহনে ক্ষতিগ্রস্ত হয়েছে',
  [RETURN_REASON_TYPES.NOT_AS_DESCRIBED]: 'বর্ণনা অনুযায়ী নয় - পণ্য বর্ণনার সাথে মেলে না',
  [RETURN_REASON_TYPES.CHANGE_OF_MIND]: 'মন পরিবর্তন - গ্রাহক আর পণ্যটি চান না',
  [RETURN_REASON_TYPES.SIZE_ISSUE]: 'সাইজ সমস্যা - পণ্যের সাইজ অমিল',
  [RETURN_REASON_TYPES.DELIVERY_ISSUE]: 'ডেলিভারি সমস্যা - ডেলিভারি নিয়ে সমস্যা',
};

/**
 * রিটার্ন কারণ টাইপের রং (UI এর জন্য)
 */
export const RETURN_REASON_TYPE_COLORS: Record<ReturnReasonType, string> = {
  [RETURN_REASON_TYPES.PRODUCT_DEFECT]: '#E74C3C', // লাল
  [RETURN_REASON_TYPES.WRONG_ITEM]: '#F39C12', // কমলা
  [RETURN_REASON_TYPES.DAMAGED]: '#E67E22', // গাঢ় কমলা
  [RETURN_REASON_TYPES.NOT_AS_DESCRIBED]: '#9B59B6', // বেগুনি
  [RETURN_REASON_TYPES.CHANGE_OF_MIND]: '#3498DB', // নীল
  [RETURN_REASON_TYPES.SIZE_ISSUE]: '#2ECC71', // সবুজ
  [RETURN_REASON_TYPES.DELIVERY_ISSUE]: '#1ABC9C', // টিল
};

/**
 * রিটার্ন কারণ টাইপের আইকন (UI এর জন্য)
 */
export const RETURN_REASON_TYPE_ICONS: Record<ReturnReasonType, string> = {
  [RETURN_REASON_TYPES.PRODUCT_DEFECT]: 'bug',
  [RETURN_REASON_TYPES.WRONG_ITEM]: 'exchange',
  [RETURN_REASON_TYPES.DAMAGED]: 'exclamation-triangle',
  [RETURN_REASON_TYPES.NOT_AS_DESCRIBED]: 'file-text',
  [RETURN_REASON_TYPES.CHANGE_OF_MIND]: 'heart',
  [RETURN_REASON_TYPES.SIZE_ISSUE]: 'ruler',
  [RETURN_REASON_TYPES.DELIVERY_ISSUE]: 'truck',
};

/**
 * রিটার্ন কারণ টাইপের ক্যাটাগরি
 */
export const RETURN_REASON_TYPE_CATEGORIES: Record<ReturnReasonType, string> = {
  [RETURN_REASON_TYPES.PRODUCT_DEFECT]: 'product',
  [RETURN_REASON_TYPES.WRONG_ITEM]: 'product',
  [RETURN_REASON_TYPES.DAMAGED]: 'delivery',
  [RETURN_REASON_TYPES.NOT_AS_DESCRIBED]: 'product',
  [RETURN_REASON_TYPES.CHANGE_OF_MIND]: 'customer',
  [RETURN_REASON_TYPES.SIZE_ISSUE]: 'product',
  [RETURN_REASON_TYPES.DELIVERY_ISSUE]: 'delivery',
};

/**
 * রিটার্ন কারণ টাইপের প্রায়োরিটি
 */
export const RETURN_REASON_TYPE_PRIORITIES: Record<ReturnReasonType, number> = {
  [RETURN_REASON_TYPES.PRODUCT_DEFECT]: 5,
  [RETURN_REASON_TYPES.WRONG_ITEM]: 4,
  [RETURN_REASON_TYPES.DAMAGED]: 4,
  [RETURN_REASON_TYPES.NOT_AS_DESCRIBED]: 3,
  [RETURN_REASON_TYPES.CHANGE_OF_MIND]: 2,
  [RETURN_REASON_TYPES.SIZE_ISSUE]: 3,
  [RETURN_REASON_TYPES.DELIVERY_ISSUE]: 4,
};

/**
 * রিটার্ন কারণ টাইপের রিফান্ড এলিজিবিলিটি
 */
export const RETURN_REASON_TYPE_REFUND_ELIGIBLE: Record<ReturnReasonType, boolean> = {
  [RETURN_REASON_TYPES.PRODUCT_DEFECT]: true,
  [RETURN_REASON_TYPES.WRONG_ITEM]: true,
  [RETURN_REASON_TYPES.DAMAGED]: true,
  [RETURN_REASON_TYPES.NOT_AS_DESCRIBED]: true,
  [RETURN_REASON_TYPES.CHANGE_OF_MIND]: false,
  [RETURN_REASON_TYPES.SIZE_ISSUE]: true,
  [RETURN_REASON_TYPES.DELIVERY_ISSUE]: true,
};

/**
 * রিটার্ন কারণ টাইপ গ্রুপ
 */
export const RETURN_REASON_TYPE_GROUPS = {
  ALL: Object.values(RETURN_REASON_TYPES),
  PRODUCT_RELATED: [
    RETURN_REASON_TYPES.PRODUCT_DEFECT,
    RETURN_REASON_TYPES.WRONG_ITEM,
    RETURN_REASON_TYPES.NOT_AS_DESCRIBED,
    RETURN_REASON_TYPES.SIZE_ISSUE,
  ] as const,
  DELIVERY_RELATED: [RETURN_REASON_TYPES.DAMAGED, RETURN_REASON_TYPES.DELIVERY_ISSUE] as const,
  CUSTOMER_RELATED: [RETURN_REASON_TYPES.CHANGE_OF_MIND] as const,
} as const;

/**
 * রিটার্ন কারণ টাইপ গ্রুপ টাইপ
 */
export type ReturnReasonTypeGroup = typeof RETURN_REASON_TYPE_GROUPS;

/**
 * রিটার্ন কারণ টাইপ কনফিগারেশন
 */
export const RETURN_REASON_TYPE_CONFIG = {
  TYPES: RETURN_REASON_TYPES,
  DESCRIPTIONS: RETURN_REASON_TYPE_DESCRIPTIONS,
  COLORS: RETURN_REASON_TYPE_COLORS,
  ICONS: RETURN_REASON_TYPE_ICONS,
  CATEGORIES: RETURN_REASON_TYPE_CATEGORIES,
  PRIORITIES: RETURN_REASON_TYPE_PRIORITIES,
  REFUND_ELIGIBLE: RETURN_REASON_TYPE_REFUND_ELIGIBLE,
  GROUPS: RETURN_REASON_TYPE_GROUPS,
} as const;

/**
 * রিটার্ন কারণ টাইপ কনফিগারেশন টাইপ
 */
export type ReturnReasonTypeConfig = typeof RETURN_REASON_TYPE_CONFIG;

/**
 * চেক করে যে রিটার্ন কারণ টাইপ প্রোডাক্ট রিলেটেড কিনা
 */
export function isProductRelatedReturnReason(type: ReturnReasonType): boolean {
  return (RETURN_REASON_TYPE_GROUPS.PRODUCT_RELATED as readonly ReturnReasonType[]).includes(type);
}

/**
 * চেক করে যে রিটার্ন কারণ টাইপ ডেলিভারি রিলেটেড কিনা
 */
export function isDeliveryRelatedReturnReason(type: ReturnReasonType): boolean {
  return (RETURN_REASON_TYPE_GROUPS.DELIVERY_RELATED as readonly ReturnReasonType[]).includes(type);
}

/**
 * চেক করে যে রিটার্ন কারণ টাইপ কাস্টমার রিলেটেড কিনা
 */
export function isCustomerRelatedReturnReason(type: ReturnReasonType): boolean {
  return (RETURN_REASON_TYPE_GROUPS.CUSTOMER_RELATED as readonly ReturnReasonType[]).includes(type);
}

/**
 * রিটার্ন কারণ টাইপের বিবরণ পাওয়া
 */
export function getReturnReasonTypeDescription(type: ReturnReasonType): string {
  return RETURN_REASON_TYPE_DESCRIPTIONS[type];
}

/**
 * রিটার্ন কারণ টাইপের ক্যাটাগরি পাওয়া
 */
export function getReturnReasonTypeCategory(type: ReturnReasonType): string {
  return RETURN_REASON_TYPE_CATEGORIES[type];
}

/**
 * রিটার্ন কারণ টাইপের প্রায়োরিটি পাওয়া
 */
export function getReturnReasonTypePriority(type: ReturnReasonType): number {
  return RETURN_REASON_TYPE_PRIORITIES[type];
}

/**
 * রিটার্ন কারণ টাইপ রিফান্ড এলিজিবল কিনা
 */
export function isReturnReasonTypeRefundEligible(type: ReturnReasonType): boolean {
  return RETURN_REASON_TYPE_REFUND_ELIGIBLE[type];
}
