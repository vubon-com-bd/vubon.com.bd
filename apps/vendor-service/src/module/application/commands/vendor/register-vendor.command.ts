/**
 * RegisterVendorCommand
 * @module vendor-service/application/commands/vendor
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RegisterVendorCommandDTO } from '../../dtos/requests/vendor/index.js';

export class RegisterVendorCommand extends BaseCommand {
  readonly type = 'vendor.vendor.register';

  constructor(
    public readonly dto: RegisterVendorCommandDTO,
    public readonly userId: string,
    public readonly actorId?: string,
  ) {
    super();
  }
}
