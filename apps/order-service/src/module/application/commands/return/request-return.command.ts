import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RequestReturnRequestDTO } from '../../dtos/requests/return/request-return.dto.js';

export class RequestReturnCommand extends BaseCommand {
  readonly type = 'return.request';
  constructor(public readonly dto: RequestReturnRequestDTO, public readonly actorId?: string) { super(); }
}
