/**
 * UserContactServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { UserContactEntity } from '../../../domain/entities/user-contact.entity';
import type { AddContactRequestDTO } from '../../dtos/requests/user/add-contact.dto';
import type { UpdateContactRequestDTO } from '../../dtos/requests/user/update-contact.dto';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto';

export interface UserContactServiceInterface
  extends BaseServiceInterface<UserContactEntity, string> {
  listForUser(userId: UserId): Promise<readonly UserContactEntity[]>;

  add(userId: UserId, input: AddContactRequestDTO): Promise<UserContactEntity>;

  update(input: UpdateContactRequestDTO): Promise<UserContactEntity>;

  remove(contactId: string): Promise<void>;

  toResponse(contact: UserContactEntity): UserContactResponseDTO;
}
