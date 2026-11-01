import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SuspendDriverRequestDTO } from '@application/dtos/requests/driver/index.js';
export class SuspendDriverCommand extends BaseCommand {
  readonly type = 'logistics.driver.suspend';
  constructor(public readonly dto: SuspendDriverRequestDTO, public readonly actorId: string) { super(); }
}
