import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SetDriverStatusRequestDTO } from '../../dtos/requests/driver/driver.dto.js';
export class SetDriverStatusCommand extends BaseCommand {
  readonly type = 'logistics.driver.set_status';
  constructor(public readonly dto: SetDriverStatusRequestDTO, public readonly actorId?: string) { super(); }
}
