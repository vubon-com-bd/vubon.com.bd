import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class InitializeVendorSettingsCommand extends BaseCommand {
  readonly type = 'vendor.settings.initialize';
  constructor(
    public readonly vendorId: string,
    public readonly currency: string,
    public readonly actorId?: string,
  ) { super(); }
}
