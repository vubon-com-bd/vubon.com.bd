/**
 * RequestReturnCommand
 * @module order-service/application/commands/return
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RequestReturnCommandDTO } from '../../dtos/requests/return/index.js';

export class RequestReturnCommand extends BaseCommand {
  readonly type = 'order.return.request';

  constructor(
    public readonly dto: RequestReturnCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
