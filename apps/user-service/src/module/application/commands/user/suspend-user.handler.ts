/**
 * SuspendUserHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SuspendUserCommand } from './suspend-user.command.js';
import { USER_REPOSITORY } from '@domain/repositories/user.repository.interface';
import type { UserRepository } from '@domain/repositories/user.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserMapper } from '../../mappers/user.mapper.js';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto.js';
import {
  UserNotFoundApplicationError,
  UserUpdateFailedError,
} from '../../errors/user.errors.js';

@CommandHandler(SuspendUserCommand)
export class SuspendUserHandler
  implements ICommandHandler<SuspendUserCommand, UserResponseDTO>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository
  ) {}

  async execute(command: SuspendUserCommand): Promise<UserResponseDTO> {
    const { userId, reason } = command;

    const user = await this.userRepo.findById(UserIdVO.create(userId).value);
    if (!user) throw new UserNotFoundApplicationError(userId);

    try {
      user.suspend(reason, new Date().toISOString());
      await this.userRepo.save(user);
      return UserMapper.toResponse(user);
    } catch (err) {
      const reason2 = err instanceof Error ? err.message : 'unknown error';
      throw new UserUpdateFailedError(userId, reason2);
    }
  }
}
