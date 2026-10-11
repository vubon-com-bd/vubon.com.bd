/**
 * Device HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DeviceHttpResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() userId!: string;
  @ApiProperty() type!: string;
  @ApiProperty() status!: string;
  @ApiProperty() maskedToken!: string;
  @ApiPropertyOptional() platform?: string;
  @ApiPropertyOptional() appVersion?: string;
  @ApiPropertyOptional() osVersion?: string;
  @ApiPropertyOptional() lastActiveAt?: string;
  @ApiProperty() registeredAt!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
