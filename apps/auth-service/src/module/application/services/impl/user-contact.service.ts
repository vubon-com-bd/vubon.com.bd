import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserContactServiceInterface } from '../interfaces/user-contact.service.interface';
import type { UserContactRepository } from '../../../domain/repositories/user-contact.repository.interface';
import { UserContactEntity } from '../../../domain/entities/user-contact.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { UserPhoneVO } from '../../../domain/value-objects/primitives/user-phone.vo';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';
import { UserOperationFailedError } from '../../errors/user.errors';
import type { AddContactRequestDTO } from '../../dtos/requests/user/add-contact.dto';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto';

@Injectable()
export class UserContactService
  extends BaseService<UserContactEntity, string>
  implements UserContactServiceInterface
{
  readonly name = 'UserContactService';

  constructor(
    @Inject('UserContactRepository') private readonly contactRepo: UserContactRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async findByUserId(userId: string): Promise<UserContactResponseDTO | null> {
    const entity = await this.contactRepo.findByUserId(UserIdVO.create(userId));
    return entity ? this.toDTO(entity) : null;
  }

  async add(
    userId: string,
    input: AddContactRequestDTO,
  ): Promise<UserContactResponseDTO> {
    const userIdVO = UserIdVO.create(userId);
    const existing = await this.contactRepo.findByUserId(userIdVO);
    if (existing) {
      throw new UserOperationFailedError('contact already exists');
    }
    const phoneValue =
      'phone' in input && typeof input.phone === 'string' ? input.phone : '';
    const emailValue =
      'email' in input && typeof input.email === 'string' ? input.email : '';

    const entity = UserContactEntity.create({
      userId: userIdVO,
      phone: UserPhoneVO.create(phoneValue || '0000000000'),
      email: UserEmailVO.create(emailValue || 'placeholder@example.com'),
      alternatePhone: null,
      alternateEmail: null,
    });
    await this.contactRepo.save(entity);
    return this.toDTO(entity);
  }

  async delete(contactId: string): Promise<void> {
    await this.contactRepo.delete(UserIdVO.create(contactId));
  }

  private toDTO(entity: UserContactEntity): UserContactResponseDTO {
    return {
      id: entity.id.value,
      value: entity.phone.value,
      type: 'phone',
      isPrimary: true,
      isVerified: false,
      label: undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
