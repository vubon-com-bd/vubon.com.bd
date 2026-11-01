import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { TerminateCourierRequestDTO } from '@application/dtos/requests/courier/index.js';
export class TerminateCourierCommand extends BaseCommand {
  readonly type = 'logistics.courier.terminate';
  constructor(public readonly dto: TerminateCourierRequestDTO, public readonly actorId: string) { super(); }
}
