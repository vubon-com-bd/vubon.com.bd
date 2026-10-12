/**
 * RejectVendorCommand
 * @module vendor-service/application/commands/vendor
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RejectVendorRequestDto } from '../../dtos/requests/reject-vendor.dto.js';

export class RejectVendorCommand extends BaseCommand {
  readonly type = 'vendor.reject';
  constructor(
    public readonly dto: RejectVendorRequestDto,
    public readonly actorId?: string,
  ) {
    super();
  }
}
