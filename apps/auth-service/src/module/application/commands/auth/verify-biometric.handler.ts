import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { VerifyBiometricCommand } from './verify-biometric.command';
import type { AuthBiometricServiceInterface } from '../../services/interfaces/auth-biometric.service.interface';
import { AUTH_BIOMETRIC_SERVICE } from '../../tokens';

@CommandHandler(VerifyBiometricCommand)
export class VerifyBiometricHandler
  extends BaseCommandHandler<VerifyBiometricCommand, boolean>
  implements ICommandHandler<VerifyBiometricCommand> {
  readonly commandType = 'VerifyBiometricCommand';
  constructor(
    @Inject(AUTH_BIOMETRIC_SERVICE) private readonly biometricService: AuthBiometricServiceInterface,
  ) { super(); }

  async execute(command: VerifyBiometricCommand): Promise<boolean> {
    return this.biometricService.verify(command.input);
  }
}
