import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeactivateCourierRequestDTO } from '../../dtos/requests/courier/courier.dto.js';
export class DeactivateCourierCommand extends BaseCommand {
  readonly type = 'logistics.courier.deactivate';
  constructor(public readonly dto: DeactivateCourierRequestDTO, public readonly actorId?: string) { super(); }
}
