import { ApiProperty } from '@nestjs/swagger';
import { UserContactHttpResponseDTO } from './user-contact.response.dto.js';

export class UserContactListHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;
  @ApiProperty({ type: [UserContactHttpResponseDTO] })
  readonly contacts!: readonly UserContactHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
}
