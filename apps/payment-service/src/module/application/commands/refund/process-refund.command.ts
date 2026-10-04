import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ProcessRefundRequestDTO } from '../../dtos/requests/refund/refund.dto.js';

export class ProcessRefundCommand extends BaseCommand {
  readonly type = 'refund.process';
  constructor(
    public readonly dto: ProcessRefundRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
