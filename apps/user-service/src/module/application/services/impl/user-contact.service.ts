import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserContactServiceInterface } from '../interfaces/user-contact.service.interface';
import type { UserContactRepository } from '../../../domain/repositories/user-contact.repository.interface';
import { UserContactEntity } from '../../../domain/entities/user-contact.entity';
import { ContactIdVO } from '../../../domain/value-objects/primitives/contact-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { ContactOperationFailedError } from '../../errors/contact.errors';
import type { ContactResponseDTO } from '../../dtos/responses/contact-response.dto';

@Injectable()
export class UserContactService
  extends BaseService<UserContactEntity, string>
  implements UserContactServiceInterface
{
  readonly name = 'UserContactService';

  constructor(
    private readonly contactRepo: UserContactRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listByUser(userId: string): Promise<readonly ContactResponseDTO[]> {
    const entities = await this.contactRepo.findByUserId(UserIdVO.create(userId));
    return entities.map((e) => this.toDTO(e));
  }

  async add(userId: string, input: { type: string; value: string }): Promise<ContactResponseDTO> {
    void input;
    void userId;
    throw new ContactOperationFailedError('add not yet wired');
  }

  async delete(contactId: string): Promise<void> {
    await this.contactRepo.delete(ContactIdVO.create(contactId));
  }

  async verify(contactId: string): Promise<ContactResponseDTO> {
    const entity = await this.contactRepo.findById(ContactIdVO.create(contactId));
    if (!entity) throw new ContactOperationFailedError('contact not found');
    const verified = entity.markVerified();
    await this.contactRepo.save(verified);
    return this.toDTO(verified);
  }

  private toDTO(entity: UserContactEntity): ContactResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      type: entity.type.value,
      value: entity.value.value,
      verified: entity.verified,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as ContactResponseDTO;
  }
}
