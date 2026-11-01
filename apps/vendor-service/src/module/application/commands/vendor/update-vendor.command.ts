/**
 * UpdateVendorCommand
 * @module vendor-service/application/commands/vendor
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateVendorCommandDTO } from '../../dtos/requests/vendor/index.js';

export class UpdateVendorCommand extends BaseCommand {
  readonly type = 'vendor.vendor.update';

  constructor(
    public readonly dto: UpdateVendorCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
