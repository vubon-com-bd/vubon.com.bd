/**
 * DeactivateVendorCommand
 * @module vendor-service/application/commands/lifecycle
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeactivateVendorRequestDto } from '../../dtos/requests/deactivate-vendor.dto.js';

export class DeactivateVendorCommand extends BaseCommand {
  readonly type = 'vendor.deactivate';
  constructor(
    public readonly dto: DeactivateVendorRequestDto,
    public readonly actorId?: string,
  ) {
    super();
  }
}
