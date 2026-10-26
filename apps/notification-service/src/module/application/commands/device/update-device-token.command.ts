import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateDeviceTokenCommandDTO } from '@application/dtos/requests/device/index.js';

export class UpdateDeviceTokenCommand extends BaseCommand {
  readonly type = 'notification.device.update_token';
  constructor(public readonly dto: UpdateDeviceTokenCommandDTO, public readonly actorId?: string) { super(); }
}
