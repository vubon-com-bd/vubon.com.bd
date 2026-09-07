import { FILTER } from '@vubon/shared-constants';

// FILTER.OPERATORS থেকে অপারেটর টাইপ
export type FilterOperator = (typeof FILTER.OPERATORS)[keyof typeof FILTER.OPERATORS];

// FILTER.TYPES থেকে ফিল্টার টাইপ
export type FilterType = (typeof FILTER.TYPES)[keyof typeof FILTER.TYPES];

// FILTER.LOGIC থেকে লজিক টাইপ
export type FilterLogic = (typeof FILTER.LOGIC)[keyof typeof FILTER.LOGIC];

// FILTER.GROUPS থেকে গ্রুপ টাইপ
export type FilterGroupType = (typeof FILTER.GROUPS)[keyof typeof FILTER.GROUPS];

// FILTER.MODES থেকে মোড টাইপ
export type FilterMode = (typeof FILTER.MODES)[keyof typeof FILTER.MODES];

export interface Filter {
  field: string;
  operator: FilterOperator;
  value: unknown;
  type?: FilterType;
  group?: FilterGroupType;
  mode?: FilterMode;
}

// FILTER কনস্ট্যান্ট ব্যবহার করে ফিল্টার অপশন
export interface FilterOptions {
  caseSensitive?: boolean;
  trimValues?: boolean;
  allowEmpty?: boolean;
  maxArraySize?: number;
  debounceMs?: number;
  liveUpdate?: boolean;
  collapsible?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  multiSelect?: boolean;
}

// FILTER.UI থেকে ডিফল্ট অপশন
export const DEFAULT_FILTER_OPTIONS: FilterOptions = {
  caseSensitive: false,
  trimValues: true,
  allowEmpty: false,
  maxArraySize: 100,
  debounceMs: FILTER.UI?.DEBOUNCE_MS || 300,
  liveUpdate: FILTER.UI?.LIVE_UPDATE || true,
  collapsible: FILTER.UI?.COLLAPSIBLE || true,
  searchable: FILTER.UI?.SEARCHABLE || true,
  clearable: FILTER.UI?.CLEARABLE || true,
  multiSelect: FILTER.UI?.MULTI_SELECT || true,
};

// FILTER কনস্ট্যান্ট ব্যবহার করে ফিল্টার কনফিগ
export interface FilterConfig {
  defaultOperator: FilterOperator;
  defaultLogic: FilterLogic;
  defaultMode: FilterMode;
  options: FilterOptions;
}

// FILTER.DEFAULT থেকে ডিফল্ট কনফিগ
export const DEFAULT_FILTER_CONFIG: FilterConfig = {
  defaultOperator: FILTER.DEFAULT?.OPERATOR || 'eq',
  defaultLogic: FILTER.DEFAULT?.LOGIC || 'and',
  defaultMode: FILTER.DEFAULT?.MODE || 'auto',
  options: DEFAULT_FILTER_OPTIONS,
};

// ফিল্টার গ্রুপ
export interface FilterGroup {
  type: FilterLogic;
  filters: (Filter | FilterGroup)[];
}

// ফিল্টার এক্সপ্রেশন
export interface FilterExpression {
  field: string;
  operator: FilterOperator;
  value: unknown;
  group?: FilterGroupType;
  type?: FilterType;
}

// ফিল্টার ভ্যালিডেশন রেজাল্ট
export interface FilterValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// FILTER.OPERATORS ব্যবহার করে ফিল্টার ফ্যাক্টরি
export type FilterFactory = {
  create(field: string, operator: FilterOperator, value: unknown): Filter;
  createEq(field: string, value: unknown): Filter;
  createNe(field: string, value: unknown): Filter;
  createGt(field: string, value: number | Date): Filter;
  createGte(field: string, value: number | Date): Filter;
  createLt(field: string, value: number | Date): Filter;
  createLte(field: string, value: number | Date): Filter;
  createLike(field: string, value: string): Filter;
  createNotLike(field: string, value: string): Filter;
  createIn(field: string, values: unknown[]): Filter;
  createNin(field: string, values: unknown[]): Filter;
  createBetween(field: string, min: unknown, max: unknown): Filter;
  createIsNull(field: string): Filter;
  createIsNotNull(field: string): Filter;
  createIsEmpty(field: string): Filter;
  createIsNotEmpty(field: string): Filter;
  createStartsWith(field: string, value: string): Filter;
  createEndsWith(field: string, value: string): Filter;
  createContains(field: string, value: unknown): Filter;
  createNotContains(field: string, value: unknown): Filter;
};

