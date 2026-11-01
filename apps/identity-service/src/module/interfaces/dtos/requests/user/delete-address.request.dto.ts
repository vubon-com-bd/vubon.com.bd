/**
 * Delete Address HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/user
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteAddressHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  addressId!: string;
}
