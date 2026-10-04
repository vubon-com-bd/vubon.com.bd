import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ApproveCancelRequestDTO } from '../../dtos/requests/cancel/approve-cancel.dto.js';

export class ApproveCancelCommand extends BaseCommand {
  readonly type = 'cancel.approve';
  constructor(public readonly dto: ApproveCancelRequestDTO, public readonly actorId?: string) { super(); }
}
