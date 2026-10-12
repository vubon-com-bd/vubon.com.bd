import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateUserCommand } from './create-user.command.js';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto.js';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import { UserAlreadyExistsError } from '../../../domain/errors/user.errors.js';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  extends BaseCommandHandler<CreateUserCommand, UserResponseDTO>
  implements ICommandHandler<CreateUserCommand>
{
  readonly commandType = 'user.create';
  constructor(@Inject(USER_REPOSITORY) private readonly userRepo: UserRepository) { super(); }

  async execute(command: CreateUserCommand): Promise<UserResponseDTO> {
    const existing = await this.userRepo.findByEmailRaw(command.input.email);
    if (existing) throw new UserAlreadyExistsError(command.input.email);
    return {
      id: '',
      email: command.input.email,
      firstName: command.input.firstName,
      lastName: command.input.lastName,
      username: command.input.username,
      status: 'pending',
      type: command.input.type,
      roles: command.input.role ? [command.input.role] : ['customer'],
      emailVerified: false,
      phoneVerified: false,
      isMfaEnabled: false,
      createdAt: new Date().toISOString(),
    } as never;
  }
}
