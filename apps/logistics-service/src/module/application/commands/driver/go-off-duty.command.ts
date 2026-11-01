import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DriverActionRequestDTO } from '@application/dtos/requests/driver/index.js';
export class GoOffDutyDriverCommand extends BaseCommand {
  readonly type = 'logistics.driver.go_off_duty';
  constructor(public readonly dto: DriverActionRequestDTO, public readonly actorId: string) { super(); }
}
