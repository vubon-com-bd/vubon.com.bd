/**
 * Common Schemas Index
 * Export all common schemas for easy importing
 *
 * @module CommonSchemas
 */

// ============================================================
// 1. Core Primitives
// ============================================================
export {
  idSchema,
  uuidSchema,
  emailSchema,
  phoneSchema,
  passwordSchema,
  slugSchema,
  ipv4Schema,
  urlSchema,
  dateSchema,
  metadataSchema,
  deviceInfoSchema,
  adminStatusSchema,
  adminRoleSchema,
  adminLevelSchema,
  userStatusSchema,
  userTypeSchema,
  userRoleSchema,
  authSessionStatusSchema,
  authTokenTypeSchema,
  baseEntitySchema,
  softDeleteSchema,
  timestampSchema,
  auditSchema,
  apiResponseSchema,
  paginatedResponseSchema,
  dateRangeSchema,
  searchQuerySchema as coreSearchQuerySchema,
} from './core-primitives.schema';

export type {
  ID,
  UUID,
  Email,
  PhoneNumber,
  Password,
  Slug,
  IPv4,
  URL,
  Date as CoreDate,
  Metadata,
  DeviceInfo,
  AdminStatus,
  AdminRole,
  AdminLevel,
  UserStatus,
  UserType,
  UserRole,
  AuthSessionStatus,
  AuthTokenType,
  BaseEntity,
  SoftDelete,
  Timestamp,
  Audit,
  APIResponse,
  PaginatedResponse,
  DateRange,
  SearchQuery as CoreSearchQuery,
} from './core-primitives.schema';

// ============================================================
// 2. Pagination
// ============================================================
export {
  paginationQuerySchema,
  strictPaginationQuerySchema,
  searchPaginationQuerySchema,
  filterPaginationQuerySchema,
  fullPaginationQuerySchema,
  cursorPaginationQuerySchema,
  searchCursorPaginationQuerySchema,
  offsetPaginationQuerySchema,
  sortSchema,
  multiSortSchema,
  sortQuerySchema,
  filterSchema as paginationFilterSchema,
  filterGroupSchema as paginationFilterGroupSchema,
  advancedFilterQuerySchema,
  paginationMetaSchema,
  paginatedResponseSchema as paginatedResponseSchema_,
  cursorPaginationMetaSchema,
  cursorPaginatedResponseSchema,
  batchQuerySchema,
  rangeQuerySchema,
} from './pagination.schema';

export type {
  PaginationQuery,
  StrictPaginationQuery,
  SearchPaginationQuery,
  FilterPaginationQuery,
  FullPaginationQuery,
  CursorPaginationQuery,
  SearchCursorPaginationQuery,
  OffsetPaginationQuery,
  Sort,
  MultiSort,
  SortQuery,
  Filter as PaginationFilter,
  FilterGroup as PaginationFilterGroup,
  AdvancedFilterQuery,
  PaginationMeta,
  PaginatedResponse as PaginatedResponse_,
  CursorPaginationMeta,
  CursorPaginatedResponse,
  BatchQuery,
  RangeQuery,
} from './pagination.schema';

// ============================================================
// 3. Filter
// ============================================================
export {
  FILTER_OPERATORS,
  FILTER_OPERATOR_LABELS,
  filterSchema,
  strictFilterSchema,
  typedFilterSchema,
  filterGroupSchema,
  strictFilterGroupSchema,
  searchFilterSchema,
  strictSearchFilterSchema,
  searchQuerySchema as advancedSearchQuerySchema,
  advancedFilterSchema,
  advancedFilterWithPaginationSchema,
  sanitizeFilterValue,
  sanitizedFilterValueSchema,
  normalizeDateFilter,
} from './filter.schema';

export type {
  Filter,
  StrictFilter,
  TypedFilter,
  FilterGroup,
  StrictFilterGroup,
  SearchFilter,
  StrictSearchFilter,
  SearchQuery as AdvancedSearchQuery,
  AdvancedFilter,
  AdvancedFilterWithPagination,
} from './filter.schema';

// ============================================================
// 4. Combined Schemas
// ============================================================

export const coreQuerySchema = fullPaginationQuerySchema;
export const coreFilterSchema = filterSchema;
export const coreSearchSchema = searchQuerySchema;
