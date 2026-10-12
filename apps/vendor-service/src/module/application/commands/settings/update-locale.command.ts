import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class UpdateLocaleCommand extends BaseCommand {
  readonly type = 'vendor.settings.update_locale';
  constructor(
    public readonly vendorId: string,
    public readonly timezone: string,
    public readonly locale: string,
    public readonly actorId?: string,
  ) { super(); }
}
