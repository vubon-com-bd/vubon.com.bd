/**
 * UserContactServiceInterface
 */
import type { AddContactRequestDTO } from '../../dtos/requests/contact/index.js';
import type { ContactResponseDTO } from '../../dtos/responses/contact-response.dto.js';
import type { ListContactsResult } from '../../queries/contact/list-contacts.handler.js';

export interface UserContactServiceInterface {
  list(userId: string): Promise<ListContactsResult>;
  findById(userId: string, contactId: string): Promise<ContactResponseDTO>;
  add(input: AddContactRequestDTO): Promise<ContactResponseDTO>;
  update(
    userId: string,
    contactId: string,
    value?: string,
    label?: string,
    isPrimary?: boolean
  ): Promise<ContactResponseDTO>;
  remove(userId: string, contactId: string): Promise<{ success: true }>;
  verify(
    userId: string,
    contactId: string,
    code: string
  ): Promise<ContactResponseDTO>;
}
