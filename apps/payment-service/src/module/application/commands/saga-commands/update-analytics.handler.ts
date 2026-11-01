/**
 * UpdateAnalyticsHandler — stub that logs saga analytics events
 * @module payment-service/application/commands/saga-commands
 *
 * The real analytics forwarding happens downstream (Kafka/BullMQ fan-out).
 * This stub prevents `CommandHandlerNotFoundException` and gives a
 * debug trace of every saga analytics event.
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UpdateAnalyticsCommand } from '@application/sagas/commands/update-analytics.command';

@CommandHandler(UpdateAnalyticsCommand)
export class UpdateAnalyticsHandler
  implements ICommandHandler<UpdateAnalyticsCommand, void>
{
  private readonly logger = new Logger(UpdateAnalyticsHandler.name);

  async execute(c: UpdateAnalyticsCommand): Promise<void> {
    this.logger.debug(
      `[analytics-stub] event=${c.event} payment=${c.paymentId} ` +
        `data=${JSON.stringify(c.data ?? {})} saga=${c.sagaId ?? 'n/a'}`,
    );
  }
}
