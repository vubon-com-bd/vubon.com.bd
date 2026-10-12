import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { NotificationPrefsDto } from '../../services/interfaces/vendor-settings.service.interface.js';

export class UpdateNotificationsCommand extends BaseCommand {
  readonly type = 'vendor.settings.update_notifications';
  constructor(
    public readonly vendorId: string,
    public readonly prefs: Partial<NotificationPrefsDto>,
    public readonly actorId?: string,
  ) { super(); }
}
