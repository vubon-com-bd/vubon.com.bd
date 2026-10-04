/**
 * Transaction HTTP Request DTOs
 * @module payment-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateTransactionHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly paymentId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly orderId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly userId?: string;

  @ApiProperty({ example: 'payment' })
  @IsString()
  readonly type!: string;

  @ApiProperty({ example: 1500.0 })
  @IsString()
  readonly amount!: string;

  @ApiProperty({ example: 'BDT' })
  @IsString()
  @Length(3, 3)
  readonly currency!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly gateway?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly gatewayTransactionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly reference?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly idempotencyKey?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class ListTransactionsHttpQueryDTO {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ example: 20, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly paymentId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly orderId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly gateway?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly toDate?: string;
}
