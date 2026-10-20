/**
 * UpdateTrackingCommand
 * @module order-service/application/commands/tracking
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateTrackingCommandDTO } from '../../dtos/requests/tracking/index.js';

export class UpdateTrackingCommand extends BaseCommand {
  readonly type = 'order.tracking.update';

  constructor(
    public readonly dto: UpdateTrackingCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
