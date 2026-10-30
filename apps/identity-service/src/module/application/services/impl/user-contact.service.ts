import { Injectable, Inject } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserContactServiceInterface } from '../interfaces/user-contact.service.interface.js';
import type { UserContactRepository } from '../../../domain/repositories/user-contact.repository.interface.js';
import { USER_CONTACT_REPOSITORY } from '../../../domain/repositories/user-contact.repository.interface.js';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto.js';
import { UserContactEntity } from '../../../domain/entities/user-contact.entity.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo.js';
import { UserPhoneVO } from '../../../domain/value-objects/primitives/user-phone.vo.js';
import type { ContactTypeValue } from '../../../domain/value-objects/composites/user-contact.vo.js';

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

  async add(userId: string, input: Partial<UserContactResponseDTO> & { type?: string; value?: string; label?: string; isPrimary?: boolean }): Promise<UserContactResponseDTO> {
    const now = new Date().toISOString();
    const type = (input.type ?? input.contactType ?? 'email') as ContactTypeValue;
    const value = (input.value ?? input.contactValue ?? '') as string;
    if (!value) throw new Error('Contact value required');

    const entity = UserContactEntity.create({
      id: randomUUID(),
      now,
      props: {
        userId: UserIdVO.create(userId),
        contactType: type,
        email: type === 'email' ? UserEmailVO.create(value) : undefined,
        phone: type === 'phone' ? UserPhoneVO.create(value) : undefined,
        contactValue: value,
        label: input.label,
        isPrimary: input.isPrimary ?? false,
      },
    });
    const saved = await this.repo.save(entity);
    return {
      id: saved.id, userId: saved.userId.value, contactType: saved.contactType,
      contactValue: saved.contactValue, label: saved.label, isPrimary: saved.isPrimary,
      isVerified: saved.isVerified, verifiedAt: saved.verifiedAt, createdAt: saved.createdAt,
    };
  }

  async update(contactId: string, patch: Partial<UserContactResponseDTO>): Promise<UserContactResponseDTO> {
    const entity = await this.repo.findById(contactId);
    if (!entity) throw new Error(`Contact ${contactId} not found`);
    return {
      id: entity.id, userId: entity.userId.value, contactType: entity.contactType,
      contactValue: entity.contactValue, label: entity.label, isPrimary: entity.isPrimary,
      isVerified: entity.isVerified, verifiedAt: entity.verifiedAt, createdAt: entity.createdAt,
      ...patch,
    };
  }

  async remove(contactId: string): Promise<void> { await this.repo.delete(contactId); }
  async setPrimary(contactId: string): Promise<void> {}
}
