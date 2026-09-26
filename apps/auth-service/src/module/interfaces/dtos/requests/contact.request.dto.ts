/**
 * ContactRequestDTO
 * @module auth-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddContactRequestDTO {
  @ApiPropertyOptional({ format: 'email' })
  email?: string;

  @ApiPropertyOptional()
  phone?: string;
}

export class UpdateContactRequestDTO {
  @ApiProperty({ format: 'uuid' })
  contactId!: string;

  @ApiPropertyOptional({ format: 'email' })
  email?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  verified?: boolean;
}

export class DeleteContactRequestDTO {
  @ApiProperty({ format: 'uuid' })
  contactId!: string;
}
