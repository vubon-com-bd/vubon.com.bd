/**
 * ফ্রিকোয়েন্টলি বট (সাথে কেনা) সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * মিনিমাম সহ-ক্রয় সংখ্যা
 */
export const MIN_CO_PURCHASE_COUNT = 5;

/**
 * অ্যাসোসিয়েশন রুল মিন কনফিডেন্স
 */
export const ASSOCIATION_RULE_MIN_CONFIDENCE = 0.3;

/**
 * অ্যাসোসিয়েশন রুল মিন সাপোর্ট
 */
export const ASSOCIATION_RULE_MIN_SUPPORT = 0.01;

/**
 * অ্যাসোসিয়েশন রুল মিন লিফট
 */
export const ASSOCIATION_RULE_MIN_LIFT = 1.0;

/**
 * ডিফল্ট প্রদর্শন সংখ্যা
 */
export const DEFAULT_FREQUENTLY_BOUGHT_DISPLAY_COUNT = 8;

/**
 * সর্বোচ্চ প্রদর্শন সংখ্যা
 */
export const MAX_FREQUENTLY_BOUGHT_DISPLAY_COUNT = 20;

/**
 * ন্যূনতম প্রদর্শন সংখ্যা
 */
export const MIN_FREQUENTLY_BOUGHT_DISPLAY_COUNT = 1;

/**
 * ক্যাশের সময় (সেকেন্ডে)
 */
export const FREQUENTLY_BOUGHT_CACHE_TTL_SECONDS = 86400; // 24 hours

/**
 * ফ্রিকোয়েন্টলি বট অ্যাসোসিয়েশন রুল টাইপ
 */
export enum AssociationRuleType {
  CO_PURCHASE = 'co_purchase',
  CO_VIEW = 'co_view',
  CO_CART = 'co_cart',
}

/**
 * অ্যাসোসিয়েশন রুল টাইপ লেবেলসমূহ (বাংলায়)
 */
export const ASSOCIATION_RULE_TYPE_LABELS_BN: Record<AssociationRuleType, string> = {
  [AssociationRuleType.CO_PURCHASE]: 'সাথে ক্রয়',
  [AssociationRuleType.CO_VIEW]: 'সাথে দেখা',
  [AssociationRuleType.CO_CART]: 'সাথে কার্টে যোগ',
} as const;

/**
 * অ্যাসোসিয়েশন রুল টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const ASSOCIATION_RULE_TYPE_LABELS_EN: Record<AssociationRuleType, string> = {
  [AssociationRuleType.CO_PURCHASE]: 'Co-Purchase',
  [AssociationRuleType.CO_VIEW]: 'Co-View',
  [AssociationRuleType.CO_CART]: 'Co-Cart',
} as const;

/**
 * ডিফল্ট অ্যাসোসিয়েশন রুল টাইপ
 */
export const DEFAULT_ASSOCIATION_RULE_TYPE = AssociationRuleType.CO_PURCHASE;

/**
 * অ্যাসোসিয়েশন রুল টাইপের ভ্যালু সমূহ
 */
export const ASSOCIATION_RULE_TYPE_VALUES = Object.values(
  AssociationRuleType
) as readonly AssociationRuleType[];

/**
 * ফ্রিকোয়েন্টলি বট কনফিগারেশন টাইপ
 */
export type FrequentlyBoughtConfig = {
  ruleType: AssociationRuleType;
  labelBn: string;
  labelEn: string;
  minCoPurchaseCount: number;
  minConfidence: number;
  minSupport: number;
  minLift: number;
  defaultDisplayCount: number;
  maxDisplayCount: number;
  cacheTTL: number;
  enabled: boolean;
};

/**
 * ফ্রিকোয়েন্টলি বট কনফিগারেশনসমূহ
 */
