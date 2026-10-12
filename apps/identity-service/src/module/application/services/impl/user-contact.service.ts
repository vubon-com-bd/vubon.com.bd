import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserContactServiceInterface } from '../interfaces/user-contact.service.interface.js';
import type { UserContactRepository } from '../../../domain/repositories/user-contact.repository.interface.js';
import { USER_CONTACT_REPOSITORY } from '../../../domain/repositories/user-contact.repository.interface.js';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto.js';

@Injectable()
export class UserContactService extends BaseService implements UserContactServiceInterface {
  readonly name = 'UserContactService';
  constructor(@Inject(USER_CONTACT_REPOSITORY) private readonly repo: UserContactRepository) { super(); }
  async listForUser(userId: string): Promise<readonly UserContactResponseDTO[]> {
    const list = await this.repo.findByUserIdRaw(userId);
    return list.map((c) => ({
      id: c.id, userId: c.userId.value, contactType: c.contactType,
      contactValue: c.contactValue, label: c.label, isPrimary: c.isPrimary,
      isVerified: c.isVerified, verifiedAt: c.verifiedAt, createdAt: c.createdAt,
    }));
  }
  async add(userId: string, input: Partial<UserContactResponseDTO>): Promise<UserContactResponseDTO> {
    return { id: '', userId, contactType: 'email', contactValue: '', isPrimary: false, isVerified: false, createdAt: new Date().toISOString(), ...input } as UserContactResponseDTO;
  }
  async update(contactId: string, patch: Partial<UserContactResponseDTO>): Promise<UserContactResponseDTO> {
    return { id: contactId, ...patch } as UserContactResponseDTO;
  }
  async remove(contactId: string): Promise<void> { await this.repo.delete(contactId); }
  async setPrimary(contactId: string): Promise<void> {}
}
