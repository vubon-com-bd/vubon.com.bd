/**
 * UserContactMapper
 */
import { UserContactEntity } from '@domain/entities/user-contact.entity';
import type { ContactResponseDTO } from '../dtos/responses/contact-response.dto.js';

export class UserContactMapper {
  static toResponse(contact: UserContactEntity): ContactResponseDTO {
    return {
      id: contact.id,
      userId: contact.userId.value,
      type: contact.type.value,
      value: contact.contactValue.value,
      isPrimary: contact.isPrimary,
      isVerified: contact.isVerified,
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt,
    };
  }

  static toResponseList(
    contacts: readonly UserContactEntity[]
  ): readonly ContactResponseDTO[] {
    return contacts.map((c) => UserContactMapper.toResponse(c));
  }
}
