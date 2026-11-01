import { BaseCommand } from '@vubon/shared-kernel/application/commands';


export interface SendTrackingUpdatePayload {
  readonly sagaId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class SendTrackingUpdateCommand extends BaseCommand {
  readonly type = 'logistics.saga.send_tracking_update';
  constructor(public readonly payload: SendTrackingUpdatePayload) { super(); }
}
