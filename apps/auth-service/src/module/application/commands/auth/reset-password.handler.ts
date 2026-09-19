import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ResetPasswordCommand } from './reset-password.command';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserPasswordVO } from '../../../domain/value-objects/primitives/user-password.vo';
import type { PasswordHasherPort } from '../../ports/password-hasher.port';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler
  extends BaseCommandHandler<ResetPasswordCommand, void>
  implements ICommandHandler<ResetPasswordCommand>
{
  readonly commandType = 'auth.reset-password';

  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordHasher: PasswordHasherPort,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ResetPasswordCommand): Promise<void> {
    UserPasswordVO.create(command.newPassword);
    void this.userRepo;
    void this.passwordHasher;
    void command.token;
    throw new Error('reset-password orchestration not yet wired');
  }
}
