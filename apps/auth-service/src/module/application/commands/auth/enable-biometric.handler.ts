import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { EnableBiometricCommand } from './enable-biometric.command';
import type { AuthBiometricServiceInterface } from '../../services/interfaces/auth-biometric.service.interface';
import type { BiometricResponseDTO } from '../../dtos/responses/biometric-response.dto';

@CommandHandler(EnableBiometricCommand)
export class EnableBiometricHandler
  extends BaseCommandHandler<EnableBiometricCommand, BiometricResponseDTO>
  implements ICommandHandler<EnableBiometricCommand>
{
  readonly commandType = 'auth.enable-biometric';

  constructor(
    private readonly biometricService: AuthBiometricServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: EnableBiometricCommand): Promise<BiometricResponseDTO> {
    return this.biometricService.enroll(command.userId, {
      biometricId: command.biometricId,
      type: command.biometricType,
    });
  }
}
