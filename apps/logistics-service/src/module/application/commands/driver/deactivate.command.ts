import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeactivateDriverRequestDTO } from '@application/dtos/requests/driver/index.js';
export class DeactivateDriverCommand extends BaseCommand {
  readonly type = 'logistics.driver.deactivate';
  constructor(public readonly dto: DeactivateDriverRequestDTO, public readonly actorId: string) { super(); }
}
