import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { VerifyBiometricCommand } from './verify-biometric.command.js';
import type { AuthBiometricServiceInterface } from '../../services/interfaces/auth-biometric.service.interface.js';
import { AUTH_BIOMETRIC_SERVICE } from '../../services/interfaces/auth-biometric.service.interface.js';

export interface VerifyBiometricResponse { readonly success: true; readonly verified: boolean; }

@CommandHandler(VerifyBiometricCommand)
export class VerifyBiometricHandler
  extends BaseCommandHandler<VerifyBiometricCommand, VerifyBiometricResponse>
  implements ICommandHandler<VerifyBiometricCommand>
{
  readonly commandType = 'auth.verify-biometric';
  constructor(@Inject(AUTH_BIOMETRIC_SERVICE) private readonly service: AuthBiometricServiceInterface) { super(); }
  async execute(command: VerifyBiometricCommand): Promise<VerifyBiometricResponse> {
    const verified = await this.service.verify(command.authId, command.input);
    return { success: true, verified };
  }
}
