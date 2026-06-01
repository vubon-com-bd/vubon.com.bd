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

// ============================================================
// Enums
// ============================================================

/**
 * Sort order for pagination
 */
export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

/**
 * Pagination type
 */
export enum PaginationType {
  OFFSET = 'OFFSET',
  CURSOR = 'CURSOR',
}

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
    example: 1,
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'Page must be a number' })
  @Min(1, { message: 'Page must be at least 1' })
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 20,
    minimum: 1,
    maximum: 100,
    default: 20,
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'Limit must be a number' })
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(100, { message: 'Limit cannot exceed 100' })
  @IsOptional()
  limit?: number = 20;

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
    enum: SortOrder,
    example: SortOrder.DESC,
    default: SortOrder.DESC,
  })
  @IsOptional()
  @IsEnum(SortOrder, { message: 'Sort order must be ASC or DESC' })
  sortOrder?: SortOrder = SortOrder.DESC;

  /**
   * Calculate skip value for database queries
   */
  getSkip(): number {
    return ((this.page || 1) - 1) * (this.limit || 20);
  }

  /**
   * Get sort direction as string for ORM
   */
  getSortDirection(): 'asc' | 'desc' {
    return this.sortOrder === SortOrder.ASC ? 'asc' : 'desc';
  }

  /**
   * Get validated page number
   */
  getPage(): number {
    return Math.max(1, this.page || 1);
  }

  /**
   * Get validated limit
   */
  getLimit(): number {
    return Math.min(100, Math.max(1, this.limit || 20));
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
    example: 1,
    minimum: 1,
    default: 1,
    required: false,
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'Page must be a number' })
  @Min(1, { message: 'Page must be at least 1' })
  @IsOptional()
  page: number = 1;

  @ApiProperty({
    description: 'Number of items per page',
    example: 20,
    minimum: 1,
    maximum: 100,
    default: 20,
    required: false,
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'Limit must be a number' })
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(100, { message: 'Limit cannot exceed 100' })
  @IsOptional()
  limit: number = 20;

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
    enum: SortOrder,
    example: SortOrder.DESC,
    default: SortOrder.DESC,
  })
  @IsOptional()
  @IsEnum(SortOrder, { message: 'Sort order must be ASC or DESC' })
  sortOrder?: SortOrder = SortOrder.DESC;

  /**
   * Calculate skip value for database queries
   */
  getSkip(): number {
    return (this.page - 1) * this.limit;
  }

  /**
   * Get sort direction as string
   */
  getSortDirection(): 'asc' | 'desc' {
    return this.sortOrder === SortOrder.ASC ? 'asc' : 'desc';
  }

  constructor(page: number = 1, limit: number = 20) {
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
    example: 20,
    minimum: 1,
    maximum: 100,
    default: 20,
    required: false,
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'Limit must be a number' })
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(100, { message: 'Limit cannot exceed 100' })
  @IsOptional()
  limit: number = 20;

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
    enum: SortOrder,
    example: SortOrder.DESC,
    default: SortOrder.DESC,
  })
  @IsOptional()
  @IsEnum(SortOrder, { message: 'Sort order must be ASC or DESC' })
  sortOrder?: SortOrder = SortOrder.DESC;

  /**
   * Get pagination type
   */
  getType(): PaginationType {
    return this.cursor ? PaginationType.CURSOR : PaginationType.OFFSET;
  }

  constructor(limit: number = 20, cursor?: string) {
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
  @ApiProperty({ description: 'Current page number', example: 1, minimum: 1 })
  page: number;

  @ApiProperty({ description: 'Items per page', example: 20, minimum: 1, maximum: 100 })
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
    const page = 'page' in paginationDto ? paginationDto.page : 1;
    const limit = 'limit' in paginationDto ? paginationDto.limit : 20;
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
}

/**
 * Cursor-based Paginated Response DTO
 */
export class CursorPaginatedResponseDto<T> {
  @ApiProperty({ description: 'List of items', isArray: true })
  items: T[];

  @ApiProperty({ description: 'Next cursor for pagination' })
  nextCursor: string | null;

  @ApiProperty({ description: 'Number of items returned', example: 20 })
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
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Start date must be a valid date' })
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'Filter by date range - end',
    example: '2024-01-31T23:59:59.999Z',
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
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'Search term must be a string' })
  @MaxLength(100, { message: 'Search term cannot exceed 100 characters' })
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by status (comma-separated)',
    example: 'ACTIVE,INACTIVE',
  })
  @IsOptional()
  @IsString({ message: 'Status must be a string' })
  status?: string;

  /**
   * Convert status string to array
   */
  getStatusArray(): string[] {
    if (!this.status) return [];
    return this.status.split(',').map(s => s.trim().toUpperCase());
  }
}

/**
 * Base Filter Query DTO - For controller query parameters
 */
export class BaseFilterQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by date range - start',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Start date must be a valid date' })
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'Filter by date range - end',
    example: '2024-01-31T23:59:59.999Z',
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
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'Search term must be a string' })
  @MaxLength(100, { message: 'Search term cannot exceed 100 characters' })
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
}

// ============================================================
// Sort Options DTO
// ============================================================

/**
 * Sort option for dynamic sorting
 */
export class SortOption {
  @ApiProperty({ description: 'Field to sort by', example: 'createdAt' })
  field: string;

  @ApiProperty({ description: 'Sort order', enum: SortOrder, example: SortOrder.DESC })
  order: SortOrder;

  constructor(field: string, order: SortOrder = SortOrder.DESC) {
    this.field = field;
    this.order = order;
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
  @ArrayMaxSize(5, { message: 'Maximum 5 sort fields allowed' })
  @ValidateIf((o) => o.sorts)
  sorts?: SortOption[];

  /**
   * Get sort options as object
   */
  getSortOptions(): SortOption[] {
    return this.sorts || [new SortOption('createdAt', SortOrder.DESC)];
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { SortOption as SortOptionType };
