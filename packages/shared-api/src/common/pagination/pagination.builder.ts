import type { PageRequest, CursorRequest } from './pagination.types';

export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 100;

/** Build a page request with sane defaults. */
export function buildPageRequest(input: { page?: number; limit?: number } = {}): PageRequest {
  const page = input.page && input.page > 0 ? Math.floor(input.page) : 1;
  const rawLimit = input.limit ?? DEFAULT_LIMIT;
  const limit = Math.min(Math.max(Math.floor(rawLimit), 1), MAX_LIMIT);
  return { page, limit };
}

/** Build a cursor request. */
export function buildCursorRequest(input: { cursor: string; limit?: number }): CursorRequest {
  const rawLimit = input.limit ?? DEFAULT_LIMIT;
  const limit = Math.min(Math.max(Math.floor(rawLimit), 1), MAX_LIMIT);
  return { cursor: input.cursor, limit };
}
