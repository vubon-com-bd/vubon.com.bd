/**
 * CreateUserHandler — Write operation
 * @module user-service/application/commands/user
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateUserCommand } from './create-user.command.js';
import { USER_REPOSITORY } from '@domain/repositories/user.repository.interface';
import type { UserRepository } from '@domain/repositories/user.repository.interface';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { UserMapper } from '../../mappers/user.mapper.js';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto.js';
import {
  UserAlreadyExistsApplicationError,
  UserCreationFailedError,
} from '../../errors/user.errors.js';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, UserResponseDTO>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository
  ) {}

  async execute(command: CreateUserCommand): Promise<UserResponseDTO> {
    const { email, type, firstName, lastName } = command.payload;

    // ─── Business rule: email uniqueness ─────────────────
    const emailVO = UserEmailVO.create(email);
    const existing = await this.userRepo.findByEmail(emailVO);
    if (existing) {
      throw new UserAlreadyExistsApplicationError(email);
    }

    // ─── Build name from firstName / lastName ────────────
    const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
    const nameVO = UserNameVO.create(fullName.length > 0 ? fullName : 'Unnamed User');

    // ─── Create aggregate ────────────────────────────────
    try {
      const now = new Date().toISOString();
      const user = UserEntity.create({
        id: UserIdVO.create(crypto.randomUUID()),
        email: emailVO,
        name: nameVO,
        type: UserTypeVO.create(type),
        now,
      });

      await this.userRepo.save(user);

      return UserMapper.toResponse(user);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new UserCreationFailedError(reason);
    }
  }
}
