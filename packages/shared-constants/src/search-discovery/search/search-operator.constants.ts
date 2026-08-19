/**
 * সার্চের লজিক্যাল অপারেটর সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * বুলিয়ান অপারেটর
 */
export enum BooleanOperator {
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
}

/**
 * কুয়েরি অপারেটর
 */
export enum QueryOperator {
  MUST = 'must',
  SHOULD = 'should',
  MUST_NOT = 'must_not',
  FILTER = 'filter',
}

/**
 * বুলিয়ান অপারেটর লেবেলসমূহ (বাংলায়)
 */
export const BOOLEAN_OPERATOR_LABELS: Record<BooleanOperator, string> = {
  [BooleanOperator.AND]: 'এবং',
  [BooleanOperator.OR]: 'অথবা',
  [BooleanOperator.NOT]: 'না',
} as const;

/**
 * বুলিয়ান অপারেটর লেবেলসমূহ (ইংরেজিতে)
 */
export const BOOLEAN_OPERATOR_LABELS_EN: Record<BooleanOperator, string> = {
  [BooleanOperator.AND]: 'AND',
  [BooleanOperator.OR]: 'OR',
  [BooleanOperator.NOT]: 'NOT',
} as const;

/**
 * কুয়েরি অপারেটর লেবেলসমূহ (বাংলায়)
 */
export const QUERY_OPERATOR_LABELS: Record<QueryOperator, string> = {
  [QueryOperator.MUST]: 'অবশ্যই',
  [QueryOperator.SHOULD]: 'হতে পারে',
  [QueryOperator.MUST_NOT]: 'হবে না',
  [QueryOperator.FILTER]: 'ফিল্টার',
} as const;

/**
 * কুয়েরি অপারেটর লেবেলসমূহ (ইংরেজিতে)
 */
export const QUERY_OPERATOR_LABELS_EN: Record<QueryOperator, string> = {
  [QueryOperator.MUST]: 'Must',
  [QueryOperator.SHOULD]: 'Should',
  [QueryOperator.MUST_NOT]: 'Must Not',
  [QueryOperator.FILTER]: 'Filter',
} as const;

/**
 * বুলিয়ান অপারেটর বিবরণ
 */
export const BOOLEAN_OPERATOR_DESCRIPTIONS: Record<BooleanOperator, string> = {
  [BooleanOperator.AND]: 'সব শর্ত পূরণ করতে হবে',
  [BooleanOperator.OR]: 'যেকোনো একটি শর্ত পূরণ করলেই হবে',
  [BooleanOperator.NOT]: 'শর্তটি পূরণ করা যাবে না',
} as const;

/**
 * কুয়েরি অপারেটর বিবরণ
 */
export const QUERY_OPERATOR_DESCRIPTIONS: Record<QueryOperator, string> = {
  [QueryOperator.MUST]: 'শর্তটি অবশ্যই পূরণ করতে হবে (স্কোরকে প্রভাবিত করে)',
  [QueryOperator.SHOULD]: 'শর্তটি পূরণ করলে স্কোর বাড়ে',
  [QueryOperator.MUST_NOT]: 'শর্তটি পূরণ করা যাবে না (স্কোরকে প্রভাবিত করে না)',
  [QueryOperator.FILTER]: 'শর্তটি পূরণ করতে হবে (স্কোরকে প্রভাবিত করে না)',
} as const;

/**
 * বুলিয়ান অপারেটরের ভ্যালু সমূহ
 */
export const BOOLEAN_OPERATOR_VALUES = Object.values(BooleanOperator) as readonly BooleanOperator[];

/**
 * কুয়েরি অপারেটরের ভ্যালু সমূহ
 */
export const QUERY_OPERATOR_VALUES = Object.values(QueryOperator) as readonly QueryOperator[];

/**
 * অপারেটর কনফিগারেশন টাইপ
 */
export type OperatorConfig = {
  operator: string;
  label: string;
  description: string;
  affectsScore: boolean;
};

/**
 * বুলিয়ান অপারেটর কনফিগারেশনসমূহ
 */
export const BOOLEAN_OPERATOR_CONFIGS: Record<BooleanOperator, OperatorConfig> = {
  [BooleanOperator.AND]: {
    operator: BooleanOperator.AND,
    label: BOOLEAN_OPERATOR_LABELS[BooleanOperator.AND],
    description: BOOLEAN_OPERATOR_DESCRIPTIONS[BooleanOperator.AND],
    affectsScore: false,
  },
  [BooleanOperator.OR]: {
    operator: BooleanOperator.OR,
    label: BOOLEAN_OPERATOR_LABELS[BooleanOperator.OR],
    description: BOOLEAN_OPERATOR_DESCRIPTIONS[BooleanOperator.OR],
    affectsScore: false,
  },
  [BooleanOperator.NOT]: {
    operator: BooleanOperator.NOT,
    label: BOOLEAN_OPERATOR_LABELS[BooleanOperator.NOT],
    description: BOOLEAN_OPERATOR_DESCRIPTIONS[BooleanOperator.NOT],
    affectsScore: false,
  },
} as const;

/**
 * কুয়েরি অপারেটর কনফিগারেশনসমূহ
 */
export const QUERY_OPERATOR_CONFIGS: Record<QueryOperator, OperatorConfig> = {
  [QueryOperator.MUST]: {
    operator: QueryOperator.MUST,
    label: QUERY_OPERATOR_LABELS[QueryOperator.MUST],
    description: QUERY_OPERATOR_DESCRIPTIONS[QueryOperator.MUST],
    affectsScore: true,
  },
  [QueryOperator.SHOULD]: {
    operator: QueryOperator.SHOULD,
    label: QUERY_OPERATOR_LABELS[QueryOperator.SHOULD],
    description: QUERY_OPERATOR_DESCRIPTIONS[QueryOperator.SHOULD],
    affectsScore: true,
  },
  [QueryOperator.MUST_NOT]: {
    operator: QueryOperator.MUST_NOT,
    label: QUERY_OPERATOR_LABELS[QueryOperator.MUST_NOT],
    description: QUERY_OPERATOR_DESCRIPTIONS[QueryOperator.MUST_NOT],
    affectsScore: false,
  },
  [QueryOperator.FILTER]: {
    operator: QueryOperator.FILTER,
    label: QUERY_OPERATOR_LABELS[QueryOperator.FILTER],
    description: QUERY_OPERATOR_DESCRIPTIONS[QueryOperator.FILTER],
    affectsScore: false,
  },
} as const;

/**
 * ডিফল্ট বুলিয়ান অপারেটর
 */
export const DEFAULT_BOOLEAN_OPERATOR = BooleanOperator.AND;

/**
 * ডিফল্ট কুয়েরি অপারেটর
 */
export const DEFAULT_QUERY_OPERATOR = QueryOperator.MUST;
