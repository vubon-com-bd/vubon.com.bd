import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RejectCancelRequestDTO } from '../../dtos/requests/cancel/reject-cancel.dto.js';

export class RejectCancelCommand extends BaseCommand {
  readonly type = 'cancel.reject';
  constructor(public readonly dto: RejectCancelRequestDTO, public readonly actorId?: string) { super(); }
}
