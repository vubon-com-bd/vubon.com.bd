import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { OnLeaveDriverRequestDTO } from '@application/dtos/requests/driver/index.js';
export class GoOnLeaveDriverCommand extends BaseCommand {
  readonly type = 'logistics.driver.go_on_leave';
  constructor(public readonly dto: OnLeaveDriverRequestDTO, public readonly actorId: string) { super(); }
}
