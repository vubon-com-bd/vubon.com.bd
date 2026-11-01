/**
 * Order HTTP Request DTOs
 * @module order-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ORDER_PRIORITY, ORDER_STATUS } from '@vubon/shared-constants/business/order';

const STATUS_VALUES = Object.values(ORDER_STATUS) as string[];
const PRIORITY_VALUES = Object.values(ORDER_PRIORITY) as string[];

export class CreateOrderItemInputHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly productId!: string;

  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly variantId?: string;

  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly vendorId?: string;

  @ApiProperty({ example: 2, minimum: 1, maximum: 999 })
  @IsInt()
  @Min(1)
  @Max(999)
  readonly quantity!: number;

  @ApiPropertyOptional({ example: 1500 })
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly unitPrice?: number;
}

export class CreateOrderHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly customerId!: string;

  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly cartId?: string;

  @ApiProperty({ type: [CreateOrderItemInputHttpDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemInputHttpDTO)
  readonly items!: readonly CreateOrderItemInputHttpDTO[];

  @ApiProperty({ example: { line1: '123 Main St', city: 'Dhaka', country: 'BD' } })
  @IsObject()
  readonly shippingAddress!: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional({ example: { line1: '123 Main St', city: 'Dhaka', country: 'BD' } })
  @IsOptional()
  @IsObject()
  readonly billingAddress?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional({ example: 'standard' })
  @IsOptional()
  @IsString()
  readonly shippingMethod?: string;

  @ApiPropertyOptional({ example: 'bkash' })
  @IsOptional()
  @IsString()
  readonly paymentMethod?: string;

  @ApiPropertyOptional({ example: 'BDT', minLength: 3, maxLength: 3 })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  readonly currency?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(0, 1000)
  readonly customerNotes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(0, 1000)
  readonly notes?: string;

  @ApiPropertyOptional({ example: 'idem-key-12345678' })
  @IsOptional()
  @IsString()
  @MinLength(8)
  readonly idempotencyKey?: string;
}

export class UpdateOrderHttpDTO {
  @ApiPropertyOptional({ enum: STATUS_VALUES })
  @IsOptional()
  @IsEnum(STATUS_VALUES)
  readonly status?: string;

  @ApiPropertyOptional({ enum: PRIORITY_VALUES })
  @IsOptional()
  @IsEnum(PRIORITY_VALUES)
  readonly priority?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly notes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly customerNotes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly shippingMethod?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly trackingNumber?: string;
}

export class ConfirmOrderHttpDTO {
  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly paymentId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly notes?: string;
}

export class HoldOrderHttpDTO {
  @ApiProperty({ example: 'Suspicious activity' })
  @IsString()
  @MinLength(3)
  @Length(3, 500)
  readonly reason!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly holdUntil?: string;
}

export class ReleaseOrderHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly note?: string;
}

export class DeleteOrderHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(0, 500)
  readonly reason?: string;
}

export class ListOrdersHttpQueryDTO {
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

  @ApiPropertyOptional({ example: 'pending' })
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly customerId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly vendorId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly toDate?: string;
}
