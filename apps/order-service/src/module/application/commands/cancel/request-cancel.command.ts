import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RequestCancelRequestDTO } from '../../dtos/requests/cancel/request-cancel.dto.js';

export class RequestCancelCommand extends BaseCommand {
  readonly type = 'cancel.request';
  constructor(public readonly dto: RequestCancelRequestDTO, public readonly actorId?: string) { super(); }
}
