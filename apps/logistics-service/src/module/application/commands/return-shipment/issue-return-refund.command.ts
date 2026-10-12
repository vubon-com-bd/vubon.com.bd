import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { IssueRefundRequestDTO } from '../../dtos/requests/return-shipment/return-shipment.dto.js';
export class IssueReturnRefundCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.issue_refund';
  constructor(public readonly dto: IssueRefundRequestDTO, public readonly actorId?: string) { super(); }
}
