/**
 * Delivery HTTP DTOs
 * @module notification-service/interfaces/dtos/requests/delivery
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class ListDeliveriesHttpQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly notificationId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly channel?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly toDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit?: number;
}
