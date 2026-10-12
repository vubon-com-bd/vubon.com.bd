import type { AddContactHttpDTO } from '../dtos/requests/add-contact.request.dto.js';
import type { UpdateContactHttpDTO } from '../dtos/requests/update-contact.request.dto.js';
import type { ContactHttpResponseDTO } from '../dtos/responses/contact.response.dto.js';

export class ContactControllerMapper {
  static toAddAppDto(dto: AddContactHttpDTO): unknown {
    return { ...dto };
  }

  static toUpdateAppDto(dto: UpdateContactHttpDTO): unknown {
    return { ...dto };
  }

  static toHttpResponse(app: unknown): ContactHttpResponseDTO {
    return app as ContactHttpResponseDTO;
  }

  static toHttpList(items: readonly unknown[]): readonly ContactHttpResponseDTO[] {
    return items as readonly ContactHttpResponseDTO[];
  }
}
