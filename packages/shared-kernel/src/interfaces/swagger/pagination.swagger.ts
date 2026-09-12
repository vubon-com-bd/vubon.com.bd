import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationSwaggerRequest {
  @ApiPropertyOptional({ example: 1, description: 'Page number' })
  page: number = 1;

  @ApiPropertyOptional({ example: 10, description: 'Items per page' })
  limit: number = 10;

  @ApiPropertyOptional({ example: 'createdAt', description: 'Sort field' })
  sortBy: string = 'createdAt';

  @ApiPropertyOptional({ example: 'desc', enum: ['asc', 'desc'] })
  sortOrder: 'asc' | 'desc' = 'desc';

  @ApiPropertyOptional({ example: 'search term', description: 'Search query' })
  search?: string;

  constructor(
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
    search?: string
  ) {
    this.page = page;
    this.limit = limit;
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
    this.search = search;
  }
}

export class PaginationSwaggerResponse {
  @ApiProperty({ example: 100 })
  total: number = 0;

  @ApiProperty({ example: 1 })
  page: number = 1;

  @ApiProperty({ example: 10 })
  limit: number = 10;

  @ApiProperty({ example: 10 })
  totalPages: number = 0;

  @ApiProperty({ example: true })
  hasNext: boolean = false;

  @ApiProperty({ example: false })
  hasPrev: boolean = false;

  constructor(
    total: number = 0,
    page: number = 1,
    limit: number = 10,
    totalPages: number = 0,
    hasNext: boolean = false,
    hasPrev: boolean = false
  ) {
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = totalPages;
    this.hasNext = hasNext;
    this.hasPrev = hasPrev;
  }
}