// FILTER কনস্ট্যান্ট ব্যবহার করে ফিল্টার জেনারেটর
export const FilterGenerator: FilterFactory = {
  create: (field: string, operator: FilterOperator, value: unknown): Filter => ({
    field,
    operator,
    value,
  }),
  createEq: (field: string, value: unknown): Filter => ({
    field,
    operator: FILTER.OPERATORS.EQ,
    value,
  }),
  createNe: (field: string, value: unknown): Filter => ({
    field,
    operator: FILTER.OPERATORS.NE,
    value,
  }),
  createGt: (field: string, value: number | Date): Filter => ({
    field,
    operator: FILTER.OPERATORS.GT,
    value,
  }),
  createGte: (field: string, value: number | Date): Filter => ({
    field,
    operator: FILTER.OPERATORS.GTE,
    value,
  }),
  createLt: (field: string, value: number | Date): Filter => ({
    field,
    operator: FILTER.OPERATORS.LT,
    value,
  }),
  createLte: (field: string, value: number | Date): Filter => ({
    field,
    operator: FILTER.OPERATORS.LTE,
    value,
  }),
  createLike: (field: string, value: string): Filter => ({
    field,
    operator: FILTER.OPERATORS.LIKE,
    value,
  }),
  createNotLike: (field: string, value: string): Filter => ({
    field,
    operator: FILTER.OPERATORS.NOT_LIKE,
    value,
  }),
  createIn: (field: string, values: unknown[]): Filter => ({
    field,
    operator: FILTER.OPERATORS.IN,
    value: values,
  }),
  createNin: (field: string, values: unknown[]): Filter => ({
    field,
    operator: FILTER.OPERATORS.NIN,
    value: values,
  }),
  createBetween: (field: string, min: unknown, max: unknown): Filter => ({
    field,
    operator: FILTER.OPERATORS.BETWEEN,
    value: [min, max],
  }),
  createIsNull: (field: string): Filter => ({
    field,
    operator: FILTER.OPERATORS.IS_NULL,
    value: null,
  }),
  createIsNotNull: (field: string): Filter => ({
    field,
    operator: FILTER.OPERATORS.IS_NOT_NULL,
    value: null,
  }),
  createIsEmpty: (field: string): Filter => ({
    field,
    operator: FILTER.OPERATORS.IS_EMPTY,
    value: null,
  }),
  createIsNotEmpty: (field: string): Filter => ({
    field,
    operator: FILTER.OPERATORS.IS_NOT_EMPTY,
    value: null,
  }),
  createStartsWith: (field: string, value: string): Filter => ({
    field,
    operator: FILTER.OPERATORS.STARTS,
    value,
  }),
  createEndsWith: (field: string, value: string): Filter => ({
    field,
    operator: FILTER.OPERATORS.ENDS,
    value,
  }),
  createContains: (field: string, value: unknown): Filter => ({
    field,
    operator: FILTER.OPERATORS.CONTAINS,
    value,
  }),
  createNotContains: (field: string, value: unknown): Filter => ({
    field,
    operator: FILTER.OPERATORS.NOT_CONTAINS,
    value,
  }),
};

