/**
 * RegisterVendorCommand
 * @module vendor-service/application/commands/vendor
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RegisterVendorRequestDto } from '../../dtos/requests/register-vendor.dto.js';

export class RegisterVendorCommand extends BaseCommand {
  readonly type = 'vendor.register';
  constructor(
    public readonly dto: RegisterVendorRequestDto,
    public readonly actorId?: string,
  ) {
    super();
  }
}
