/**
 * ApproveReturnCommand
 * @module order-service/application/commands/return
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ApproveReturnCommandDTO } from '../../dtos/requests/return/index.js';

export class ApproveReturnCommand extends BaseCommand {
  readonly type = 'order.return.approve';

  constructor(
    public readonly dto: ApproveReturnCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
