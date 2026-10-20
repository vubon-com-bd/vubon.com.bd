/**
 * CompleteReturnCommand
 * @module order-service/application/commands/return
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CompleteReturnCommandDTO } from '../../dtos/requests/return/index.js';

export class CompleteReturnCommand extends BaseCommand {
  readonly type = 'order.return.complete';

  constructor(
    public readonly dto: CompleteReturnCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
