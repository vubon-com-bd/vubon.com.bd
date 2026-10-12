/**
 * ApproveVendorCommand
 * @module vendor-service/application/commands/vendor
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ApproveVendorRequestDto } from '../../dtos/requests/approve-vendor.dto.js';

export class ApproveVendorCommand extends BaseCommand {
  readonly type = 'vendor.approve';
  constructor(
    public readonly dto: ApproveVendorRequestDto,
    public readonly actorId?: string,
  ) {
    super();
  }
}
