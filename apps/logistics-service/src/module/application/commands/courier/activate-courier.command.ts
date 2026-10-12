import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ActivateCourierRequestDTO } from '../../dtos/requests/courier/courier.dto.js';
export class ActivateCourierCommand extends BaseCommand {
  readonly type = 'logistics.courier.activate';
  constructor(public readonly dto: ActivateCourierRequestDTO, public readonly actorId?: string) { super(); }
}
