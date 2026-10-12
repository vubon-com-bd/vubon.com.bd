/**
 * Shipment HTTP Request DTOs
 * @module logistics-service/interfaces/dtos/requests
 *
 * HTTP-shaped DTOs with class-validator decorators.
 * Mapped to application DTOs by ShipmentControllerMapper.
 */
import {
  IsString, IsOptional, IsNumber, IsBoolean, IsEnum, IsArray, ValidateNested, Min, MinLength, MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  SHIPMENT_TYPE, SHIPMENT_PRIORITY,
} from '@vubon/shared-constants/logistics';

class AddressHttpDTO {
  @ApiProperty() @IsString() @MinLength(3) @MaxLength(255) line1!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(255) line2?: string;
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(100) city!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100) state?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(20) postalCode?: string;
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(3) country!: string;
}

class PackageRefHttpDTO {
  @ApiProperty() @IsString() orderItemId!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() productId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() variantId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() sku?: string;
  @ApiProperty() @IsNumber() @Min(1) quantity!: number;
  @ApiPropertyOptional() @IsOptional() @IsString() name?: string;
}

export class CreateShipmentHttpDTO {
  @ApiProperty() @IsString() orderId!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() userId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vendorId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() warehouseId?: string;
  @ApiProperty({ enum: Object.values(SHIPMENT_TYPE) }) @IsEnum(SHIPMENT_TYPE) type!: string;
  @ApiPropertyOptional({ enum: Object.values(SHIPMENT_PRIORITY) }) @IsOptional() @IsEnum(SHIPMENT_PRIORITY) priority?: string;
  @ApiProperty({ type: AddressHttpDTO }) @ValidateNested() @Type(() => AddressHttpDTO) shippingAddress!: AddressHttpDTO;
  @ApiPropertyOptional({ type: AddressHttpDTO }) @IsOptional() @ValidateNested() @Type(() => AddressHttpDTO) pickupAddress?: AddressHttpDTO;
  @ApiPropertyOptional() @IsOptional() @IsString() courierId?: string;
  @ApiProperty({ type: [PackageRefHttpDTO] }) @IsArray() @ValidateNested({ each: true }) @Type(() => PackageRefHttpDTO) packages!: PackageRefHttpDTO[];
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isCOD?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) codAmount?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isInsured?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) declaredValue?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(3) currency?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) shippingCost?: number;
  @ApiProperty() @IsNumber() @Min(0.001) weightKg!: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) volumeM3?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1000) notes?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() idempotencyKey?: string;
}

export class UpdateShipmentHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1000) notes?: string;
}

export class CancelShipmentHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) reason?: string;
}

export class PickupShipmentHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100) courierTrackingNumber?: string;
}

export class DeliverShipmentHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150) receivedBy?: string;
}

export class FailShipmentHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(500) reason!: string;
}

export class MarkReturnedHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(500) reason!: string;
}

export class AssignCourierHttpDTO {
  @ApiProperty() @IsString() courierId!: string;
}

export class AssignWarehouseHttpDTO {
  @ApiProperty() @IsString() warehouseId!: string;
}

export class PutOnHoldHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) reason?: string;
}

export class MarkDelayedHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(500) reason!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() newEstimatedDeliveryAt?: string;
}

export class ChangePriorityHttpDTO {
  @ApiProperty({ enum: Object.values(SHIPMENT_PRIORITY) }) @IsEnum(SHIPMENT_PRIORITY) priority!: string;
}

export class GenerateLabelHttpDTO {
  @ApiProperty() @IsString() @MinLength(1) @MaxLength(500) labelUrl!: string;
}

export class ListShipmentsHttpQueryDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() orderId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() userId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vendorId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() courierId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() warehouseId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() type?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() priority?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isCOD?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isInsured?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() fromDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() toDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) limit?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() sortBy?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() sortDir?: 'asc' | 'desc';
}
