/**
 * Device HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DeviceHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly tokenMasked!: string;
  @ApiProperty() readonly platform!: string;
  @ApiPropertyOptional() readonly appVersion?: string;
  @ApiPropertyOptional() readonly osVersion?: string;
  @ApiPropertyOptional() readonly deviceName?: string;
  @ApiProperty() readonly lastActiveAt!: string;
  @ApiProperty() readonly registeredAt!: string;
}

export class DeviceSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly deviceName?: string;
  @ApiProperty() readonly lastActiveAt!: string;
}

export class DeviceListHttpResponseDTO {
  @ApiProperty({ type: [DeviceSummaryHttpResponseDTO] })
  readonly items!: readonly DeviceSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
}
