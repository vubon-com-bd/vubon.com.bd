import { BaseCommand } from '@vubon/shared-kernel/application/commands';


export interface NotifyVendorPayload {
  readonly sagaId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class NotifyVendorCommand extends BaseCommand {
  readonly type = 'logistics.saga.notify_vendor';
  constructor(public readonly payload: NotifyVendorPayload) { super(); }
}
