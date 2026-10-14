/**
 * DeleteVendorCommand
 * @module vendor-service/application/commands/vendor
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeleteVendorRequestDTO } from '../../dtos/requests/vendor/index.js';

export class DeleteVendorCommand extends BaseCommand {
  readonly type = 'vendor.vendor.delete';
  constructor(public readonly dto: DeleteVendorRequestDTO) {
    super();
  }
}
