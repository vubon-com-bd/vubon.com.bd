/**
 * Refund HTTP Request DTOs
 * @module payment-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class RequestRefundHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly paymentId!: string;

  @ApiPropertyOptional({ example: 500.0 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  readonly amount?: number;

  @ApiPropertyOptional({ example: 'Product damaged' })
  @IsOptional()
  @IsString()
  readonly reason?: string;

  @ApiPropertyOptional({ example: 'idem-refund-001' })
  @IsOptional()
  @IsString()
  @MinLength(8)
  readonly idempotencyKey?: string;
}

export class ApproveRefundHttpDTO {
  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly approvedBy?: string;
}

export class ProcessRefundHttpDTO {
  @ApiPropertyOptional({ example: 'gw_refund_123' })
  @IsOptional()
  @IsString()
  readonly gatewayRefundId?: string;
}

export class CompleteRefundHttpDTO {
  @ApiPropertyOptional({ example: 'gw_refund_123' })
  @IsOptional()
  @IsString()
  readonly gatewayRefundId?: string;
}

export class FailRefundHttpDTO {
  @ApiProperty({ example: 'Gateway rejected refund' })
  @IsString()
  @MinLength(3)
  readonly reason!: string;

  @ApiPropertyOptional({ example: 'REFUND_REJECTED' })
  @IsOptional()
  @IsString()
  readonly code?: string;
}

export class CancelRefundHttpDTO {
  @ApiPropertyOptional({ example: 'Customer withdrew request' })
  @IsOptional()
  @IsString()
  readonly reason?: string;
}

export class ListRefundsHttpQueryDTO {
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

  @ApiPropertyOptional({ example: 'pending' })
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly toDate?: string;
}
