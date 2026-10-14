import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { UpdateUserCommand } from './update-user.command.js';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto.js';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import { UserNotFoundError } from '../../../domain/errors/user.errors.js';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  extends BaseCommandHandler<UpdateUserCommand, UserResponseDTO>
  implements ICommandHandler<UpdateUserCommand>
{
  readonly commandType = 'user.update';
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {
    super();
  }

  async execute(command: UpdateUserCommand): Promise<UserResponseDTO> {
    const user = await this.userRepo.findById(command.userId);
    if (!user) throw new UserNotFoundError(command.userId);
    if (command.input.username) user['_username'] = command.input.username;
    const saved = await this.userRepo.save(user);
    await this.eventBridge.publishFromEntity(saved);
    return {
      id: user.id, email: user.email.value, firstName: user.firstName?.value,
      lastName: user.lastName?.value, username: user.username,
      status: user.status.value, type: user.type.value,
      roles: user.roles.map((r) => r.value),
      emailVerified: user.emailVerified, phoneVerified: user.phoneVerified,
      isMfaEnabled: user.isMfaEnabled, createdAt: user.createdAt,
    } as never;
  }
}
