import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ActivateCourierRequestDTO } from '@application/dtos/requests/courier/index.js';
export class ActivateCourierCommand extends BaseCommand {
  readonly type = 'logistics.courier.activate';
  constructor(public readonly dto: ActivateCourierRequestDTO, public readonly actorId: string) { super(); }
}
