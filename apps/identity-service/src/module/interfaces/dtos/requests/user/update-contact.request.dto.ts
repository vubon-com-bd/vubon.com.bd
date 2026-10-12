/**
 * Update Contact HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/user
 */
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { AddContactHttpDTO } from './add-contact.request.dto.js';

export class UpdateContactHttpDTO extends PartialType(AddContactHttpDTO) {
  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  contactId?: string;
}
