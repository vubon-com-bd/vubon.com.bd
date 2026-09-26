import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateUserCommand } from './create-user.command';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  extends BaseCommandHandler<CreateUserCommand, UserResponseDTO>
  implements ICommandHandler<CreateUserCommand>
{
  readonly commandType = 'user.create';

  constructor(
    private readonly userService: UserServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateUserCommand): Promise<UserResponseDTO> {
    void command;
    void this.userService;
    throw new Error('create-user not yet wired');
  }
}