export const FREQUENTLY_BOUGHT_CONFIGS: Record<AssociationRuleType, FrequentlyBoughtConfig> = {
  [AssociationRuleType.CO_PURCHASE]: {
    ruleType: AssociationRuleType.CO_PURCHASE,
    labelBn: ASSOCIATION_RULE_TYPE_LABELS_BN[AssociationRuleType.CO_PURCHASE],
    labelEn: ASSOCIATION_RULE_TYPE_LABELS_EN[AssociationRuleType.CO_PURCHASE],
    minCoPurchaseCount: MIN_CO_PURCHASE_COUNT,
    minConfidence: ASSOCIATION_RULE_MIN_CONFIDENCE,
    minSupport: ASSOCIATION_RULE_MIN_SUPPORT,
    minLift: ASSOCIATION_RULE_MIN_LIFT,
    defaultDisplayCount: DEFAULT_FREQUENTLY_BOUGHT_DISPLAY_COUNT,
    maxDisplayCount: MAX_FREQUENTLY_BOUGHT_DISPLAY_COUNT,
    cacheTTL: FREQUENTLY_BOUGHT_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [AssociationRuleType.CO_VIEW]: {
    ruleType: AssociationRuleType.CO_VIEW,
    labelBn: ASSOCIATION_RULE_TYPE_LABELS_BN[AssociationRuleType.CO_VIEW],
    labelEn: ASSOCIATION_RULE_TYPE_LABELS_EN[AssociationRuleType.CO_VIEW],
    minCoPurchaseCount: MIN_CO_PURCHASE_COUNT,
    minConfidence: ASSOCIATION_RULE_MIN_CONFIDENCE,
    minSupport: ASSOCIATION_RULE_MIN_SUPPORT,
    minLift: ASSOCIATION_RULE_MIN_LIFT,
    defaultDisplayCount: DEFAULT_FREQUENTLY_BOUGHT_DISPLAY_COUNT,
    maxDisplayCount: MAX_FREQUENTLY_BOUGHT_DISPLAY_COUNT,
    cacheTTL: FREQUENTLY_BOUGHT_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [AssociationRuleType.CO_CART]: {
    ruleType: AssociationRuleType.CO_CART,
    labelBn: ASSOCIATION_RULE_TYPE_LABELS_BN[AssociationRuleType.CO_CART],
    labelEn: ASSOCIATION_RULE_TYPE_LABELS_EN[AssociationRuleType.CO_CART],
    minCoPurchaseCount: MIN_CO_PURCHASE_COUNT,
    minConfidence: ASSOCIATION_RULE_MIN_CONFIDENCE,
    minSupport: ASSOCIATION_RULE_MIN_SUPPORT,
    minLift: ASSOCIATION_RULE_MIN_LIFT,
    defaultDisplayCount: DEFAULT_FREQUENTLY_BOUGHT_DISPLAY_COUNT,
    maxDisplayCount: MAX_FREQUENTLY_BOUGHT_DISPLAY_COUNT,
    cacheTTL: FREQUENTLY_BOUGHT_CACHE_TTL_SECONDS,
    enabled: true,
  },
} as const;

/**
 * অ্যাসোসিয়েশন রুল টাইপ
 */
export type AssociationRule = {
  antecedent: string[];
  consequent: string[];
  support: number;
  confidence: number;
  lift: number;
  ruleType: AssociationRuleType;
};

/**
 * ফ্রিকোয়েন্টলি বট রেসপন্স টাইপ
 */
export type FrequentlyBoughtResponse = {
  items: string[];
  total: number;
  rules: AssociationRule[];
  took: number;
  cache: boolean;
};

/**
 * ফ্রিকোয়েন্টলি বট এরর মেসেজসমূহ
 */
export const FREQUENTLY_BOUGHT_ERROR_MESSAGES = {
  INVALID_RULE_TYPE: 'অ্যাসোসিয়েশন রুল টাইপ সঠিক নয়',
  INVALID_COUNT: `প্রদর্শন সংখ্যা ${MIN_FREQUENTLY_BOUGHT_DISPLAY_COUNT} থেকে ${MAX_FREQUENTLY_BOUGHT_DISPLAY_COUNT} এর মধ্যে হতে হবে`,
  COUNT_TOO_LOW: `প্রদর্শন সংখ্যা ${MIN_FREQUENTLY_BOUGHT_DISPLAY_COUNT} এর চেয়ে কম হতে পারে না`,
  COUNT_TOO_HIGH: `প্রদর্শন সংখ্যা ${MAX_FREQUENTLY_BOUGHT_DISPLAY_COUNT} এর চেয়ে বেশি হতে পারে না`,
  INVALID_CONFIDENCE: 'কনফিডেন্স ০ থেকে ১ এর মধ্যে হতে হবে',
  INVALID_SUPPORT: 'সাপোর্ট ০ থেকে ১ এর মধ্যে হতে হবে',
  INVALID_LIFT: 'লিফট ০ এর চেয়ে বেশি হতে হবে',
  NO_RULES_FOUND: 'কোনো অ্যাসোসিয়েশন রুল পাওয়া যায়নি',
  CACHE_EXPIRED: 'ফ্রিকোয়েন্টলি বট ক্যাশের মেয়াদ শেষ হয়েছে',
} as const;
