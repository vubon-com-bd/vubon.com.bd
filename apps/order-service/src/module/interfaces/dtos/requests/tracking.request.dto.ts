/**
 * Tracking HTTP Request DTOs
 * @module order-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddTrackingHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly orderId!: string;

  @ApiProperty({ example: 'in_transit' })
  readonly event!: string;

  @ApiProperty({ example: 'Package left sorting facility' })
  readonly message!: string;

  @ApiPropertyOptional({ example: 'Dhaka Hub' })
  readonly location?: string;

  @ApiPropertyOptional({ example: 23.8103 })
  readonly latitude?: number;

  @ApiPropertyOptional({ example: 90.4125 })
  readonly longitude?: number;

  @ApiPropertyOptional({ example: 'TRK-ABCD1234' })
  readonly trackingNumber?: string;

  @ApiPropertyOptional()
  readonly metadata?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional({ example: '2026-12-31T10:00:00Z' })
  readonly occurredAt?: string;
}

export class UpdateTrackingHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly orderId!: string;

  @ApiProperty({ example: 'delivered' })
  readonly event!: string;

  @ApiProperty({ example: 'Delivered to recipient' })
  readonly message!: string;

  @ApiPropertyOptional({ example: 'Customer address' })
  readonly location?: string;
}
