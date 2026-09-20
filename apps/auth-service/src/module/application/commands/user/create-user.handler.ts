import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateUserCommand } from './create-user.command';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';
import type { CreateUserRequestDTO } from '../../dtos/requests/user/create-user.dto';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  extends BaseCommandHandler<CreateUserCommand, UserResponseDTO>
  implements ICommandHandler<CreateUserCommand>
{
  readonly commandType = 'user.create';

  constructor(
    @Inject('UserService') private readonly userService: UserServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateUserCommand): Promise<UserResponseDTO> {
    const input: CreateUserRequestDTO = {
      email: command.email,
      password: command.password,
      acceptTerms: command.acceptTerms,
      sendVerificationEmail: command.sendVerificationEmail,
      type: command.userType,
      phone: command.phone,
      role: command.role,
      firstName: command.firstName,
      lastName: command.lastName,
      username: command.username,
    };
    return this.userService.create(input);
  }
}
