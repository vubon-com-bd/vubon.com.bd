/**
 * UpdateVendorCommand
 * @module vendor-service/application/commands/vendor
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateVendorRequestDto } from '../../dtos/requests/update-vendor.dto.js';

export class UpdateVendorCommand extends BaseCommand {
  readonly type = 'vendor.update';
  constructor(
    public readonly dto: UpdateVendorRequestDto,
    public readonly actorId?: string,
  ) {
    super();
  }
}
