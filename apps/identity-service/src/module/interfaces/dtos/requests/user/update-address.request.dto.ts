/**
 * Update Address HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/user
 */
import { PartialType } from '@nestjs/swagger';
import { AddAddressHttpDTO } from './add-address.request.dto.js';

export class UpdateAddressHttpDTO extends PartialType(AddAddressHttpDTO) {}
