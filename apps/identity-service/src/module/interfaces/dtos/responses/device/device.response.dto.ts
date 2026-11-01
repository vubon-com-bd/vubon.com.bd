/**
 * Device Response DTO
 * @module identity-service/interfaces/dtos/responses/device
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DeviceHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly type!: string;
  @ApiPropertyOptional() readonly name?: string;
  @ApiPropertyOptional() readonly os?: string;
  @ApiPropertyOptional() readonly browser?: string;
  @ApiProperty() readonly trusted!: boolean;
  @ApiPropertyOptional() readonly trustedUntil?: string;
  @ApiProperty() readonly lastActiveAt!: string;
  @ApiProperty() readonly isCurrent!: boolean;
}
