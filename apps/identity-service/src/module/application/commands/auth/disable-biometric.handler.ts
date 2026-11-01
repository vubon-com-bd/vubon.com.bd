import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DisableBiometricCommand } from './disable-biometric.command.js';
import type { BiometricResponseDTO } from '../../dtos/responses/biometric-response.dto.js';
import type { AuthBiometricServiceInterface } from '../../services/interfaces/auth-biometric.service.interface.js';
import { AUTH_BIOMETRIC_SERVICE } from '../../services/interfaces/auth-biometric.service.interface.js';

@CommandHandler(DisableBiometricCommand)
export class DisableBiometricHandler
  extends BaseCommandHandler<DisableBiometricCommand, BiometricResponseDTO>
  implements ICommandHandler<DisableBiometricCommand>
{
  readonly commandType = 'auth.disable-biometric';
  constructor(@Inject(AUTH_BIOMETRIC_SERVICE) private readonly service: AuthBiometricServiceInterface) { super(); }
  async execute(command: DisableBiometricCommand): Promise<BiometricResponseDTO> {
    return this.service.disable(command.authId, command.input.deviceId);
  }
}
