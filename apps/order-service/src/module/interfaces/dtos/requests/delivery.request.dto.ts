/**
 * Delivery HTTP Request DTOs
 * @module order-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ScheduleDeliveryHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly orderId!: string;

  @ApiPropertyOptional({ example: '8a9e6679-7425-40de-944b-e07fc1f90ae8' })
  readonly deliveryMethodId?: string;

  @ApiPropertyOptional({ example: 'standard' })
  readonly type?: string;

  @ApiPropertyOptional({ example: '2026-12-31T10:00:00Z' })
  readonly estimatedAt?: string;

  @ApiPropertyOptional({ example: 'leave at door' })
  readonly notes?: string;
}

export class RescheduleDeliveryHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly orderId!: string;

  @ApiProperty({ example: 'customer not available' })
  readonly reason!: string;

  @ApiPropertyOptional({ example: '2027-01-02T10:00:00Z' })
  readonly newEstimatedAt?: string;
}

export class ConfirmDeliveryHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly orderId!: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  readonly receivedBy?: string;

  @ApiPropertyOptional({ example: 'signature-hash' })
  readonly signature?: string;

  @ApiPropertyOptional({ example: 'delivered fine' })
  readonly notes?: string;
}
