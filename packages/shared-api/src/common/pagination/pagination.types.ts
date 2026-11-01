export interface PageRequest {
  readonly page: number;
  readonly limit: number;
}

export interface CursorRequest {
  readonly cursor: string;
  readonly limit: number;
}

export interface PageMeta {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}

export interface CursorMeta {
  readonly nextCursor: string | null;
  readonly hasNext: boolean;
  readonly limit: number;
}

export interface PaginatedResult<T> {
  readonly items: readonly T[];
  readonly meta: PageMeta;
}

export interface CursorResult<T> {
  readonly items: readonly T[];
  readonly meta: CursorMeta;
}
