import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsUUID,
  IsEnum,
  Length,
  MaxLength,
} from 'class-validator';

export enum PaymentMethodValueDto {
  CARD = 'card',
  MOBILE_BANKING = 'mobile_banking',
  WALLET = 'wallet',
  CASH_ON_DELIVERY = 'cash_on_delivery',
  BANK_TRANSFER = 'bank_transfer',
  CRYPTO = 'crypto',
}

export enum PaymentGatewayValueDto {
  STRIPE = 'stripe',
  PAYPAL = 'paypal',
  BKASH = 'bkash',
  NAGAD = 'nagad',
  ROCKET = 'rocket',
  SSLCOMMERZ = 'sslcommerz',
  AAMARPAY = 'aamarpay',
  MANUAL = 'manual',
}

export class InitiatePaymentRequestDto {
  @ApiProperty()
  @IsUUID()
  orderId!: string;

  @ApiProperty({ enum: PaymentMethodValueDto })
  @IsEnum(PaymentMethodValueDto)
  method!: PaymentMethodValueDto;

  @ApiProperty({ enum: PaymentGatewayValueDto, required: false })
  @IsOptional()
  @IsEnum(PaymentGatewayValueDto)
  gateway?: PaymentGatewayValueDto;

  @ApiProperty({ example: 1500 })
  @IsNumber()
  @IsPositive()
  amount!: number;

  @ApiProperty({ example: 'BDT' })
  @IsString()
  @Length(3, 3)
  currency!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  returnUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(8, 128)
  idempotencyKey?: string;

  @ApiPropertyOptional()
  @IsOptional()
  metadata?: Record<string, unknown>;
}

export class ConfirmPaymentRequestDto {
  @ApiProperty()
  @IsUUID()
  paymentId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(8, 128)
  idempotencyKey?: string;
}

export class CancelPaymentRequestDto {
  @ApiProperty()
  @IsUUID()
  paymentId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}

export class VerifyPaymentRequestDto {
  @ApiProperty()
  @IsUUID()
  paymentId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  gatewaySignature?: string;

  @ApiPropertyOptional()
  @IsOptional()
  gatewayData?: Record<string, unknown>;
}

export class RetryPaymentRequestDto {
  @ApiProperty()
  @IsUUID()
  paymentId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(8, 128)
  idempotencyKey?: string;
}
