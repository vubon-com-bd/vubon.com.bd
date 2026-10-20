/**
 * ApproveCancelCommand
 * @module order-service/application/commands/cancel
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ApproveCancelCommandDTO } from '../../dtos/requests/cancel/index.js';

export class ApproveCancelCommand extends BaseCommand {
  readonly type = 'order.cancel.approve';

  constructor(
    public readonly dto: ApproveCancelCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
