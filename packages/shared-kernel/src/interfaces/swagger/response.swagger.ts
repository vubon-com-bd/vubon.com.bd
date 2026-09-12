import { ApiProperty } from '@nestjs/swagger';
import { BaseSwaggerResponse } from './base.swagger';

export class ResponseSwagger<T> extends BaseSwaggerResponse {
  @ApiProperty({ description: 'Response data' })
  data: T;

  constructor(
    data: T,
    success: boolean = true,
    message: string = 'Success',
    statusCode: number = 200,
    timestamp?: string,
    requestId?: string
  ) {
    super(success, message, statusCode, timestamp || new Date().toISOString(), requestId);
    this.data = data;
  }
}

export class PaginatedResponseSwagger<T> extends BaseSwaggerResponse {
  @ApiProperty({ description: 'Response data array' })
  data: T[];

  @ApiProperty({ description: 'Pagination metadata' })
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };

  constructor(
    data: T[],
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    },
    success: boolean = true,
    message: string = 'Success',
    statusCode: number = 200,
    timestamp?: string,
    requestId?: string
  ) {
    super(success, message, statusCode, timestamp || new Date().toISOString(), requestId);
    this.data = data;
    this.pagination = pagination;
  }
}
