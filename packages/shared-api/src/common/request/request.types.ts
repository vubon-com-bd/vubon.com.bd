export type QueryValue = string | number | boolean | undefined | null;

export type QueryParams = Record<string, QueryValue>;

export interface PaginationParams {
  readonly page?: number;
  readonly limit?: number;
  readonly cursor?: string;
}

export interface SortParams {
  readonly sortBy?: string;
  readonly sortOrder?: 'asc' | 'desc';
}

export interface FilterOperatorMap {
  readonly eq?: QueryValue;
  readonly ne?: QueryValue;
  readonly gt?: QueryValue;
  readonly gte?: QueryValue;
  readonly lt?: QueryValue;
  readonly lte?: QueryValue;
  readonly in?: readonly QueryValue[];
  readonly contains?: string;
}

export type FilterParams = Record<string, FilterOperatorMap>;
