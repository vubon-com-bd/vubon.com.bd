/**
 * Tracking HTTP Request DTOs
 * @module order-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, Length, MinLength } from 'class-validator';
import { ORDER_TRACKING_EVENT } from '@vubon/shared-constants/business/order';

const EVENT_VALUES = Object.values(ORDER_TRACKING_EVENT) as string[];

export class AddTrackingHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly orderId!: string;

  @ApiProperty({ enum: EVENT_VALUES, example: 'in_transit' })
  @IsString()
  @MinLength(1)
  readonly event!: string;

  @ApiProperty({ example: 'Package departed warehouse' })
  @IsString()
  @MinLength(1)
  @Length(1, 500)
  readonly message!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly trackingNumber?: string;
}

export class UpdateTrackingHttpDTO {
  @ApiPropertyOptional({ enum: EVENT_VALUES })
  @IsOptional()
  @IsString()
  readonly event?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 500)
  readonly message?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly location?: string;
}
