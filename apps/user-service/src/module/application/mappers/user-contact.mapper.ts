import { UserContactEntity } from '../../domain/entities/user-contact.entity';
import type { ContactResponseDTO } from '../dtos/responses/contact-response.dto';

export class UserContactMapper {
  static toResponse(contact: UserContactEntity): ContactResponseDTO {
    return {
      id: contact.id.value,
      userId: contact.userId.value,
      type: contact.type.value,
      value: contact.value.value,
      verified: contact.verified,
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt,
    } as unknown as ContactResponseDTO;
  }

  static toListResponse(
    contacts: readonly UserContactEntity[],
  ): readonly ContactResponseDTO[] {
    return contacts.map((c) => UserContactMapper.toResponse(c));
  }
}
