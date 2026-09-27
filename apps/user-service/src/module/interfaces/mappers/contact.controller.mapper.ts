/**
 * ContactControllerMapper
 */
import type { AddContactRequestDto } from '../dtos/requests/contact.request.dto.js';
import {
  ContactResponseDto,
  ContactListResponseDto,
} from '../dtos/responses/contact.response.dto.js';
import type { AddContactRequestDTO } from '@application/dtos/requests/contact';
import type { ContactResponseDTO } from '@application/dtos/responses/contact-response.dto';

export class ContactControllerMapper {
  static toAddAppDto(userId: string, dto: AddContactRequestDto): AddContactRequestDTO {
    return {
      userId,
      type: dto.type,
      value: dto.value,
      label: dto.label,
      isPrimary: dto.isPrimary,
    };
  }

  static toResponse(app: ContactResponseDTO): ContactResponseDto {
    const res = new ContactResponseDto();
    res.id = app.id;
    res.userId = app.userId;
    res.type = app.type;
    res.value = app.value;
    res.label = app.label;
    res.isPrimary = app.isPrimary;
    res.isVerified = app.isVerified;
    res.createdAt = app.createdAt;
    res.updatedAt = app.updatedAt;
    return res;
  }

  static toListResponse(apps: readonly ContactResponseDTO[]): ContactListResponseDto {
    const res = new ContactListResponseDto();
    res.items = apps.map((a) => ContactControllerMapper.toResponse(a));
    res.total = apps.length;
    return res;
  }
}
