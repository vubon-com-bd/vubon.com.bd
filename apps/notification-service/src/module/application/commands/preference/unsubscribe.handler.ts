import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UnsubscribeCommand } from './unsubscribe.command';
import type { PreferenceMatrixRepository } from '../../../domain/repositories/preference-matrix.repository.interface';
import { PreferenceMatrixEntity } from '../../../domain/entities/preference-matrix.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { UnsubscribeEvent } from '../../../domain/events/preference.events';

@CommandHandler(UnsubscribeCommand)
export class UnsubscribeHandler
  extends BaseCommandHandler<UnsubscribeCommand, void>
  implements ICommandHandler<UnsubscribeCommand>
{
  readonly commandType = 'preference.unsubscribe';

  constructor(
    private readonly matrixRepo: PreferenceMatrixRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UnsubscribeCommand): Promise<void> {
    const userIdVO = UserIdVO.create(command.userId);
    let matrix = await this.matrixRepo.findByUser(userIdVO);

    if (!matrix) {
      matrix = PreferenceMatrixEntity.create({
        userId: userIdVO,
        emailOptIn: true, smsOptIn: true, pushOptIn: true, inAppOptIn: true, webhookOptIn: true,
      });
    }

    const updated = PreferenceMatrixEntity.reconstitute(
      matrix.id,
      {
        userId: matrix.userId,
        emailOptIn: command.channel === 'email' ? false : matrix.emailOptIn,
        smsOptIn: command.channel === 'sms' ? false : matrix.smsOptIn,
        pushOptIn: command.channel === 'push' ? false : matrix.pushOptIn,
        inAppOptIn: command.channel === 'in_app' ? false : matrix.inAppOptIn,
        webhookOptIn: command.channel === 'webhook' ? false : matrix.webhookOptIn,
      },
      matrix.createdAt,
      new Date().toISOString(),
      matrix.deletedAt ?? null,
    );

    await this.matrixRepo.save(updated);

    // ✅ Fixed: 4 args (aggregateId, userId, channel, reason)
    await this.eventBus.publish(
      new UnsubscribeEvent(
        userIdVO.value,
        userIdVO,
        command.channel,
        command.reason ?? null,
        0,
      ),
    );
  }
}
