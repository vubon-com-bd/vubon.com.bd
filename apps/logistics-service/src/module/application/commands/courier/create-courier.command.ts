import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateCourierRequestDTO } from '@application/dtos/requests/courier/index.js';
export class CreateCourierCommand extends BaseCommand {
  readonly type = 'logistics.courier.create';
  constructor(public readonly dto: CreateCourierRequestDTO, public readonly actorId: string) { super(); }
}
