/**
 * DeactivateUserHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeactivateUserCommand } from './deactivate-user.command.js';
import { USER_REPOSITORY } from '@domain/repositories/user.repository.interface';
import type { UserRepository } from '@domain/repositories/user.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserMapper } from '../../mappers/user.mapper.js';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto.js';
import {
  UserNotFoundApplicationError,
  UserUpdateFailedError,
} from '../../errors/user.errors.js';

@CommandHandler(DeactivateUserCommand)
export class DeactivateUserHandler
  implements ICommandHandler<DeactivateUserCommand, UserResponseDTO>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository
  ) {}

  async execute(command: DeactivateUserCommand): Promise<UserResponseDTO> {
    const { userId } = command;

    const user = await this.userRepo.findById(UserIdVO.create(userId).value);
    if (!user) throw new UserNotFoundApplicationError(userId);

    try {
      // Deactivation modeled as suspend with system reason
      user.suspend(command.reason ?? 'deactivated', new Date().toISOString());
      await this.userRepo.save(user);
      return UserMapper.toResponse(user);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new UserUpdateFailedError(userId, reason);
    }
  }
}
