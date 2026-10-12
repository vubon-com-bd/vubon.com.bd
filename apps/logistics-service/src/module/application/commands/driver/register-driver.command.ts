import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RegisterDriverRequestDTO } from '../../dtos/requests/driver/driver.dto.js';
export class RegisterDriverCommand extends BaseCommand {
  readonly type = 'logistics.driver.register';
  constructor(public readonly dto: RegisterDriverRequestDTO, public readonly actorId?: string) { super(); }
}
