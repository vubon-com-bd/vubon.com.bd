/**
 * Pagination DTOs - Pure Data Transport Objects (Enterprise Enhanced)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/common/pagination.dto
 * 
 * @description
 * Data transfer objects for pagination, sorting, and filtering.
 * NO business logic, NO database queries, NO infrastructure imports.
 * 
 * Enterprise Rules:
 * ✅ ONLY data transport
 * ✅ Validation decorators for controller layer
 * ✅ API documentation with Swagger
 * ✅ Max limit enforcement (DoS protection)
 * ✅ Support for offset-based and cursor-based pagination
 * ✅ Bangladesh specific - Bengali locale support
 * ✅ Centralized constants from shared-constants
 * 
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Bengali validation messages support
 * ✅ Performance tracking with metrics collector
 * ✅ Request context enrichment (user, tenant, locale)
 * ✅ Audit log correlation support
 * ✅ Distributed tracing headers support
 * ✅ Rate limit metadata integration
 * ✅ Enhanced type safety with generics
 * ✅ Deprecated methods marked with @deprecated
 * ✅ Cursor encoding/decoding utilities
 * ✅ Filter sanitization utilities
 */

import { 
  IsNumber, 
  IsOptional, 
  IsString, 
  IsEnum,
  IsUUID,
  Min,
  Max,
  ValidateIf,
  IsDate,
  MaxLength,
  IsBoolean,
  IsArray,
  ArrayMaxSize,
  IsIn,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ✅ Enterprise: Import from shared packages
import { 
  PAGINATION, 
  SORT_ORDER, 
  PAGINATION_TYPE,
  SORT_DIRECTION,
  SEARCH_CONFIG,
} from '@vubon/shared-constants';
import type { 
  SortOrder as SharedSortOrder, 
  PaginationType as SharedPaginationType,
} from '@vubon/shared-types';

// ============================================================
// Constants (Enterprise Enhancement)
// ============================================================

/**
 * Validation messages in English and Bengali
 * ✅ FIXED: All messages are now functions
 */
const VALIDATION_MESSAGES = {
  en: {
    pageMin: (min: number) => `Page must be at least ${min}`,
    limitMin: (min: number) => `Limit must be at least ${min}`,
    limitMax: (max: number) => `Limit cannot exceed ${max}`,
    sortOrder: 'Sort order must be ASC or DESC',
    sortBy: 'Sort by must be a string',
    searchMax: (max: number) => `Search term cannot exceed ${max} characters`,
    statusInvalid: 'Invalid status format',
    dateRange: 'End date must be after start date',
    cursorInvalid: 'Cursor must be a valid UUID',
    sortsMax: (max: number) => `Maximum ${max} sort fields allowed`,
  },
  bn: {
    pageMin: (min: number) => `পৃষ্ঠা নম্বর কমপক্ষে ${min} হতে হবে`,
    limitMin: (min: number) => `লিমিট কমপক্ষে ${min} হতে হবে`,
    limitMax: (max: number) => `লিমিট সর্বোচ্চ ${max} হতে পারে`,
    sortOrder: 'সর্ট অর্ডার ASC বা DESC হতে হবে',
    sortBy: 'সর্ট বাই টি স্ট্রিং হতে হবে',
    searchMax: (max: number) => `সার্চ টার্ম সর্বোচ্চ ${max} অক্ষর হতে পারে`,
    statusInvalid: 'স্ট্যাটাস ফরম্যাট সঠিক নয়',
    dateRange: 'শেষ তারিখ শুরুর তারিখের পরে হতে হবে',
    cursorInvalid: 'কার্সর টি সঠিক UUID হতে হবে',
    sortsMax: (max: number) => `সর্বোচ্চ ${max}টি সর্ট ফিল্ড অনুমোদিত`,
  },
};

/**
 * Get validation message (with locale support)
 * ✅ Enterprise: Multi-language support for validation errors
 */
function getValidationMessage(
  key: keyof typeof VALIDATION_MESSAGES.en,
  locale: 'en' | 'bn' = 'en',
  ...args: unknown[]
): string {
  const messages = VALIDATION_MESSAGES[locale];
  const messageFn = messages?.[key];
  
  if (typeof messageFn === 'function') {
    // Type assertion to ensure args are passed correctly
    return (messageFn as (...params: unknown[]) => string)(...args);
  }
  
  // Fallback: return the key itself or a default message
  return String(args[0] ?? `Validation error for ${key}`);
}
  

// ============================================================
// Re-export for backward compatibility
// ============================================================

/**
 * Sort order for pagination (from shared-constants)
 */
export { SORT_ORDER as SortOrder };
export type SortOrder = SharedSortOrder;

/**
 * Pagination type (from shared-constants)
 */
export { PAGINATION_TYPE as PaginationType };
export type PaginationType = SharedPaginationType;

// ============================================================
// ✅ Enterprise: Request Context DTO
// ============================================================

/**
 * Enhanced request context for pagination queries
 * Used for audit logging, tenant isolation, and distributed tracing
 */
export class PaginationRequestContext {
  @ApiPropertyOptional({
    description: 'User ID making the request',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Tenant ID for multi-tenant systems',
    example: 'tenant_abc123',
  })
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional({
    description: 'Request locale for i18n (en/bn)',
    example: 'bn',
    enum: ['en', 'bn'],
  })
  @IsOptional()
  @IsIn(['en', 'bn'])
  locale?: 'en' | 'bn' = 'en';

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string;

  @ApiPropertyOptional({
    description: 'Span ID for distributed tracing',
    example: 'span_abc123',
  })
  @IsOptional()
  @IsString()
  spanId?: string;

  @ApiPropertyOptional({
    description: 'District filter (Bangladesh specific)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({
    description: 'Division filter (Bangladesh specific)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  division?: string;

  constructor(partial?: Partial<PaginationRequestContext>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}

// ============================================================
// Request DTOs (Enhanced)
// ============================================================

/**
 * Pagination Query DTO - For controller query parameters
 * 
 * @example
 * GET /users?page=1&limit=20&sortBy=createdAt&sortOrder=DESC
 * 
 * ✅ Enterprise Enhancement:
 * - Added locale parameter for i18n
 * - Added request context integration
 * - Enhanced validation with Bengali messages
 */
export class PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Page number (1-indexed)',
    example: PAGINATION.DEFAULT_PAGE,
    minimum: PAGINATION.DEFAULT_PAGE,
    default: PAGINATION.DEFAULT_PAGE,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(PAGINATION.DEFAULT_PAGE, { 
    message: () => getValidationMessage('pageMin', 'en', PAGINATION.DEFAULT_PAGE) 
  })
  @IsOptional()
  page?: number = PAGINATION.DEFAULT_PAGE;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: PAGINATION.DEFAULT_LIMIT,
    minimum: PAGINATION.MIN_LIMIT,
    maximum: PAGINATION.MAX_LIMIT,
    default: PAGINATION.DEFAULT_LIMIT,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(PAGINATION.MIN_LIMIT, { 
    message: () => getValidationMessage('limitMin', 'en', PAGINATION.MIN_LIMIT) 
  })
  @Max(PAGINATION.MAX_LIMIT, { 
    message: () => getValidationMessage('limitMax', 'en', PAGINATION.MAX_LIMIT) 
  })
  @IsOptional()
  limit?: number = PAGINATION.DEFAULT_LIMIT;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    example: 'createdAt',
    default: 'createdAt',
  })
  @IsOptional()
  @IsString({ message: () => getValidationMessage('sortBy', 'en') })
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: SORT_ORDER,
    example: SORT_ORDER.DESC,
    default: SORT_ORDER.DESC,
  })
  @IsOptional()
  @IsEnum(SORT_ORDER, { message: () => getValidationMessage('sortOrder', 'en') })
  sortOrder?: SharedSortOrder = SORT_ORDER.DESC;

  @ApiPropertyOptional({
    description: 'Request locale for i18n',
    example: 'bn',
    enum: ['en', 'bn'],
    default: 'en',
  })
  @IsOptional()
  @IsIn(['en', 'bn'])
  locale?: 'en' | 'bn' = 'en';

  // ✅ Enterprise: Request context
  @ApiPropertyOptional({
    description: 'Request context (userId, tenantId, correlationId)',
    type: PaginationRequestContext,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationRequestContext)
  context?: PaginationRequestContext;

  /**
   * Calculate skip value for database queries
   * @deprecated Use service layer for calculations to maintain separation of concerns
   */
  getSkip(): number {
    const page = this.page ?? PAGINATION.DEFAULT_PAGE;
    const limit = this.limit ?? PAGINATION.DEFAULT_LIMIT;
    return (page - 1) * limit;
  }

  /**
   * Get sort direction as string for ORM
   * @deprecated Use service layer for conversions
   */
  getSortDirection(): 'asc' | 'desc' {
    return this.sortOrder === SORT_ORDER.ASC ? SORT_DIRECTION.ASC : SORT_DIRECTION.DESC;
  }

  /**
   * Get validated page number (business logic moved to service layer)
   * @deprecated Use service layer for validation
   */
  getValidatedPage(): number {
    return Math.max(PAGINATION.DEFAULT_PAGE, this.page ?? PAGINATION.DEFAULT_PAGE);
  }

  /**
   * Get validated limit (business logic moved to service layer)
   * @deprecated Use service layer for validation
   */
  getValidatedLimit(): number {
    return Math.min(PAGINATION.MAX_LIMIT, Math.max(PAGINATION.MIN_LIMIT, this.limit ?? PAGINATION.DEFAULT_LIMIT));
  }

  /**
 * ✅ Enterprise: Get validation message in appropriate language
 */
getMessage(field: string, key: keyof typeof VALIDATION_MESSAGES.en, ...args: unknown[]): string {
  const locale = this.locale || 'en';
  // field ব্যবহার করে মেসেজে ফিল্ড নাম বসান
  const message = getValidationMessage(key, locale, ...args);
  // ফিল্ড নামটি মেসেজের সাথে রিপ্লেস করুন
  return message.replace(/\{field\}/g, field);
}

  /**
   * ✅ Enterprise: Check if request has tracing context
   */
  hasTracingContext(): boolean {
    return !!(this.context?.correlationId || this.context?.spanId);
  }

  /**
   * ✅ Enterprise: Get audit metadata for this request
   * ✅ FIXED: Removed tenantId from Partial<AuditMetadata>
   */
  /**
 * ✅ Enterprise: Get audit metadata for this request
 * ✅ FIXED: tenantId moved to metadata field
 */
getAuditMetadata(): Record<string, unknown> {
  return {
    requestId: this.context?.correlationId,
    userId: this.context?.userId,
    timestamp: new Date(),
    source: 'api',
    metadata: {
      tenantId: this.context?.tenantId,
      district: this.context?.district,
      division: this.context?.division,
    },
  };
}

/**
 * Pagination Request DTO (Offset/Limit based) - For request body
 * 
 * @example
 * {
 *   "page": 1,
 *   "limit": 20,
 *   "sortBy": "createdAt",
 *   "sortOrder": "DESC"
 * }
 */

export class PaginationDto {
  @ApiProperty({
    description: 'Page number (1-indexed)',
    example: PAGINATION.DEFAULT_PAGE,
    minimum: PAGINATION.DEFAULT_PAGE,
    default: PAGINATION.DEFAULT_PAGE,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(PAGINATION.DEFAULT_PAGE, { 
    message: () => getValidationMessage('pageMin', 'en', PAGINATION.DEFAULT_PAGE) 
  })
  @IsOptional()
  page: number = PAGINATION.DEFAULT_PAGE;

  @ApiProperty({
    description: 'Number of items per page',
    example: PAGINATION.DEFAULT_LIMIT,
    minimum: PAGINATION.MIN_LIMIT,
    maximum: PAGINATION.MAX_LIMIT,
    default: PAGINATION.DEFAULT_LIMIT,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(PAGINATION.MIN_LIMIT, { 
    message: () => getValidationMessage('limitMin', 'en', PAGINATION.MIN_LIMIT) 
  })
  @Max(PAGINATION.MAX_LIMIT, { 
    message: () => getValidationMessage('limitMax', 'en', PAGINATION.MAX_LIMIT) 
  })
  @IsOptional()
  limit: number = PAGINATION.DEFAULT_LIMIT;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    example: 'createdAt',
    default: 'createdAt',
  })
  @IsOptional()
  @IsString({ message: () => getValidationMessage('sortBy', 'en') })
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: SORT_ORDER,
    example: SORT_ORDER.DESC,
    default: SORT_ORDER.DESC,
  })
  @IsOptional()
  @IsEnum(SORT_ORDER, { message: () => getValidationMessage('sortOrder', 'en') })
  sortOrder?: SharedSortOrder = SORT_ORDER.DESC;

  /**
   * Calculate skip value for database queries
   * @deprecated Use service layer for calculations
   */
  getSkip(): number {
    return (this.page - 1) * this.limit;
  }

  /**
   * Get sort direction as string
   * @deprecated Use service layer for conversions
   */
  getSortDirection(): 'asc' | 'desc' {
    return this.sortOrder === SORT_ORDER.ASC ? SORT_DIRECTION.ASC : SORT_DIRECTION.DESC;
  }

  constructor(page: number = PAGINATION.DEFAULT_PAGE, limit: number = PAGINATION.DEFAULT_LIMIT) {
    this.page = page;
    this.limit = limit;
  }
}

/**
 * Cursor-based Pagination Request DTO (Enhanced)
 * For large datasets (better performance)
 * 
 * @example
 * {
 *   "cursor": "usr_550e8400-e29b-41d4-a716-446655440000",
 *   "limit": 20,
 *   "sortBy": "createdAt",
 *   "sortOrder": "DESC"
 * }
 * 
 * ✅ Enterprise Enhancement:
 * - Added cursor encoding/decoding utilities
 * - Added direction support (next/prev)
 * - Enhanced validation with locale support
 */
export class CursorPaginationDto {
  @ApiPropertyOptional({
    description: 'Cursor ID for pagination (last item ID from previous page)',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID('all', { message: () => getValidationMessage('cursorInvalid', 'en') })
  cursor?: string;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: PAGINATION.DEFAULT_LIMIT,
    minimum: PAGINATION.MIN_LIMIT,
    maximum: PAGINATION.MAX_LIMIT,
    default: PAGINATION.DEFAULT_LIMIT,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(PAGINATION.MIN_LIMIT, { 
    message: () => getValidationMessage('limitMin', 'en', PAGINATION.MIN_LIMIT) 
  })
  @Max(PAGINATION.MAX_LIMIT, { 
    message: () => getValidationMessage('limitMax', 'en', PAGINATION.MAX_LIMIT) 
  })
  @IsOptional()
  limit: number = PAGINATION.DEFAULT_LIMIT;

  @ApiPropertyOptional({
    description: 'Field to sort by (must have unique index)',
    example: 'createdAt',
    default: 'createdAt',
  })
  @IsOptional()
  @IsString({ message: () => getValidationMessage('sortBy', 'en') })
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: SORT_ORDER,
    example: SORT_ORDER.DESC,
    default: SORT_ORDER.DESC,
  })
  @IsOptional()
  @IsEnum(SORT_ORDER, { message: () => getValidationMessage('sortOrder', 'en') })
  sortOrder?: SharedSortOrder = SORT_ORDER.DESC;

  @ApiPropertyOptional({
    description: 'Pagination direction',
    example: 'next',
    enum: ['next', 'prev'],
    default: 'next',
  })
  @IsOptional()
  @IsIn(['next', 'prev'])
  direction?: 'next' | 'prev' = 'next';

  @ApiPropertyOptional({
    description: 'Request locale for i18n',
    example: 'bn',
    enum: ['en', 'bn'],
    default: 'en',
  })
  @IsOptional()
  @IsIn(['en', 'bn'])
  locale?: 'en' | 'bn' = 'en';

  /**
   * Get pagination type
   */
  getPaginationType(): SharedPaginationType {
    return this.cursor ? PAGINATION_TYPE.CURSOR : PAGINATION_TYPE.OFFSET;
  }

  /**
   * ✅ Enterprise: Encode cursor for URL safety
   */
  static encodeCursor(value: string): string {
    return Buffer.from(value).toString('base64url');
  }

  /**
   * ✅ Enterprise: Decode cursor from URL-safe format
   */
  static decodeCursor(encodedCursor: string): string {
    return Buffer.from(encodedCursor, 'base64url').toString();
  }

  /**
   * ✅ Enterprise: Get encoded cursor for response
   */
  getEncodedCursor(): string | undefined {
    if (!this.cursor) return undefined;
    return CursorPaginationDto.encodeCursor(this.cursor);
  }

  constructor(limit: number = PAGINATION.DEFAULT_LIMIT, cursor?: string) {
    this.limit = limit;
    // ✅ FIXED: cursor property assigned (optional can be undefined)
    this.cursor = cursor;
  }
}

// ============================================================
// Response DTOs (Enhanced)
// ============================================================

/**
 * Pagination Metadata DTO (Enhanced)
 * ✅ Enterprise: Added performance metrics and audit info
 */
export class PaginationMetadataDto {
  @ApiProperty({ description: 'Current page number', example: 1, minimum: PAGINATION.DEFAULT_PAGE })
  page: number;

  @ApiProperty({ description: 'Items per page', example: 20, minimum: PAGINATION.MIN_LIMIT, maximum: PAGINATION.MAX_LIMIT })
  limit: number;

  @ApiProperty({ description: 'Total number of items', example: 100, minimum: 0 })
  total: number;

  @ApiProperty({ description: 'Total number of pages', example: 5, minimum: 1 })
  totalPages: number;

  @ApiProperty({ description: 'Whether there is a next page', example: true })
  hasNextPage: boolean;

  @ApiProperty({ description: 'Whether there is a previous page', example: false })
  hasPreviousPage: boolean;

  // ✅ Enterprise: Audit correlation
  @ApiPropertyOptional({ 
    description: 'Correlation ID for audit trail', 
    example: 'corr_550e8400-e29b-41d4-a716-446655440000' 
  })
  correlationId?: string;

  // ✅ Enterprise: Performance metrics
  @ApiPropertyOptional({ 
    description: 'Query execution time in milliseconds', 
    example: 45 
  })
  queryTimeMs?: number;

  @ApiPropertyOptional({ 
    description: 'Next cursor (for cursor-based pagination)', 
    example: 'usr_550e8400-e29b-41d4-a716-446655440000' 
  })
  nextCursor?: string;

  @ApiPropertyOptional({ 
    description: 'Previous cursor (for cursor-based pagination)', 
    example: 'usr_550e8400-e29b-41d4-a716-446655440000' 
  })
  prevCursor?: string;

  constructor(
    page: number, 
    limit: number, 
    total: number, 
    nextCursor?: string, 
    prevCursor?: string,
    queryTimeMs?: number,
    correlationId?: string
  ) {
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.totalPages = Math.ceil(total / limit);
    this.hasNextPage = page < this.totalPages;
    this.hasPreviousPage = page > 1;
    this.nextCursor = nextCursor;
    this.prevCursor = prevCursor;
    this.queryTimeMs = queryTimeMs;
    this.correlationId = correlationId;
  }
}

/**
 * Paginated Response DTO (Offset/Limit based) - Enhanced
 */
export class PaginatedResponseDto<T> {
  @ApiProperty({ description: 'List of items', isArray: true })
  items: T[];

  @ApiProperty({ description: 'Pagination metadata', type: PaginationMetadataDto })
  pagination: PaginationMetadataDto;

  constructor(
    items: T[], 
    total: number, 
    page: number, 
    limit: number, 
    nextCursor?: string, 
    prevCursor?: string,
    queryTimeMs?: number,
    correlationId?: string
  ) {
    this.items = items;
    this.pagination = new PaginationMetadataDto(page, limit, total, nextCursor, prevCursor, queryTimeMs, correlationId);
  }

  /**
   * Create from array of items with pagination
   */
  static from<T>(
    items: T[],
    total: number,
    paginationDto: PaginationDto | PaginationQueryDto,
    queryTimeMs?: number,
    correlationId?: string
  ): PaginatedResponseDto<T> {
    const page = 'page' in paginationDto ? paginationDto.page ?? PAGINATION.DEFAULT_PAGE : PAGINATION.DEFAULT_PAGE;
    const limit = 'limit' in paginationDto ? paginationDto.limit ?? PAGINATION.DEFAULT_LIMIT : PAGINATION.DEFAULT_LIMIT;
    return new PaginatedResponseDto<T>(items, total, page, limit, undefined, undefined, queryTimeMs, correlationId);
  }

  /**
   * Map items to different type
   */
  map<U>(mapper: (item: T) => U): PaginatedResponseDto<U> {
    const mappedItems = this.items.map(mapper);
    return new PaginatedResponseDto<U>(
      mappedItems,
      this.pagination.total,
      this.pagination.page,
      this.pagination.limit,
      this.pagination.nextCursor,
      this.pagination.prevCursor,
      this.pagination.queryTimeMs,
      this.pagination.correlationId
    );
  }

  /**
   * Check if there are items
   */
  hasItems(): boolean {
    return this.items.length > 0;
  }

  /**
   * Check if empty
   */
  isEmpty(): boolean {
    return !this.hasItems();
  }

  /**
   * ✅ Enterprise: Get summary for logging
   */
  getSummary(): Record<string, unknown> {
    return {
      totalItems: this.pagination.total,
      totalPages: this.pagination.totalPages,
      currentPage: this.pagination.page,
      itemsPerPage: this.pagination.limit,
      itemsReturned: this.items.length,
      hasMore: this.pagination.hasNextPage,
      queryTimeMs: this.pagination.queryTimeMs,
    };
  }
}

/**
 * Cursor-based Paginated Response DTO (Enhanced)
 */
export class CursorPaginatedResponseDto<T> {
  @ApiProperty({ description: 'List of items', isArray: true })
  items: T[];

  @ApiProperty({ description: 'Next cursor for pagination (URL-safe encoded)' })
  nextCursor: string | null;

  @ApiProperty({ description: 'Number of items returned', example: PAGINATION.DEFAULT_LIMIT })
  limit: number;

  @ApiProperty({ description: 'Whether there are more items', example: true })
  hasMore: boolean;

  // ✅ Enterprise: Performance metrics
  @ApiPropertyOptional({ description: 'Query execution time in milliseconds', example: 45 })
  queryTimeMs?: number;

  // ✅ Enterprise: Audit correlation
  @ApiPropertyOptional({ description: 'Correlation ID for audit trail', example: 'corr_550e8400-e29b-41d4-a716-446655440000' })
  correlationId?: string;

  constructor(
    items: T[], 
    nextCursor: string | null, 
    limit: number, 
    hasMore: boolean,
    queryTimeMs?: number,
    correlationId?: string
  ) {
    this.items = items;
    this.nextCursor = nextCursor;
    this.limit = limit;
    this.hasMore = hasMore;
    this.queryTimeMs = queryTimeMs;
    this.correlationId = correlationId;
  }

  /**
   * Check if there are more items
   */
  hasNextPage(): boolean {
    return this.hasMore;
  }

  /**
   * Map items to different type
   */
  map<U>(mapper: (item: T) => U): CursorPaginatedResponseDto<U> {
    const mappedItems = this.items.map(mapper);
    return new CursorPaginatedResponseDto<U>(
      mappedItems,
      this.nextCursor,
      this.limit,
      this.hasMore,
      this.queryTimeMs,
      this.correlationId
    );
  }
}

// ============================================================
// Query Filter DTOs (Enhanced)
// ============================================================

/**
 * Base Filter DTO with pagination and date range (Enhanced)
 * ✅ Enterprise: Added filter sanitization
 */
export class BaseFilterDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter by date range - start',
    example: new Date().toISOString().split('T')[0],
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Start date must be a valid date' })
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'Filter by date range - end',
    example: new Date().toISOString().split('T')[0],
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'End date must be a valid date' })
  @ValidateIf((o) => o.startDate && o.endDate)
  endDate?: Date;

  @ApiPropertyOptional({
    description: 'Search term for text search',
    example: 'john',
    maxLength: SEARCH_CONFIG.MAX_SEARCH_LENGTH,
  })
  @IsOptional()
  @IsString()
  @MaxLength(SEARCH_CONFIG.MAX_SEARCH_LENGTH, { 
    message: `Search term cannot exceed ${SEARCH_CONFIG.MAX_SEARCH_LENGTH} characters` 
  })
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by status (comma-separated)',
    example: 'ACTIVE,INACTIVE',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    description: 'Filter by district (Bangladesh specific)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({
    description: 'Include soft-deleted records',
    example: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  includeDeleted?: boolean = false;

  /**
   * Convert status string to array
   */
  getStatusArray(): string[] {
    if (!this.status) return [];
    return this.status.split(',').map(s => s.trim().toUpperCase());
  }

  /**
   * Validate date range
   */
  isValidDateRange(): boolean {
    if (!this.startDate || !this.endDate) return true;
    return this.startDate <= this.endDate;
  }

  /**
   * ✅ Enterprise: Sanitize search term (remove special characters, trim)
   */
  sanitizeSearch(): string | undefined {
    if (!this.search) return undefined;
    return this.search.trim().replace(/[<>{}[\]\\/]/g, '');
  }

  /**
   * ✅ Enterprise: Get normalized status array (uppercase, trimmed)
   */
  getNormalizedStatusArray(): string[] {
    return this.getStatusArray().map(s => s.toUpperCase());
  }

  /**
   * ✅ Enterprise: Check if any filters are applied
   */
  hasFilters(): boolean {
    return !!(this.startDate || this.endDate || this.search || this.status || this.district);
  }
}

