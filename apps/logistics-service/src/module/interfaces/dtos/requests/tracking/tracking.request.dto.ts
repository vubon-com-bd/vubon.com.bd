/**
 * Tracking HTTP Request DTOs
 * @module logistics-service/interfaces/dtos/requests/tracking
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString, IsInt, IsOptional, IsString, IsUUID,
  Max, Min, MinLength, MaxLength,
} from 'class-validator';

const TRACKING_SOURCE_VALUES = [
  'courier_api', 'manual', 'webhook', 'system', 'customer',
] as const;

// ─── Create ─────────────────────────────
export class CreateTrackingHttpDTO {
  @ApiProperty({ example: 'SH20261101052848' })
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  readonly trackingNumber!: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly shipmentId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly orderId?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly courierCode?: string;

  @ApiProperty({ enum: TRACKING_SOURCE_VALUES })
  @IsString()
  readonly source!: string;

  @ApiPropertyOptional() @IsOptional() @IsDateString()
  readonly estimatedDeliveryAt?: string;

  @ApiPropertyOptional() @IsOptional() @IsDateString()
  readonly expiresAt?: string;
}

// ─── Add Event ──────────────────────────
export class AddTrackingEventHttpDTO {
  @ApiProperty({ example: 'evt-001' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  readonly eventId!: string;

  @ApiProperty({ example: 'picked_up' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly eventType!: string;

  @ApiProperty({ example: 'in_transit' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly eventStatus!: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(255)
  readonly currentLocation?: string;
}

// ─── Activate / Complete / Fail / Expire (with reason) ───
export class TrackingReasonHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly reason?: string;
}

// ─── List Query ─────────────────────────
export class ListTrackingsHttpQueryDTO {
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

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly courierCode?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'lastUpdatedAt', 'status'] })
  @IsOptional() @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional() @IsString()
  readonly sortDir?: string;
}
