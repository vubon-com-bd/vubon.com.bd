import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DisableBiometricCommand } from './disable-biometric.command';
import type { AuthBiometricServiceInterface } from '../../services/interfaces/auth-biometric.service.interface';

@CommandHandler(DisableBiometricCommand)
export class DisableBiometricHandler
  extends BaseCommandHandler<DisableBiometricCommand, void>
  implements ICommandHandler<DisableBiometricCommand>
{
  readonly commandType = 'auth.disable-biometric';

  constructor(
    private readonly biometricService: AuthBiometricServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DisableBiometricCommand): Promise<void> {
    await this.biometricService.disable(command.userId);
  }
}
