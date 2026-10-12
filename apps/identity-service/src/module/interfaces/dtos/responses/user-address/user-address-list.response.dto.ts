import { ApiProperty } from '@nestjs/swagger';
import { UserAddressHttpResponseDTO } from './user-address.response.dto.js';

export class UserAddressListHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;
  @ApiProperty({ type: [UserAddressHttpResponseDTO] })
  readonly addresses!: readonly UserAddressHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
}