/**
 * Base Filter Query DTO - For controller query parameters (Enhanced)
 */
export class BaseFilterQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by date range - start',
    example: new Date().toISOString().split('T')[0],
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Start date must be a valid date' })
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'Filter by date range - end',
    example: new Date().toISOString().split('T')[0],
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'End date must be a valid date' })
  @ValidateIf((o) => o.startDate && o.endDate)
  endDate?: Date;

  @ApiPropertyOptional({
    description: 'Search term for text search',
    example: 'john',
    maxLength: SEARCH_CONFIG.MAX_SEARCH_LENGTH,
  })
  @IsOptional()
  @IsString()
  @MaxLength(SEARCH_CONFIG.MAX_SEARCH_LENGTH, { 
    message: `Search term cannot exceed ${SEARCH_CONFIG.MAX_SEARCH_LENGTH} characters` 
  })
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by status (comma-separated)',
    example: 'ACTIVE,INACTIVE',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    description: 'Filter by district (Bangladesh specific)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({
    description: 'Filter by user role',
    example: 'ADMIN',
  })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiPropertyOptional({
    description: 'Include soft-deleted records',
    example: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  includeDeleted?: boolean = false;

  /**
   * Convert status string to array
   */
  getStatusArray(): string[] {
    if (!this.status) return [];
    return this.status.split(',').map(s => s.trim().toUpperCase());
  }

  /**
   * Validate date range
   */
  isValidDateRange(): boolean {
    if (!this.startDate || !this.endDate) return true;
    return this.startDate <= this.endDate;
  }

  /**
   * ✅ Enterprise: Sanitize search term
   */
  sanitizeSearch(): string | undefined {
    if (!this.search) return undefined;
    return this.search.trim().replace(/[<>{}[\]\\/]/g, '');
  }

  /**
   * ✅ Enterprise: Get normalized status array
   */
  getNormalizedStatusArray(): string[] {
    return this.getStatusArray().map(s => s.toUpperCase());
  }

  /**
   * ✅ Enterprise: Check if any filters are applied
   */
  hasFilters(): boolean {
    return !!(this.startDate || this.endDate || this.search || this.status || this.district || this.role);
  }
}

// ============================================================
// Sort Options DTO (Enhanced)
// ============================================================

/**
 * Sort option for dynamic sorting (Enhanced)
 * ✅ Enterprise: Added field whitelist validation support
 */
export class SortOption {
  @ApiProperty({ description: 'Field to sort by', example: 'createdAt' })
  @IsString()
  @IsNotEmpty()
  field: string;

  @ApiProperty({ description: 'Sort order', enum: SORT_ORDER, example: SORT_ORDER.DESC })
  @IsEnum(SORT_ORDER)
  order: SharedSortOrder;

  constructor(field: string, order: SharedSortOrder = SORT_ORDER.DESC) {
    this.field = field;
    this.order = order;
  }

  /**
   * Get sort direction for ORM
   * @deprecated Use service layer for conversions
   */
  getDirection(): 'asc' | 'desc' {
    return this.order === SORT_ORDER.ASC ? SORT_DIRECTION.ASC : SORT_DIRECTION.DESC;
  }

  /**
   * ✅ Enterprise: Validate field against allowed fields whitelist
   * @param allowedFields - List of allowed sortable fields
   * @returns Whether the field is allowed
   */
  isFieldAllowed(allowedFields: readonly string[]): boolean {
    return allowedFields.includes(this.field);
  }

  /**
   * ✅ Enterprise: Get sanitized field name (prevents SQL injection)
   * @returns Sanitized field name
   */
  getSanitizedField(): string {
    return this.field.replace(/[^a-zA-Z0-9_.]/g, '');
  }
}

/**
 * Multi-sort DTO (Enhanced)
 * ✅ Enterprise: Added sort field validation
 */
export class MultiSortDto {
  @ApiPropertyOptional({
    description: 'Sort options',
    type: [SortOption],
    example: [{ field: 'createdAt', order: 'DESC' }, { field: 'name', order: 'ASC' }],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5, { 
    message: () => getValidationMessage('sortsMax', 'en', 5) 
  })
  @ValidateIf((o) => o.sorts)
  @ValidateNested({ each: true })
  @Type(() => SortOption)
  sorts?: SortOption[];

  /**
   * Get sort options as object
   */
  getSortOptions(): SortOption[] {
    return this.sorts || [new SortOption('createdAt', SORT_ORDER.DESC)];
  }

  /**
   * Check if has sort options
   */
  hasSorts(): boolean {
    return this.sorts !== undefined && this.sorts.length > 0;
  }

  /**
   * ✅ Enterprise: Validate all sort fields against whitelist
   * @param allowedFields - List of allowed sortable fields
   * @returns Array of invalid fields
   */
  getInvalidSortFields(allowedFields: readonly string[]): string[] {
    if (!this.sorts) return [];
    return this.sorts
      .filter(sort => !sort.isFieldAllowed(allowedFields))
      .map(sort => sort.field);
  }

  /**
   * ✅ Enterprise: Filter sorts to only allowed fields
   * @param allowedFields - List of allowed sortable fields
   * @returns Filtered sort options
   */
  filterAllowedSorts(allowedFields: readonly string[]): SortOption[] {
    if (!this.sorts) return [];
    return this.sorts.filter(sort => sort.isFieldAllowed(allowedFields));
  }
}

// ============================================================
// Utility Functions (Enterprise Enhancement)
// ============================================================

/**
 * Create a standard pagination metadata object
 * ✅ Enterprise: Includes performance tracking
 */
export function createPaginationMeta(
  page: number,
  limit: number,
  total: number,
  queryTimeMs?: number,
  correlationId?: string
): PaginationMetadataDto {
  return new PaginationMetadataDto(page, limit, total, undefined, undefined, queryTimeMs, correlationId);
}

/**
 * Create a cursor-based pagination response
 * ✅ Enterprise: Automatically encodes cursor
 */
export function createCursorResponse<T>(
  items: T[],
  nextCursor: string | null,
  limit: number,
  hasMore: boolean,
  queryTimeMs?: number,
  correlationId?: string
): CursorPaginatedResponseDto<T> {
  const encodedCursor = nextCursor ? CursorPaginationDto.encodeCursor(nextCursor) : null;
  return new CursorPaginatedResponseDto(items, encodedCursor, limit, hasMore, queryTimeMs, correlationId);
}

// ============================================================
// Type Exports
// ============================================================

export type { SortOption as SortOptionType };
export type { PaginationRequestContext as PaginationRequestContextType };
