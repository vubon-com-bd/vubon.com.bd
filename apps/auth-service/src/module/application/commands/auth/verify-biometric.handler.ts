import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { VerifyBiometricCommand } from './verify-biometric.command';
import type { AuthBiometricServiceInterface } from '../../services/interfaces/auth-biometric.service.interface';
import { BiometricOperationFailedError } from '../../errors/biometric.errors';

@CommandHandler(VerifyBiometricCommand)
export class VerifyBiometricHandler
  extends BaseCommandHandler<VerifyBiometricCommand, boolean>
  implements ICommandHandler<VerifyBiometricCommand>
{
  readonly commandType = 'auth.verify-biometric';

  constructor(
    @Inject('AuthBiometricService') @Inject('AuthBiometricService') private readonly biometricService: AuthBiometricServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: VerifyBiometricCommand): Promise<boolean> {
    const ok = await this.biometricService.verify(
      command.userId,
      command.biometricId,
    );
    if (!ok) {
      throw new BiometricOperationFailedError('biometric verification failed');
    }
    return true;
  }
}
