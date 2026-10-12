/**
 * ActivateVendorCommand
 * @module vendor-service/application/commands/lifecycle
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ActivateVendorRequestDto } from '../../dtos/requests/activate-vendor.dto.js';

export class ActivateVendorCommand extends BaseCommand {
  readonly type = 'vendor.activate';
  constructor(
    public readonly dto: ActivateVendorRequestDto,
    public readonly actorId?: string,
  ) {
    super();
  }
}
