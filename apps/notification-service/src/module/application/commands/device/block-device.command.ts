import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { BlockDeviceRequestDTO } from '../../dtos/requests/device/device.dto.js';

export class BlockDeviceCommand extends BaseCommand {
  readonly type = 'device.block';
  constructor(public readonly dto: BlockDeviceRequestDTO) {
    super();
  }
}
