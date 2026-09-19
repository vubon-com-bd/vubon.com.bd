import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserContactEntity } from '../../../domain/entities/user-contact.entity';
import type { AddContactRequestDTO } from '../../dtos/requests/user/add-contact.dto';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto';

export interface UserContactServiceInterface
  extends BaseServiceInterface<UserContactEntity, string> {
  findByUserId(userId: string): Promise<UserContactResponseDTO | null>;
  add(userId: string, input: AddContactRequestDTO): Promise<UserContactResponseDTO>;
  delete(contactId: string): Promise<void>;
}
