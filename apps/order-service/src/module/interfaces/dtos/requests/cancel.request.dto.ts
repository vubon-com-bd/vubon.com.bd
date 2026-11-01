/**
 * Cancel HTTP Request DTOs
 * @module order-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, Length, MinLength } from 'class-validator';
import { ORDER_CANCEL_REASON } from '@vubon/shared-constants/business/order';

const REASON_VALUES = Object.values(ORDER_CANCEL_REASON) as string[];

export class RequestCancelHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly orderId!: string;

  @ApiProperty({ enum: REASON_VALUES, example: 'customer_request' })
  @IsString()
  @MinLength(1)
  readonly reason!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(0, 500)
  readonly notes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(8)
  readonly idempotencyKey?: string;
}

export class ApproveCancelHttpDTO {
  @ApiPropertyOptional({ example: 1500.0 })
  @IsOptional()
  readonly refundAmount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly notes?: string;
}

export class RejectCancelHttpDTO {
  @ApiProperty({ example: 'Order already shipped' })
  @IsString()
  @MinLength(3)
  @Length(3, 500)
  readonly reason!: string;
}
