// packages/backend-service/src/auth/module/application/dtos/common/pagination.dto.ts

/**
 * Pagination request parameters DTO
 * Used for paginated API requests
 */
export interface PaginationRequestDto {
  /**
   * Current page number (1-indexed)
   * @default 1
   */
  page?: number;

  /**
   * Number of items per page
   * @default 10
   */
  limit?: number;

  /**
   * Field to sort by
   */
  sortBy?: string;

  /**
   * Sort order
   * @default 'asc'
   */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Pagination metadata DTO
 * Contains pagination information for list responses
 */
export interface PaginationMetadataDto {
  /**
   * Current page number (1-indexed)
   */
  page: number;

  /**
   * Number of items per page
   */
  limit: number;

  /**
   * Total number of items available
   */
  total: number;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Indicates whether there is a next page
   */
  hasNext: boolean;

  /**
   * Indicates whether there is a previous page
   */
  hasPrevious: boolean;

  /**
   * Next page number (null if no next page)
   */
  nextPage: number | null;

  /**
   * Previous page number (null if no previous page)
   */
  previousPage: number | null;
}

/**
 * Paginated response DTO
 * Wraps a list of items with pagination metadata
 */
export class PaginatedResponseDto<T> {
  /**
   * List of items for the current page
   */
  readonly items: T[];

  /**
   * Pagination metadata
   */
  readonly metadata: PaginationMetadataDto;

  constructor(items: T[], metadata: PaginationMetadataDto) {
    this.items = items;
    this.metadata = metadata;
  }

  /**
   * Creates a paginated response from items and total count
   */
  static from<T>(items: T[], total: number, page: number, limit: number): PaginatedResponseDto<T> {
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;
    const nextPage = hasNext ? page + 1 : null;
    const previousPage = hasPrevious ? page - 1 : null;

    const metadata: PaginationMetadataDto = {
      page,
      limit,
      total,
      totalPages,
      hasNext,
      hasPrevious,
      nextPage,
      previousPage,
    };

    return new PaginatedResponseDto(items, metadata);
  }

  /**
   * Creates an empty paginated response
   */
  static empty<T>(page: number = 1, limit: number = 10): PaginatedResponseDto<T> {
    return PaginatedResponseDto.from<T>([], 0, page, limit);
  }

  /**
   * Maps items to a different type using a transform function
   */
  map<U>(fn: (item: T) => U): PaginatedResponseDto<U> {
    const mappedItems = this.items.map(fn);
    return new PaginatedResponseDto<U>(mappedItems, this.metadata);
  }

  /**
   * Checks if the response has any items
   */
  hasItems(): boolean {
    return this.items.length > 0;
  }

  /**
   * Checks if the response is empty
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Gets the current page number
   */
  getPage(): number {
    return this.metadata.page;
  }

  /**
   * Gets the total number of items
   */
  getTotal(): number {
    return this.metadata.total;
  }

  /**
   * Gets the total number of pages
   */
  getTotalPages(): number {
    return this.metadata.totalPages;
  }

  /**
   * Checks if there is a next page
   */
  hasNextPage(): boolean {
    return this.metadata.hasNext;
  }

  /**
   * Checks if there is a previous page
   */
  hasPreviousPage(): boolean {
    return this.metadata.hasPrevious;
  }

  /**
   * Gets the next page number
   */
  getNextPage(): number | null {
    return this.metadata.nextPage;
  }

  /**
   * Gets the previous page number
   */
  getPreviousPage(): number | null {
    return this.metadata.previousPage;
  }
}

/**
 * Default pagination values
 */
export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
  SORT_ORDER: 'asc' as const,
} as const;

/**
 * Validates and normalizes pagination parameters
 */
export function normalizePaginationParams(
  params: PaginationRequestDto
): Required<PaginationRequestDto> {
  const page = Math.max(1, params.page ?? DEFAULT_PAGINATION.PAGE);
  const limit = Math.min(
    DEFAULT_PAGINATION.MAX_LIMIT,
    Math.max(1, params.limit ?? DEFAULT_PAGINATION.LIMIT)
  );
  const sortBy = params.sortBy ?? 'createdAt';
  const sortOrder = params.sortOrder ?? DEFAULT_PAGINATION.SORT_ORDER;

  return {
    page,
    limit,
    sortBy,
    sortOrder,
  };
}