// FILTER কনস্ট্যান্ট ব্যবহার করে ফিল্টার হেল্পার
export const FilterHelpers = {
  // ফিল্টার ভ্যালিডেশন
  validate: (filter: Filter): FilterValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!filter.field || filter.field.trim() === '') {
      errors.push('Field name is required');
    }

    if (!filter.operator) {
      errors.push('Operator is required');
    }

    // FILTER.OPERATORS থেকে বৈধ অপারেটর চেক
    const validOperators = Object.values(FILTER.OPERATORS);
    if (!validOperators.includes(filter.operator)) {
      errors.push(`Invalid operator: ${filter.operator}`);
    }

    // মান ভ্যালিডেশন
    if (filter.value === undefined || filter.value === null) {
      if (
        filter.operator !== FILTER.OPERATORS.IS_NULL &&
        filter.operator !== FILTER.OPERATORS.IS_NOT_NULL &&
        filter.operator !== FILTER.OPERATORS.IS_EMPTY &&
        filter.operator !== FILTER.OPERATORS.IS_NOT_EMPTY
      ) {
        warnings.push('Value is null or undefined');
      }
    }

    // IN/NIN অপারেটরের জন্য অ্যারে চেক
    if (filter.operator === FILTER.OPERATORS.IN || filter.operator === FILTER.OPERATORS.NIN) {
      if (!Array.isArray(filter.value)) {
        errors.push('Value must be an array for in/nin operators');
      } else if (filter.value.length === 0) {
        warnings.push('Empty array for in/nin operator');
      }
    }

    // BETWEEN অপারেটরের জন্য অ্যারে চেক
    if (filter.operator === FILTER.OPERATORS.BETWEEN) {
      if (!Array.isArray(filter.value) || filter.value.length !== 2) {
        errors.push('Value must be an array with 2 elements for between operator');
      }
    }

    // LIKE/NOT_LIKE/STARTS/ENDS অপারেটরের জন্য স্ট্রিং চেক
    if (
      filter.operator === FILTER.OPERATORS.LIKE ||
      filter.operator === FILTER.OPERATORS.NOT_LIKE ||
      filter.operator === FILTER.OPERATORS.STARTS ||
      filter.operator === FILTER.OPERATORS.ENDS
    ) {
      if (typeof filter.value !== 'string') {
        errors.push('Value must be a string for like/not_like/starts/ends operators');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  },

  // ফিল্টার নরমালাইজ
  normalize: (filter: Filter): Filter => {
    const normalized = { ...filter };

    // ফিল্ড নাম ট্রিম
    normalized.field = normalized.field.trim();

    // মান ট্রিম (স্ট্রিং হলে)
    if (typeof normalized.value === 'string') {
      normalized.value = normalized.value.trim();
    }

    // IN/NIN অপারেটরের জন্য ডুপ্লিকেট রিমুভ
    if (
      (normalized.operator === FILTER.OPERATORS.IN ||
        normalized.operator === FILTER.OPERATORS.NIN) &&
      Array.isArray(normalized.value)
    ) {
      normalized.value = [...new Set(normalized.value)];
    }

    return normalized;
  },

  // FILTER কনস্ট্যান্ট ব্যবহার করে ফিল্টার পরিষ্কার
  clean: (filter: Filter): Filter => {
    const cleaned = { ...filter };

    // খালি ফিল্ড রিমুভ
    if (cleaned.value === undefined || cleaned.value === null) {
      if (
        cleaned.operator !== FILTER.OPERATORS.IS_NULL &&
        cleaned.operator !== FILTER.OPERATORS.IS_NOT_NULL &&
        cleaned.operator !== FILTER.OPERATORS.IS_EMPTY &&
        cleaned.operator !== FILTER.OPERATORS.IS_NOT_EMPTY
      ) {
        cleaned.value = '';
      }
    }

    return cleaned;
  },

  // FILTER.LOGIC ব্যবহার করে গ্রুপ তৈরি
  createGroup: (type: FilterLogic, filters: (Filter | FilterGroup)[]): FilterGroup => ({
    type,
    filters,
  }),

  // AND গ্রুপ
  and: (...filters: (Filter | FilterGroup)[]): FilterGroup => ({
    type: FILTER.LOGIC.AND,
    filters,
  }),

  // OR গ্রুপ
  or: (...filters: (Filter | FilterGroup)[]): FilterGroup => ({
    type: FILTER.LOGIC.OR,
    filters,
  }),

  // NOT গ্রুপ
  not: (...filters: (Filter | FilterGroup)[]): FilterGroup => ({
    type: FILTER.LOGIC.NOT,
    filters,
  }),
};

// FILTER কনস্ট্যান্ট ব্যবহার করে ফিল্টার ট্রান্সফরমার
export type FilterTransformer = (filter: Filter) => Filter;

// FILTER কনস্ট্যান্ট ব্যবহার করে ফিল্টার প্রিডিকেট
export type FilterPredicate = (value: unknown) => boolean;

// FILTER কনস্ট্যান্ট ব্যবহার করে ফিল্টার সেট
export interface FilterSet {
  filters: Filter[];
  group: FilterLogic;
  options?: FilterOptions;
}

// FILTER কনস্ট্যান্ট ব্যবহার করে ফিল্টার ফলাফল
export interface FilterResult<T = unknown> {
  data: T[];
  total: number;
  filtered: number;
  appliedFilters: Filter[];
}

// FILTER কনস্ট্যান্ট ব্যবহার করে ফিল্টার স্টেট
export interface FilterState {
  filters: Filter[];
  group: FilterLogic;
  mode: FilterMode;
  isApplied: boolean;
  isValid: boolean;
  errors: string[];
}
