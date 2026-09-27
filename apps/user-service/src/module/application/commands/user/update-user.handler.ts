/**
 * UpdateUserHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateUserCommand } from './update-user.command.js';
import { USER_REPOSITORY } from '@domain/repositories/user.repository.interface';
import type { UserRepository } from '@domain/repositories/user.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserPhoneVO } from '@domain/value-objects/primitives/user-phone.vo';
import { UserMapper } from '../../mappers/user.mapper.js';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto.js';
import {
  UserNotFoundApplicationError,
  UserUpdateFailedError,
} from '../../errors/user.errors.js';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  implements ICommandHandler<UpdateUserCommand, UserResponseDTO>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository
  ) {}

  async execute(command: UpdateUserCommand): Promise<UserResponseDTO> {
    const { userId, payload } = command;

    const user = await this.userRepo.findById(UserIdVO.create(userId).value);
    if (!user) {
      throw new UserNotFoundApplicationError(userId);
    }

    try {
      const now = new Date().toISOString();

      if (payload.username !== undefined || payload.phone !== undefined) {
        // Adjust name/phone if provided (map through user methods)
      }

      if (payload.phone !== undefined) {
        const phoneVO = payload.phone ? UserPhoneVO.create(payload.phone) : null;
        user.changePhone(phoneVO, now);
      }

      if (payload.emailVerified === true) {
        user.markEmailVerified();
      }
      if (payload.phoneVerified === true) {
        user.markPhoneVerified();
      }

      await this.userRepo.save(user);
      return UserMapper.toResponse(user);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new UserUpdateFailedError(userId, reason);
    }
  }
}
