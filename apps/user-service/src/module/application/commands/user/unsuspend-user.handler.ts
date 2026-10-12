/**
 * UnsuspendUserHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { UnsuspendUserCommand } from './unsuspend-user.command.js';
import { USER_REPOSITORY } from '@domain/repositories/user.repository.interface';
import type { UserRepository } from '@domain/repositories/user.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserMapper } from '../../mappers/user.mapper.js';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto.js';
import {
  UserNotFoundApplicationError,
  UserUpdateFailedError,
} from '../../errors/user.errors.js';

@CommandHandler(UnsuspendUserCommand)
export class UnsuspendUserHandler
  implements ICommandHandler<UnsuspendUserCommand, UserResponseDTO>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async execute(command: UnsuspendUserCommand): Promise<UserResponseDTO> {
    const { userId } = command;

    const user = await this.userRepo.findById(UserIdVO.create(userId).value);
    if (!user) throw new UserNotFoundApplicationError(userId);

    try {
      user.activate(new Date().toISOString());
      await this.userRepo.save(user);
      await this.eventBridge.publishFromEntity(user);
      return UserMapper.toResponse(user);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new UserUpdateFailedError(userId, reason);
    }
  }
}
