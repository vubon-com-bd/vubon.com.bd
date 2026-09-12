import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseSwaggerResponse {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation successful' })
  message: string;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  timestamp: string;

  @ApiPropertyOptional({ example: '550e8400-e29b-41d4-a716-446655440000' })
  requestId?: string;

  constructor(
    success: boolean = true,
    message: string = 'Operation successful',
    statusCode: number = 200,
    timestamp: string = new Date().toISOString(),
    requestId?: string
  ) {
    this.success = success;
    this.message = message;
    this.statusCode = statusCode;
    this.timestamp = timestamp;
    this.requestId = requestId;
  }
}

export class ErrorSwaggerResponse {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 'Validation failed' })
  message: string;

  @ApiProperty({ example: ['Field is required'] })
  errors: string[];

  @ApiProperty({ example: 422 })
  statusCode: number;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  timestamp: string;

  @ApiPropertyOptional({ example: '550e8400-e29b-41d4-a716-446655440000' })
  requestId?: string;

  constructor(
    success: boolean = false,
    message: string = 'Validation failed',
    errors: string[] = ['Field is required'],
    statusCode: number = 422,
    timestamp: string = new Date().toISOString(),
    requestId?: string
  ) {
    this.success = success;
    this.message = message;
    this.errors = errors;
    this.statusCode = statusCode;
    this.timestamp = timestamp;
    this.requestId = requestId;
  }
}
