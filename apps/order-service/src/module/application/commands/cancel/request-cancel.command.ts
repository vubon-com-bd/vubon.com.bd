/**
 * RequestCancelCommand
 * @module order-service/application/commands/cancel
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RequestCancelCommandDTO } from '../../dtos/requests/cancel/index.js';

export class RequestCancelCommand extends BaseCommand {
  readonly type = 'order.cancel.request';

  constructor(
    public readonly dto: RequestCancelCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
