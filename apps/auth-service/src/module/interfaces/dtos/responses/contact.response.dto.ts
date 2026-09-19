import { ApiProperty } from '@nestjs/swagger';
import type { UserContactResponseDTO } from '../../../application/dtos/responses/user-contact-response.dto';

export class ContactResponseDTO implements UserContactResponseDTO {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  value!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  isPrimary!: boolean;

  @ApiProperty()
  isVerified!: boolean;

  @ApiProperty({ nullable: true })
  label?: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
