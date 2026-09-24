import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdatePreferenceCommand } from './update-preference.command';
import type { PreferenceResponseDTO } from '../../dtos/responses/preference-response.dto';
import type { PreferenceMatrixRepository } from '../../../domain/repositories/preference-matrix.repository.interface';
import { PreferenceMatrixEntity } from '../../../domain/entities/preference-matrix.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@CommandHandler(UpdatePreferenceCommand)
export class UpdatePreferenceHandler
  extends BaseCommandHandler<UpdatePreferenceCommand, PreferenceResponseDTO>
  implements ICommandHandler<UpdatePreferenceCommand>
{
  readonly commandType = 'preference.update';

  constructor(private readonly matrixRepo: PreferenceMatrixRepository) {
    super();
  }

  async execute(command: UpdatePreferenceCommand): Promise<PreferenceResponseDTO> {
    const userIdVO = UserIdVO.create(command.userId);
    let matrix = await this.matrixRepo.findByUser(userIdVO);

    const optIn = command.value === true || command.value === 'true';

    if (!matrix) {
      matrix = PreferenceMatrixEntity.create({
        userId: userIdVO,
        emailOptIn: true,
        smsOptIn: true,
        pushOptIn: true,
        inAppOptIn: true,
        webhookOptIn: true,
      });
    }

    const patched = PreferenceMatrixEntity.reconstitute(
      matrix.id,
      {
        userId: matrix.userId,
        emailOptIn: command.preferenceType === 'email' ? optIn : matrix.emailOptIn,
        smsOptIn: command.preferenceType === 'sms' ? optIn : matrix.smsOptIn,
        pushOptIn: command.preferenceType === 'push' ? optIn : matrix.pushOptIn,
        inAppOptIn: command.preferenceType === 'in_app' ? optIn : matrix.inAppOptIn,
        webhookOptIn: command.preferenceType === 'webhook' ? optIn : matrix.webhookOptIn,
      },
      matrix.createdAt,
      new Date().toISOString(),
      matrix.deletedAt ?? null,
    );

    const saved = await this.matrixRepo.save(patched);

    return {
      userId: saved.userId.value,
      emailOptIn: saved.emailOptIn,
      smsOptIn: saved.smsOptIn,
      pushOptIn: saved.pushOptIn,
      inAppOptIn: saved.inAppOptIn,
      webhookOptIn: saved.webhookOptIn,
    };
  }
}
