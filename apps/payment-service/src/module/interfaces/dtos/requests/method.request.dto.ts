/**
 * Payment Method HTTP Request DTOs
 * @module payment-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import {
  PAYMENT_METHOD,
  PAYMENT_METHOD_TYPE,
  PAYMENT_GATEWAY,
} from '@vubon/shared-constants/business/payment';

const METHOD_VALUES = Object.values(PAYMENT_METHOD) as string[];
const TYPE_VALUES = Object.values(PAYMENT_METHOD_TYPE) as string[];
const GATEWAY_VALUES = Object.values(PAYMENT_GATEWAY) as string[];

export class AddPaymentMethodHttpDTO {
  @ApiProperty({ enum: METHOD_VALUES })
  @IsEnum(METHOD_VALUES)
  readonly method!: string;

  @ApiProperty({ enum: TYPE_VALUES })
  @IsEnum(TYPE_VALUES)
  readonly type!: string;

  @ApiPropertyOptional({ enum: GATEWAY_VALUES })
  @IsOptional()
  @IsEnum(GATEWAY_VALUES)
  readonly gateway?: string;

  @ApiPropertyOptional({ example: 'tok_visa_4242' })
  @IsOptional()
  @IsString()
  readonly cardToken?: string;

  @ApiPropertyOptional({ example: '4242' })
  @IsOptional()
  @IsString()
  readonly last4?: string;

  @ApiPropertyOptional({ example: 'visa' })
  @IsOptional()
  @IsString()
  readonly brand?: string;

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  readonly expiryMonth?: number;

  @ApiPropertyOptional({ example: 2028 })
  @IsOptional()
  @IsInt()
  @Min(2000)
  @Max(2100)
  readonly expiryYear?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly holderName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly walletAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly walletNetwork?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly isDefault?: boolean;
}

export class UpdatePaymentMethodHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(2)
  readonly label?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly holderName?: string;

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  readonly expiryMonth?: number;

  @ApiPropertyOptional({ example: 2028 })
  @IsOptional()
  @IsInt()
  @Min(2000)
  @Max(2100)
  readonly expiryYear?: number;
}

export class DeletePaymentMethodHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly reason?: string;
}

export class SetDefaultMethodHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsString()
  readonly methodId!: string;
}
