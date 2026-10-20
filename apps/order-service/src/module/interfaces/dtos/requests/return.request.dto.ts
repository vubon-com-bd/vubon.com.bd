/**
 * Return HTTP Request DTOs
 * @module order-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MinLength,
} from 'class-validator';
import { ORDER_RETURN_REASON } from '@vubon/shared-constants/business/order';

const REASON_VALUES = Object.values(ORDER_RETURN_REASON) as string[];

export class RequestReturnHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly orderId!: string;

  @ApiProperty({ enum: REASON_VALUES, example: 'defective' })
  @IsString()
  @MinLength(1)
  readonly reason!: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  readonly itemIds!: readonly string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  readonly images?: readonly string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(0, 1000)
  readonly notes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(8)
  readonly idempotencyKey?: string;
}

export class ApproveReturnHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly notes?: string;
}

export class RejectReturnHttpDTO {
  @ApiProperty({ example: 'Item not eligible for return' })
  @IsString()
  @MinLength(3)
  @Length(3, 500)
  readonly reason!: string;
}

export class CompleteReturnHttpDTO {
  @ApiProperty({ example: 1500.0 })
  readonly refundAmount!: number;

  @ApiPropertyOptional()
  @IsOptional()
  readonly restockFee?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly notes?: string;
}
