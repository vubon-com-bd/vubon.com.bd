import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateDriverRequestDTO } from '../../dtos/requests/driver/driver.dto.js';
export class UpdateDriverCommand extends BaseCommand {
  readonly type = 'logistics.driver.update';
  constructor(public readonly dto: UpdateDriverRequestDTO, public readonly actorId?: string) { super(); }
}
