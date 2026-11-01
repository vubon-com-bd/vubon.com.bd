/**
 * Delivery HTTP Request DTOs
 * @module logistics-service/interfaces/dtos/requests/delivery
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray, IsBoolean, IsDateString, IsInt, IsObject, IsOptional,
  IsString, IsUUID, Length, Max, Min, MinLength, MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// ⚠️ Placeholder — Zod validator enforce করবে actual values
const DELIVERY_TYPE_VALUES = [
  'standard', 'express', 'same_day', 'scheduled', 'pickup', 'return',
] as const;

// ─── Window DTO ─────────────────────────
export class DeliveryWindowHttpDTO {
  @ApiProperty({ example: '2026-11-01T10:00:00Z' })
  @IsDateString()
  readonly startAt!: string;

  @ApiProperty({ example: '2026-11-01T14:00:00Z' })
  @IsDateString()
  readonly endAt!: string;
}

// ─── Create ─────────────────────────────
export class CreateDeliveryHttpDTO {
  @ApiProperty() @IsUUID()
  readonly shipmentId!: string;

  @ApiProperty() @IsUUID()
  readonly orderId!: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly userId?: string;

  @ApiProperty({ enum: DELIVERY_TYPE_VALUES }) @IsString()
  readonly type!: string;

  @ApiProperty() @IsString() @MinLength(5) @MaxLength(500)
  readonly deliveryAddress!: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150)
  readonly recipientName?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(30)
  readonly recipientPhone?: string;

  @ApiPropertyOptional({ type: DeliveryWindowHttpDTO })
  @IsOptional() @ValidateNested() @Type(() => DeliveryWindowHttpDTO)
  readonly window?: DeliveryWindowHttpDTO;

  @ApiPropertyOptional() @IsOptional() @IsDateString()
  readonly scheduledAt?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly driverId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly vehicleId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly routeId?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1000)
  readonly notes?: string;
}

// ─── Schedule ───────────────────────────
export class ScheduleDeliveryHttpDTO {
  @ApiProperty() @IsDateString()
  readonly scheduledAt!: string;

  @ApiPropertyOptional({ type: DeliveryWindowHttpDTO })
  @IsOptional() @ValidateNested() @Type(() => DeliveryWindowHttpDTO)
  readonly window?: DeliveryWindowHttpDTO;
}

// ─── Assign ─────────────────────────────
export class AssignDeliveryHttpDTO {
  @ApiProperty() @IsUUID()
  readonly driverId!: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly vehicleId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly routeId?: string;
}

// ─── Arrive ─────────────────────────────
export class ArriveDeliveryHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(255)
  readonly location?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1000)
  readonly notes?: string;
}

// ─── Complete ───────────────────────────
export class CompleteDeliveryHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150)
  readonly recipientName?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150)
  readonly signedBy?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly proofSignatureUrl?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly proofPhotoUrl?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(10)
  readonly proofOtp?: string;
}

// ─── Fail ───────────────────────────────
export class FailDeliveryHttpDTO {
  @ApiProperty({ example: 'Customer not available' })
  @IsString() @MinLength(3) @MaxLength(500)
  readonly reason!: string;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  readonly attemptedCount?: number;
}

// ─── Refuse ─────────────────────────────
export class RefuseDeliveryHttpDTO {
  @ApiProperty({ example: 'Damaged goods' })
  @IsString() @MinLength(3) @MaxLength(500)
  readonly reason!: string;
}

// ─── Reschedule ─────────────────────────
export class RescheduleDeliveryHttpDTO {
  @ApiProperty() @IsDateString()
  readonly scheduledAt!: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly reason?: string;
}

// ─── Cancel ─────────────────────────────
export class CancelDeliveryHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly reason?: string;
}

// ─── List Query ─────────────────────────
export class ListDeliveriesHttpQueryDTO {
  @ApiPropertyOptional({ example: 1, minimum: 1 })
  @IsOptional() @IsInt() @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ example: 20, minimum: 1, maximum: 100 })
  @IsOptional() @IsInt() @Min(1) @Max(100)
  readonly limit?: number;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly status?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly shipmentId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly orderId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly driverId?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200)
  readonly search?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'scheduledAt', 'status'] })
  @IsOptional() @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional() @IsString()
  readonly sortDir?: string;
}
