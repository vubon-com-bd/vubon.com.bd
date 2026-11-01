import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SuspendCourierRequestDTO } from '@application/dtos/requests/courier/index.js';
export class SuspendCourierCommand extends BaseCommand {
  readonly type = 'logistics.courier.suspend';
  constructor(public readonly dto: SuspendCourierRequestDTO, public readonly actorId: string) { super(); }
}
