import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateUserCommand } from './create-user.command';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';
import type { UserEntity } from '../../../domain/entities/user.entity';
import { USER_SERVICE } from '../../tokens';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  extends BaseCommandHandler<CreateUserCommand, UserResponseDTO>
  implements ICommandHandler<CreateUserCommand> {
  readonly commandType = 'CreateUserCommand';
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserServiceInterface,
  ) { super(); }

  async execute(command: CreateUserCommand): Promise<UserResponseDTO> {
    const entity: UserEntity = await this.userService.create(command.input);
    return this.userService.toResponse(entity);
  }
}
