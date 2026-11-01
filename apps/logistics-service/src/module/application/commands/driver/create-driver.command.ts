import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateDriverRequestDTO } from '@application/dtos/requests/driver/index.js';
export class CreateDriverCommand extends BaseCommand {
  readonly type = 'logistics.driver.create';
  constructor(public readonly dto: CreateDriverRequestDTO, public readonly actorId: string) { super(); }
}
