import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RegisterCourierRequestDTO } from '../../dtos/requests/courier/courier.dto.js';
export class RegisterCourierCommand extends BaseCommand {
  readonly type = 'logistics.courier.register';
  constructor(public readonly dto: RegisterCourierRequestDTO, public readonly actorId?: string) { super(); }
}
