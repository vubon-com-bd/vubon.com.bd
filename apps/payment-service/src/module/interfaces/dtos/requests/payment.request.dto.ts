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
  PAYMENT_METHOD,
  PAYMENT_GATEWAY,
  PAYMENT_STATUS,
} from '@vubon/shared-constants/business/payment';

const METHOD_VALUES = Object.values(PAYMENT_METHOD) as string[];
const GATEWAY_VALUES = Object.values(PAYMENT_GATEWAY) as string[];
const STATUS_VALUES = Object.values(PAYMENT_STATUS) as string[];

// ─── Initiate (POST /payments) ─────────────
export class InitiatePaymentHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly orderId!: string;

  @ApiProperty({ enum: METHOD_VALUES, example: 'card' })
  @IsEnum(METHOD_VALUES)
  readonly method!: string;

  @ApiPropertyOptional({ enum: GATEWAY_VALUES, example: 'stripe' })
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

  @ApiPropertyOptional({ example: 'https://app.vubon.com.bd/payments/callback' })
  @IsOptional()
  @IsString()
  readonly returnUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly metadata?: Readonly<Record<string, unknown>>;
}

// ─── Confirm (POST /payments/:id/confirm) ──
export class ConfirmPaymentHttpDTO {
  @ApiPropertyOptional({ example: 'pi_3OaBcDeFgHiJkLmN' })
  @IsOptional()
  @IsString()
  readonly gatewayReference?: string;

  @ApiPropertyOptional({ example: 'sig_abc123...' })
  @IsOptional()
  @IsString()
  readonly gatewaySignature?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly gatewayData?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional({ example: 1500.0 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly confirmedAmount?: number;

  @ApiPropertyOptional({ example: 'BDT' })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  readonly currency?: string;
}

// ─── Cancel (POST /payments/:id/cancel) ────
export class CancelPaymentHttpDTO {
  @ApiPropertyOptional({ example: 'Customer requested cancellation' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly reason?: string;
}

// ─── Retry (POST /payments/:id/retry) ──────
export class RetryPaymentHttpDTO {
  @ApiPropertyOptional({ enum: GATEWAY_VALUES })
  @IsOptional()
  @IsEnum(GATEWAY_VALUES)
  readonly gateway?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly reason?: string;
}

// ─── Verify (POST /payments/:id/verify) ────
export class VerifyPaymentHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly gatewaySignature?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly gatewayData?: Readonly<Record<string, unknown>>;
}

// ─── List (GET /payments) ──────────────────
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

  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly orderId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly userId?: string;

  @ApiPropertyOptional({ enum: STATUS_VALUES })
  @IsOptional()
  @IsEnum(STATUS_VALUES)
  readonly status?: string;

  @ApiPropertyOptional({ enum: METHOD_VALUES })
  @IsOptional()
  @IsEnum(METHOD_VALUES)
  readonly method?: string;

  @ApiPropertyOptional({ enum: GATEWAY_VALUES })
  @IsOptional()
  @IsEnum(GATEWAY_VALUES)
  readonly gateway?: string;

  @ApiPropertyOptional({ example: '2024-01-01T00:00:00Z' })
  @IsOptional()
  @IsString()
  readonly fromDate?: string;

  @ApiPropertyOptional({ example: '2024-12-31T23:59:59Z' })
  @IsOptional()
  @IsString()
  readonly toDate?: string;
}
