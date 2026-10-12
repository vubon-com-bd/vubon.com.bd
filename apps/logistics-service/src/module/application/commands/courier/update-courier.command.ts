import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateCourierRequestDTO } from '../../dtos/requests/courier/courier.dto.js';
export class UpdateCourierCommand extends BaseCommand {
  readonly type = 'logistics.courier.update';
  constructor(public readonly dto: UpdateCourierRequestDTO, public readonly actorId?: string) { super(); }
}
