/**
 * Payment HTTP Request DTOs
 * @module payment-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import {
  PAYMENT_GATEWAY,
  PAYMENT_METHOD,
} from '@vubon/shared-constants/business/payment';

const METHOD_VALUES = Object.values(PAYMENT_METHOD) as string[];
const GATEWAY_VALUES = Object.values(PAYMENT_GATEWAY) as string[];

export class InitiatePaymentHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly orderId!: string;

  @ApiProperty({ enum: METHOD_VALUES, example: 'bkash' })
  @IsEnum(METHOD_VALUES)
  readonly method!: string;

  @ApiPropertyOptional({ enum: GATEWAY_VALUES, example: 'bkash' })
  @IsOptional()
  @IsEnum(GATEWAY_VALUES)
  readonly gateway?: string;

  @ApiProperty({ example: 1500.0, minimum: 1 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  readonly amount!: number;

  @ApiProperty({ example: 'BDT', minLength: 3, maxLength: 3 })
  @IsString()
  @Length(3, 3)
  readonly currency!: string;

  @ApiPropertyOptional({ example: 'https://shop.vubon.com.bd/payment/return' })
  @IsOptional()
  @IsString()
  readonly returnUrl?: string;

  @ApiPropertyOptional({ example: 'idem-key-abc-123456' })
  @IsOptional()
  @IsString()
  @MinLength(8)
  readonly idempotencyKey?: string;

  @ApiPropertyOptional({ example: { source: 'web' } })
  @IsOptional()
  @IsObject()
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class VerifyPaymentHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly paymentId!: string;

  @ApiPropertyOptional({ example: 'sig_abc123...' })
  @IsOptional()
  @IsString()
  readonly gatewaySignature?: string;

  @ApiPropertyOptional({ example: { trxID: 'ABC123' } })
  @IsOptional()
  @IsObject()
  readonly gatewayData?: Readonly<Record<string, unknown>>;
}

export class CapturePaymentHttpDTO {
  @ApiPropertyOptional({ example: 1500.0 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  readonly amount?: number;

  @ApiPropertyOptional({ example: 'idem-capture-001' })
  @IsOptional()
  @IsString()
  @MinLength(8)
  readonly idempotencyKey?: string;
}

export class FailPaymentHttpDTO {
  @ApiProperty({ example: 'Gateway declined transaction' })
  @IsString()
  @MinLength(3)
  readonly reason!: string;

  @ApiPropertyOptional({ example: 'GATEWAY_DECLINED' })
  @IsOptional()
  @IsString()
  readonly code?: string;
}

export class CancelPaymentHttpDTO {
  @ApiPropertyOptional({ example: 'Customer requested cancellation' })
  @IsOptional()
  @IsString()
  readonly reason?: string;
}

export class RetryPaymentHttpDTO {
  @ApiPropertyOptional({ example: 'idem-retry-001' })
  @IsOptional()
  @IsString()
  @MinLength(8)
  readonly idempotencyKey?: string;
}

export class MarkChargebackHttpDTO {
  @ApiProperty({ example: 1500.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  readonly amount!: number;

  @ApiPropertyOptional({ example: 'Customer disputed' })
  @IsOptional()
  @IsString()
  readonly reason?: string;
}

export class ListPaymentsHttpQueryDTO {
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
  readonly orderId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly userId?: string;

  @ApiPropertyOptional({ example: 'pending' })
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional({ example: 'bkash' })
  @IsOptional()
  @IsString()
  readonly gateway?: string;

  @ApiPropertyOptional({ example: 'BDT' })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  readonly currency?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly toDate?: string;
}
