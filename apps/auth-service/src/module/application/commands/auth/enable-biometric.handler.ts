import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { EnableBiometricCommand } from './enable-biometric.command.js';
import type { AuthBiometricServiceInterface } from '../../services/interfaces/auth-biometric.service.interface.js';
import type { BiometricResponseDTO } from '../../dtos/responses/biometric-response.dto.js';
import { AUTH_BIOMETRIC_SERVICE } from '../../tokens.js';

@CommandHandler(EnableBiometricCommand)
export class EnableBiometricHandler
  extends BaseCommandHandler<EnableBiometricCommand, BiometricResponseDTO>
  implements ICommandHandler<EnableBiometricCommand> {
  readonly commandType = 'EnableBiometricCommand';
  constructor(
    @Inject(AUTH_BIOMETRIC_SERVICE) private readonly biometricService: AuthBiometricServiceInterface,
  ) { super(); }

  async execute(command: EnableBiometricCommand): Promise<BiometricResponseDTO> {
    return this.biometricService.enroll(command.userId, command.input);
  }
}
