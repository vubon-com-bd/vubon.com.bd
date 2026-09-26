/**
 * UserContactService
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { UserContactServiceInterface } from '../interfaces/user-contact.service.interface';
import type { UserContactRepository } from '../../../domain/repositories/user-contact.repository.interface';
import type { IdGeneratorServiceInterface } from '../interfaces/id-generator.service.interface';
import { UserContactEntity } from '../../../domain/entities/user-contact.entity';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';
import { UserPhoneVO } from '../../../domain/value-objects/primitives/user-phone.vo';
import type { AddContactRequestDTO } from '../../dtos/requests/user/add-contact.dto';
import type { UpdateContactRequestDTO } from '../../dtos/requests/user/update-contact.dto';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto';
import { ID_GENERATOR } from '../tokens';
import { USER_CONTACT_REPO } from '../tokens';

@Injectable()
export class UserContactService
  extends BaseService<UserContactEntity, string>
  implements UserContactServiceInterface {
  readonly name = 'UserContactService';

  constructor(
    @Inject(USER_CONTACT_REPO) private readonly repo: UserContactRepository,
    @Inject(ID_GENERATOR) private readonly idGen: IdGeneratorServiceInterface,
  ) { super(); }

  async listForUser(userId: UserId): Promise<readonly UserContactEntity[]> {
    return this.repo.findByUserId(userId);
  }

  async add(userId: UserId, input: AddContactRequestDTO): Promise<UserContactEntity> {
    const now = new Date().toISOString();
    const email =
      input.email ? UserEmailVO.of(input.email) : undefined;
    const phone =
      input.phone ? UserPhoneVO.of(input.phone) : undefined;

    if (!email && !phone) {
      throw new Error('Contact must have at least one of: email, phone');
    }

    const entity = UserContactEntity.create({
      id: this.idGen.generate(),
      userId,
      email,
      phone,
      verified: false,
      createdAt: now,
      updatedAt: now,
    });
    return this.repo.save(entity);
  }

  async update(input: UpdateContactRequestDTO): Promise<UserContactEntity> {
    const found = await this.repo.findById(input.contactId);
    if (!found) throw new Error('Contact not found');
    if (input.verified === true) found.markVerified();
    if (input.verified === false) found.markUnverified();
    return this.repo.save(found);
  }

  async remove(contactId: string): Promise<void> {
    await this.repo.delete(contactId);
  }

  toResponse(contact: UserContactEntity): UserContactResponseDTO {
    return {
      id: contact.id,
      userId: contact.userId,
      email: contact.email?.value,
      phone: contact.phone?.value,
      verified: contact.verified,
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt,
    };
  }
}
