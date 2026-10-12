/**
 * SuspendVendorCommand
 * @module vendor-service/application/commands/lifecycle
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SuspendVendorRequestDto } from '../../dtos/requests/suspend-vendor.dto.js';

export class SuspendVendorCommand extends BaseCommand {
  readonly type = 'vendor.suspend';
  constructor(
    public readonly dto: SuspendVendorRequestDto,
    public readonly actorId?: string,
  ) {
    super();
  }
}
