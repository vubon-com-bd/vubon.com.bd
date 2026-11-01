import { BaseCommand } from '@vubon/shared-kernel/application/commands';


export interface ProcessRefundPayload {
  readonly sagaId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class ProcessRefundCommand extends BaseCommand {
  readonly type = 'logistics.saga.process_refund';
  constructor(public readonly payload: ProcessRefundPayload) { super(); }
}
