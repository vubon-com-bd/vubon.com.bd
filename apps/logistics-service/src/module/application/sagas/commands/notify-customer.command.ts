import { BaseCommand } from '@vubon/shared-kernel/application/commands';


export interface NotifyCustomerPayload {
  readonly sagaId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class NotifyCustomerCommand extends BaseCommand {
  readonly type = 'logistics.saga.notify_customer';
  constructor(public readonly payload: NotifyCustomerPayload) { super(); }
}
