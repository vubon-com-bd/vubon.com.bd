import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DriverActionRequestDTO } from '@application/dtos/requests/driver/index.js';
export class GoOnDutyDriverCommand extends BaseCommand {
  readonly type = 'logistics.driver.go_on_duty';
  constructor(public readonly dto: DriverActionRequestDTO, public readonly actorId: string) { super(); }
}
