/**
 * RejectReturnCommand
 * @module order-service/application/commands/return
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RejectReturnCommandDTO } from '../../dtos/requests/return/index.js';

export class RejectReturnCommand extends BaseCommand {
  readonly type = 'order.return.reject';

  constructor(
    public readonly dto: RejectReturnCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
