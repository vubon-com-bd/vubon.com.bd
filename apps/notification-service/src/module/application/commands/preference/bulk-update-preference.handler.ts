import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { BulkUpdatePreferenceCommand } from './bulk-update-preference.command';
import type { PreferenceMatrixRepository } from '../../../domain/repositories/preference-matrix.repository.interface';
import { PreferenceMatrixEntity } from '../../../domain/entities/preference-matrix.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@CommandHandler(BulkUpdatePreferenceCommand)
export class BulkUpdatePreferenceHandler
  extends BaseCommandHandler<BulkUpdatePreferenceCommand, { updated: number }>
  implements ICommandHandler<BulkUpdatePreferenceCommand>
{
  readonly commandType = 'preference.bulk-update';

  constructor(private readonly matrixRepo: PreferenceMatrixRepository) {
    super();
  }

  async execute(command: BulkUpdatePreferenceCommand): Promise<{ updated: number }> {
    const userIdVO = UserIdVO.create(command.userId);
    let matrix = await this.matrixRepo.findByUser(userIdVO);

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

    let emailOptIn = matrix.emailOptIn;
    let smsOptIn = matrix.smsOptIn;
    let pushOptIn = matrix.pushOptIn;
    let inAppOptIn = matrix.inAppOptIn;
    let webhookOptIn = matrix.webhookOptIn;

    for (const u of command.updates) {
      const optIn = u.value === true || u.value === 'true';
      switch (u.type) {
        case 'email': emailOptIn = optIn; break;
        case 'sms': smsOptIn = optIn; break;
        case 'push': pushOptIn = optIn; break;
        case 'in_app': inAppOptIn = optIn; break;
        case 'webhook': webhookOptIn = optIn; break;
      }
    }

    const updated = PreferenceMatrixEntity.reconstitute(
      matrix.id,
      { userId: matrix.userId, emailOptIn, smsOptIn, pushOptIn, inAppOptIn, webhookOptIn },
      matrix.createdAt,
      new Date().toISOString(),
      matrix.deletedAt ?? null,
    );

    await this.matrixRepo.save(updated);
    return { updated: command.updates.length };
  }
}
