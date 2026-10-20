/**
 * Delivery HTTP Request DTOs
 * @module order-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MinLength,
} from 'class-validator';

export class ScheduleDeliveryHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly orderId!: string;

  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly deliveryMethodId?: string;

  @ApiPropertyOptional({ example: 'standard' })
  @IsOptional()
  @IsString()
  readonly type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly estimatedAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly notes?: string;
}

export class RescheduleDeliveryHttpDTO {
  @ApiProperty({ example: 'Customer not available' })
  @IsString()
  @MinLength(3)
  @Length(3, 500)
  readonly reason!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly newEstimatedAt?: string;
}

export class ConfirmDeliveryHttpDTO {
  @ApiPropertyOptional({ example: 'Jane Doe' })
  @IsOptional()
  @IsString()
  readonly receivedBy?: string;

  @ApiPropertyOptional({ example: 'signature-base64...' })
  @IsOptional()
  @IsString()
  readonly signature?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly notes?: string;
}
