import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SetCourierDefaultRequestDTO } from '../../dtos/requests/courier/courier.dto.js';
export class SetCourierDefaultCommand extends BaseCommand {
  readonly type = 'logistics.courier.set_default';
  constructor(public readonly dto: SetCourierDefaultRequestDTO, public readonly actorId?: string) { super(); }
}
