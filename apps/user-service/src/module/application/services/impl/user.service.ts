import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserServiceInterface } from '../interfaces/user.service.interface';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '../../../domain/value-objects/primitives/user-name.vo';
import { UserStatusVO } from '../../../domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../../../domain/value-objects/primitives/user-type.vo';
import { UserOperationFailedError } from '../../errors/user.errors';
import type { CreateUserRequestDTO } from '../../dtos/requests/user/create-user.dto';
import type { UpdateUserRequestDTO } from '../../dtos/requests/user/update-user.dto';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';

@Injectable()
export class UserService
  extends BaseService<UserEntity, string>
  implements UserServiceInterface
{
  readonly name = 'UserService';

  constructor(
    private readonly userRepo: UserRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async create(input: CreateUserRequestDTO): Promise<UserResponseDTO> {
    void this.userRepo;
    void input;
    throw new UserOperationFailedError('create not yet wired');
  }

  async update(userId: string, input: UpdateUserRequestDTO): Promise<UserResponseDTO> {
    void input;
    const entity = await this.userRepo.findById(UserIdVO.create(userId));
    if (!entity) {
      throw new UserOperationFailedError(`user not found: ${userId}`);
    }
    await this.userRepo.save(entity);
    return this.toDTO(entity);
  }

  async delete(userId: string): Promise<void> {
    const entity = await this.userRepo.findById(UserIdVO.create(userId));
    if (!entity) {
      throw new UserOperationFailedError(`user not found: ${userId}`);
    }
    const deleted = entity.softDelete();
    await this.userRepo.save(deleted);
    await this.publishEvents(deleted);
  }

  async findById(userId: string): Promise<UserResponseDTO | null> {
    const entity = await this.userRepo.findById(UserIdVO.create(userId));
    return entity ? this.toDTO(entity) : null;
  }

  async findByEmail(email: string): Promise<UserResponseDTO | null> {
    const entity = await this.userRepo.findByEmail(UserEmailVO.create(email));
    return entity ? this.toDTO(entity) : null;
  }

  async activate(userId: string): Promise<void> {
    const entity = await this.userRepo.findById(UserIdVO.create(userId));
    if (!entity) {
      throw new UserOperationFailedError(`user not found: ${userId}`);
    }
    const activated = entity.activate();
    await this.userRepo.save(activated);
    await this.publishEvents(activated);
  }

  async deactivate(userId: string, reason?: string): Promise<void> {
    void reason;
    const entity = await this.userRepo.findById(UserIdVO.create(userId));
    if (!entity) {
      throw new UserOperationFailedError(`user not found: ${userId}`);
    }
    const updated = entity.deactivate();
    await this.userRepo.save(updated);
    await this.publishEvents(updated);
  }

  async suspend(userId: string, reason: string): Promise<void> {
    const entity = await this.userRepo.findById(UserIdVO.create(userId));
    if (!entity) {
      throw new UserOperationFailedError(`user not found: ${userId}`);
    }
    const updated = entity.suspend(reason);
    await this.userRepo.save(updated);
    await this.publishEvents(updated);
  }

  async unsuspend(userId: string): Promise<void> {
    const entity = await this.userRepo.findById(UserIdVO.create(userId));
    if (!entity) {
      throw new UserOperationFailedError(`user not found: ${userId}`);
    }
    const updated = entity.unsuspend();
    await this.userRepo.save(updated);
    await this.publishEvents(updated);
  }

  private toDTO(entity: UserEntity): UserResponseDTO {
    return {
      success: true,
      user: {
        id: entity.id.value,
        email: entity.email.value,
        type: entity.type.value,
        status: entity.status.value,
        roles: [],
        isMfaEnabled: false,
        emailVerified: entity.emailVerified,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        deletedAt: entity.deletedAt ?? undefined,
      },
    };
  }

  private async publishEvents(entity: UserEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
