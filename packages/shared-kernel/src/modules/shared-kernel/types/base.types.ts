export type PrimitiveType = string | number | boolean | null | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type SortOrder = 'asc' | 'desc';

export type SortOptions = {
  field: string;
  order: SortOrder;
};

export type FilterOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'between';

export type FilterCondition = {
  field: string;
  operator: FilterOperator;
  value: unknown;
};

export type Filter = {
  conditions: FilterCondition[];
  logic: 'and' | 'or';
};

export type ID = string;

export type Timestamp = Date;

export type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

export type JSONObject = {
  [key: string]: JSONValue;
};

export type JSONArray = JSONValue[];

export type MaybePromise<T> = T | Promise<T>;

export type Constructor<T = unknown> = new (...args: unknown[]) => T;
