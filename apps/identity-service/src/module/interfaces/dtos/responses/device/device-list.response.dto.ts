import { ApiProperty } from '@nestjs/swagger';
import { DeviceHttpResponseDTO } from './device.response.dto.js';

export class DeviceListHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;
  @ApiProperty({ type: [DeviceHttpResponseDTO] })
  readonly devices!: readonly DeviceHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
}
