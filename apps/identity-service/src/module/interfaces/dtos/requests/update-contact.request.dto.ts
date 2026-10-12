import { PartialType } from '@nestjs/swagger';
import { AddContactHttpDTO } from './add-contact.request.dto.js';

export class UpdateContactHttpDTO extends PartialType(AddContactHttpDTO) {}
