import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DisableBiometricCommand } from './disable-biometric.command';
import type { AuthBiometricServiceInterface } from '../../services/interfaces/auth-biometric.service.interface';
import { AUTH_BIOMETRIC_SERVICE } from '../../tokens';

@CommandHandler(DisableBiometricCommand)
export class DisableBiometricHandler
  extends BaseCommandHandler<DisableBiometricCommand, void>
  implements ICommandHandler<DisableBiometricCommand> {
  readonly commandType = 'DisableBiometricCommand';
  constructor(
    @Inject(AUTH_BIOMETRIC_SERVICE) private readonly biometricService: AuthBiometricServiceInterface,
  ) { super(); }

  async execute(command: DisableBiometricCommand): Promise<void> {
    await this.biometricService.remove(command.userId, command.input);
  }
}
