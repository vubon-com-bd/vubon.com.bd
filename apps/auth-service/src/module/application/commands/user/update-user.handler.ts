import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateUserCommand } from './update-user.command';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';
import { USER_SERVICE } from '../../tokens';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  extends BaseCommandHandler<UpdateUserCommand, UserResponseDTO>
  implements ICommandHandler<UpdateUserCommand> {
  readonly commandType = 'UpdateUserCommand';
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserServiceInterface,
  ) { super(); }

  async execute(command: UpdateUserCommand): Promise<UserResponseDTO> {
    const entity = await this.userService.update(command.userId, command.input);
    return this.userService.toResponse(entity);
  }
}
