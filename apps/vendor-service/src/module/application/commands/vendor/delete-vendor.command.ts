/**
 * DeleteVendorCommand
 * @module vendor-service/application/commands/vendor
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeleteVendorRequestDto } from '../../dtos/requests/delete-vendor.dto.js';

export class DeleteVendorCommand extends BaseCommand {
  readonly type = 'vendor.delete';
  constructor(
    public readonly dto: DeleteVendorRequestDto,
    public readonly actorId?: string,
  ) {
    super();
  }
}
