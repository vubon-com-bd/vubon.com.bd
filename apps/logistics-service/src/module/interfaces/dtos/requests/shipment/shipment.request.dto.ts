/**
 * Shipment HTTP Request DTOs
 * @module logistics-service/interfaces/dtos/requests/shipment
 *
 * Double validation: class-validator (runtime) + @ApiProperty (Swagger)
 * ⚠️ @IsIn([...]) for arrays — NEVER @IsEnum(array)
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn, IsInt, IsNumber, IsObject, IsOptional, IsString, IsUUID,
  IsArray, IsBoolean, Length, Min, Max, MinLength, MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  SHIPMENT_TYPE,
  SHIPMENT_PRIORITY,
} from '@vubon/shared-constants/logistics';

const TYPE_VALUES = Object.values(SHIPMENT_TYPE) as string[];
const PRIORITY_VALUES = Object.values(SHIPMENT_PRIORITY) as string[];

// ─── Nested item ────────────────────────
export class ShipmentItemHttpDTO {
  @ApiProperty({ example: 'SKU-001' })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  readonly sku!: string;

  @ApiProperty({ example: 'Blue T-Shirt (L)' })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  readonly name!: string;

  @ApiProperty({ example: 2, minimum: 1 })
  @IsInt()
  @Min(1)
  readonly quantity!: number;

  @ApiProperty({ example: 799.0, minimum: 0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly unitPrice!: number;

  @ApiProperty({ example: 'BDT', minLength: 3, maxLength: 3 })
  @IsString()
  @Length(3, 3)
  readonly currency!: string;

  @ApiPropertyOptional({ example: 0.5 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  readonly weightKg?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly productId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly variantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly notes?: string;
}

// ─── Create ─────────────────────────────
export class CreateShipmentHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly orderId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly vendorId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly warehouseId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly courierId?: string;

  @ApiProperty({ enum: TYPE_VALUES })
  @IsIn(TYPE_VALUES)
  readonly type!: string;

  @ApiPropertyOptional({ enum: PRIORITY_VALUES })
  @IsOptional()
  @IsIn(PRIORITY_VALUES)
  readonly priority?: string;

  @ApiProperty({ example: 'House 12, Road 5, Dhanmondi, Dhaka' })
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  readonly shippingAddress!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly pickupAddress?: string;

  @ApiProperty({ type: [ShipmentItemHttpDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShipmentItemHttpDTO)
  readonly items!: readonly ShipmentItemHttpDTO[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  readonly totalWeightKg?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  readonly totalVolumeM3?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly declaredValue?: number;

  @ApiPropertyOptional({ example: 'BDT' })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  readonly currency?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly shippingCost?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly codAmount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly isCOD?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly isInsured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly estimatedDeliveryAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  readonly notes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly metadata?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  readonly idempotencyKey?: string;
}

// ─── Update ─────────────────────────────
export class UpdateShipmentHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly courierId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly warehouseId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly shippingAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly estimatedDeliveryAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  readonly notes?: string;
}

// ─── Cancel ─────────────────────────────
export class CancelShipmentHttpDTO {
  @ApiPropertyOptional({ example: 'Customer requested cancellation' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly reason?: string;
}

// ─── Confirm ────────────────────────────
export class ConfirmShipmentHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly notes?: string;
}

// ─── PickUp ─────────────────────────────
export class PickUpShipmentHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly courierId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly driverId?: string;
}

// ─── Start Transit ──────────────────────
export class StartTransitShipmentHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly notes?: string;
}

// ─── Deliver ────────────────────────────
export class DeliverShipmentHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(150)
  readonly recipientName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(150)
  readonly signedBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly driverId?: string;
}

// ─── Fail ───────────────────────────────
export class FailShipmentHttpDTO {
  @ApiProperty({ example: 'Address not found' })
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  readonly reason!: string;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly attemptedCount?: number;
}

// ─── List Query ─────────────────────────
export class ListShipmentsHttpQueryDTO {
  @ApiPropertyOptional({ example: 1, minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ example: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly priority?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly orderId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly courierId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly warehouseId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly toDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  readonly search?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'updatedAt', 'estimatedDeliveryAt', 'priority'] })
  @IsOptional()
  @IsIn(['createdAt', 'updatedAt', 'estimatedDeliveryAt', 'priority'])
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'estimatedDeliveryAt' | 'priority';

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  readonly sortDir?: 'asc' | 'desc';
}
