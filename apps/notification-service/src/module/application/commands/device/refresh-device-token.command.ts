import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RefreshDeviceTokenRequestDTO } from '../../dtos/requests/device/device.dto.js';

export class RefreshDeviceTokenCommand extends BaseCommand {
  readonly type = 'device.refresh_token';
  constructor(public readonly dto: RefreshDeviceTokenRequestDTO) {
    super();
  }
}
