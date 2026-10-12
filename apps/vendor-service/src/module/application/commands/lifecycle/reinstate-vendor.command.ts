/**
 * ReinstateVendorCommand
 * @module vendor-service/application/commands/lifecycle
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReinstateVendorRequestDto } from '../../dtos/requests/reinstate-vendor.dto.js';

export class ReinstateVendorCommand extends BaseCommand {
  readonly type = 'vendor.reinstate';
  constructor(
    public readonly dto: ReinstateVendorRequestDto,
    public readonly actorId?: string,
  ) {
    super();
  }
}
