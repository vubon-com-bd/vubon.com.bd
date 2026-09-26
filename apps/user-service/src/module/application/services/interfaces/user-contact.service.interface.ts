import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserContactEntity } from '../../../domain/entities/user-contact.entity';
import type { ContactResponseDTO } from '../../dtos/responses/contact-response.dto';

export interface UserContactServiceInterface
  extends BaseServiceInterface<UserContactEntity, string> {
  listByUser(userId: string): Promise<readonly ContactResponseDTO[]>;
  add(userId: string, input: { type: string; value: string }): Promise<ContactResponseDTO>;
  delete(contactId: string): Promise<void>;
  verify(contactId: string): Promise<ContactResponseDTO>;
}
