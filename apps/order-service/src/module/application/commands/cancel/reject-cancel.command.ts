/**
 * RejectCancelCommand
 * @module order-service/application/commands/cancel
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RejectCancelCommandDTO } from '../../dtos/requests/cancel/index.js';

export class RejectCancelCommand extends BaseCommand {
  readonly type = 'order.cancel.reject';

  constructor(
    public readonly dto: RejectCancelCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
