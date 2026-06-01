/**
 * Pagination DTOs - Pure Data Transport Objects
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
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ✅ Phase-1: Import from shared-constants (centralized configuration)
import { 
  PAGINATION, 
  SORT_ORDER, 
  PAGINATION_TYPE,
  SORT_DIRECTION,
  DATE_RANGE,
  SEARCH_CONFIG,
} from '@vubon/shared-constants';

// ✅ Phase-1: Import types from shared-types
import type { SortOrder as SharedSortOrder, PaginationType as SharedPaginationType } from '@vubon/shared-types';

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
// Request DTOs
// ============================================================

/**
 * Pagination Query DTO - For controller query parameters
 * 
 * @example
 * GET /users?page=1&limit=20&sortBy=createdAt&sortOrder=DESC
 */
export class PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Page number (1-indexed)',
    example: PAGINATION.DEFAULT_PAGE,
    minimum: PAGINATION.MIN_PAGE,
    default: PAGINATION.DEFAULT_PAGE,
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'Page must be a number' })
  @Min(PAGINATION.MIN_PAGE, { message: `Page must be at least ${PAGINATION.MIN_PAGE}` })
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
  @IsNumber({}, { message: 'Limit must be a number' })
  @Min(PAGINATION.MIN_LIMIT, { message: `Limit must be at least ${PAGINATION.MIN_LIMIT}` })
  @Max(PAGINATION.MAX_LIMIT, { message: `Limit cannot exceed ${PAGINATION.MAX_LIMIT}` })
  @IsOptional()
  limit?: number = PAGINATION.DEFAULT_LIMIT;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    example: 'createdAt',
    default: 'createdAt',
  })
  @IsOptional()
  @IsString({ message: 'Sort by must be a string' })
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: SORT_ORDER,
    example: SORT_ORDER.DESC,
    default: SORT_ORDER.DESC,
  })
  @IsOptional()
  @IsEnum(SORT_ORDER, { message: 'Sort order must be ASC or DESC' })
  sortOrder?: SharedSortOrder = SORT_ORDER.DESC;

  /**
   * Calculate skip value for database queries
   * @deprecated Use service layer for calculations
   */
  getSkip(): number {
    return ((this.page || PAGINATION.DEFAULT_PAGE) - 1) * (this.limit || PAGINATION.DEFAULT_LIMIT);
  }

  /**
   * Get sort direction as string for ORM
   * @deprecated Use service layer for conversions
   */
  getSortDirection(): 'asc' | 'desc' {
    return this.sortOrder === SORT_ORDER.ASC ? SORT_DIRECTION.ASC : SORT_DIRECTION.DESC;
  }

  /**
   * Get validated page number
   */
  getValidatedPage(): number {
    return Math.max(PAGINATION.MIN_PAGE, this.page || PAGINATION.DEFAULT_PAGE);
  }

  /**
   * Get validated limit
   */
  getValidatedLimit(): number {
    return Math.min(PAGINATION.MAX_LIMIT, Math.max(PAGINATION.MIN_LIMIT, this.limit || PAGINATION.DEFAULT_LIMIT));
  }
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
    minimum: PAGINATION.MIN_PAGE,
    default: PAGINATION.DEFAULT_PAGE,
    required: false,
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'Page must be a number' })
  @Min(PAGINATION.MIN_PAGE, { message: `Page must be at least ${PAGINATION.MIN_PAGE}` })
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
  @IsNumber({}, { message: 'Limit must be a number' })
  @Min(PAGINATION.MIN_LIMIT, { message: `Limit must be at least ${PAGINATION.MIN_LIMIT}` })
  @Max(PAGINATION.MAX_LIMIT, { message: `Limit cannot exceed ${PAGINATION.MAX_LIMIT}` })
  @IsOptional()
  limit: number = PAGINATION.DEFAULT_LIMIT;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    example: 'createdAt',
    default: 'createdAt',
  })
  @IsOptional()
  @IsString({ message: 'Sort by must be a string' })
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: SORT_ORDER,
    example: SORT_ORDER.DESC,
    default: SORT_ORDER.DESC,
  })
  @IsOptional()
  @IsEnum(SORT_ORDER, { message: 'Sort order must be ASC or DESC' })
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
 * Cursor-based Pagination Request DTO
 * For large datasets (better performance)
 * 
 * @example
 * {
 *   "cursor": "usr_550e8400-e29b-41d4-a716-446655440000",
 *   "limit": 20,
 *   "sortBy": "createdAt",
 *   "sortOrder": "DESC"
 * }
 */
export class CursorPaginationDto {
  @ApiPropertyOptional({
    description: 'Cursor ID for pagination (last item ID from previous page)',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  cursor?: string;

  @ApiProperty({
    description: 'Number of items per page',
    example: PAGINATION.DEFAULT_LIMIT,
    minimum: PAGINATION.MIN_LIMIT,
    maximum: PAGINATION.MAX_LIMIT,
    default: PAGINATION.DEFAULT_LIMIT,
    required: false,
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'Limit must be a number' })
  @Min(PAGINATION.MIN_LIMIT, { message: `Limit must be at least ${PAGINATION.MIN_LIMIT}` })
  @Max(PAGINATION.MAX_LIMIT, { message: `Limit cannot exceed ${PAGINATION.MAX_LIMIT}` })
  @IsOptional()
  limit: number = PAGINATION.DEFAULT_LIMIT;

  @ApiPropertyOptional({
    description: 'Field to sort by (must have unique index)',
    example: 'createdAt',
    default: 'createdAt',
  })
  @IsOptional()
  @IsString({ message: 'Sort by must be a string' })
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: SORT_ORDER,
    example: SORT_ORDER.DESC,
    default: SORT_ORDER.DESC,
  })
  @IsOptional()
  @IsEnum(SORT_ORDER, { message: 'Sort order must be ASC or DESC' })
  sortOrder?: SharedSortOrder = SORT_ORDER.DESC;

