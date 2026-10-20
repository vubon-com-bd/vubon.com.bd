/**
 * AddTrackingCommand
 * @module order-service/application/commands/tracking
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddTrackingCommandDTO } from '../../dtos/requests/tracking/index.js';

export class AddTrackingCommand extends BaseCommand {
  readonly type = 'order.tracking.add';

  constructor(
    public readonly dto: AddTrackingCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
