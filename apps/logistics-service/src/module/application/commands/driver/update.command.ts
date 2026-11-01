import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateDriverRequestDTO } from '@application/dtos/requests/driver/index.js';
export class UpdateDriverCommand extends BaseCommand {
  readonly type = 'logistics.driver.update';
  constructor(public readonly dto: UpdateDriverRequestDTO, public readonly actorId: string) { super(); }
}