  /**
   * Get pagination type
   */
  getPaginationType(): SharedPaginationType {
    return this.cursor ? PAGINATION_TYPE.CURSOR : PAGINATION_TYPE.OFFSET;
  }

  constructor(limit: number = PAGINATION.DEFAULT_LIMIT, cursor?: string) {
    this.limit = limit;
    this.cursor = cursor;
  }
}

// ============================================================
// Response DTOs
// ============================================================

/**
 * Pagination Metadata DTO
 */
export class PaginationMetadataDto {
  @ApiProperty({ description: 'Current page number', example: 1, minimum: PAGINATION.MIN_PAGE })
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

  constructor(page: number, limit: number, total: number, nextCursor?: string, prevCursor?: string) {
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.totalPages = Math.ceil(total / limit);
    this.hasNextPage = page < this.totalPages;
    this.hasPreviousPage = page > 1;
    this.nextCursor = nextCursor;
    this.prevCursor = prevCursor;
  }
}

/**
 * Paginated Response DTO (Offset/Limit based)
 */
export class PaginatedResponseDto<T> {
  @ApiProperty({ description: 'List of items', isArray: true })
  items: T[];

  @ApiProperty({ description: 'Pagination metadata', type: PaginationMetadataDto })
  pagination: PaginationMetadataDto;

  constructor(items: T[], total: number, page: number, limit: number, nextCursor?: string, prevCursor?: string) {
    this.items = items;
    this.pagination = new PaginationMetadataDto(page, limit, total, nextCursor, prevCursor);
  }

  /**
   * Create from array of items with pagination
   */
  static from<T>(
    items: T[],
    total: number,
    paginationDto: PaginationDto | PaginationQueryDto,
  ): PaginatedResponseDto<T> {
    const page = 'page' in paginationDto ? paginationDto.page : PAGINATION.DEFAULT_PAGE;
    const limit = 'limit' in paginationDto ? paginationDto.limit : PAGINATION.DEFAULT_LIMIT;
    return new PaginatedResponseDto<T>(items, total, page, limit);
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
}

/**
 * Cursor-based Paginated Response DTO
 */
export class CursorPaginatedResponseDto<T> {
  @ApiProperty({ description: 'List of items', isArray: true })
  items: T[];

  @ApiProperty({ description: 'Next cursor for pagination' })
  nextCursor: string | null;

  @ApiProperty({ description: 'Number of items returned', example: PAGINATION.DEFAULT_LIMIT })
  limit: number;

  @ApiProperty({ description: 'Whether there are more items', example: true })
  hasMore: boolean;

  constructor(items: T[], nextCursor: string | null, limit: number, hasMore: boolean) {
    this.items = items;
    this.nextCursor = nextCursor;
    this.limit = limit;
    this.hasMore = hasMore;
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
    );
  }
}

// ============================================================
// Query Filter DTOs
// ============================================================

/**
 * Base Filter DTO with pagination and date range
 */
export class BaseFilterDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter by date range - start',
    example: DATE_RANGE.DEFAULT_START,
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Start date must be a valid date' })
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'Filter by date range - end',
    example: DATE_RANGE.DEFAULT_END,
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
    maxLength: SEARCH_CONFIG.MAX_LENGTH,
  })
  @IsOptional()
  @IsString({ message: 'Search term must be a string' })
  @MaxLength(SEARCH_CONFIG.MAX_LENGTH, { message: `Search term cannot exceed ${SEARCH_CONFIG.MAX_LENGTH} characters` })
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by status (comma-separated)',
    example: 'ACTIVE,INACTIVE',
  })
  @IsOptional()
  @IsString({ message: 'Status must be a string' })
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
}

/**
 * Base Filter Query DTO - For controller query parameters
 */
export class BaseFilterQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by date range - start',
    example: DATE_RANGE.DEFAULT_START,
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Start date must be a valid date' })
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'Filter by date range - end',
    example: DATE_RANGE.DEFAULT_END,
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
    maxLength: SEARCH_CONFIG.MAX_LENGTH,
  })
  @IsOptional()
  @IsString({ message: 'Search term must be a string' })
  @MaxLength(SEARCH_CONFIG.MAX_LENGTH, { message: `Search term cannot exceed ${SEARCH_CONFIG.MAX_LENGTH} characters` })
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by status (comma-separated)',
    example: 'ACTIVE,INACTIVE',
  })
  @IsOptional()
  @IsString({ message: 'Status must be a string' })
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
}

// ============================================================
// Sort Options DTO
// ============================================================

/**
 * Sort option for dynamic sorting
 */
export class SortOption {
  @ApiProperty({ description: 'Field to sort by', example: 'createdAt' })
  @IsString()
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
   */
  getDirection(): 'asc' | 'desc' {
    return this.order === SORT_ORDER.ASC ? SORT_DIRECTION.ASC : SORT_DIRECTION.DESC;
  }
}

/**
 * Multi-sort DTO
 */
export class MultiSortDto {
  @ApiPropertyOptional({
    description: 'Sort options',
    type: [SortOption],
    example: [{ field: 'createdAt', order: 'DESC' }, { field: 'name', order: 'ASC' }],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(PAGINATION.MAX_SORT_FIELDS, { message: `Maximum ${PAGINATION.MAX_SORT_FIELDS} sort fields allowed` })
  @ValidateIf((o) => o.sorts)
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
}

// ============================================================
// Type Exports
// ============================================================

export type { SortOption as SortOptionType };
