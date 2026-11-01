import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DriverActionRequestDTO } from '@application/dtos/requests/driver/index.js';
export class MarkAvailableDriverCommand extends BaseCommand {
  readonly type = 'logistics.driver.mark_available';
  constructor(public readonly dto: DriverActionRequestDTO, public readonly actorId: string) { super(); }
}
