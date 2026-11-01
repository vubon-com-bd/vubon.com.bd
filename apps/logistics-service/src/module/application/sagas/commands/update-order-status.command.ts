import { BaseCommand } from '@vubon/shared-kernel/application/commands';


export interface UpdateOrderStatusPayload {
  readonly sagaId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class UpdateOrderStatusCommand extends BaseCommand {
  readonly type = 'logistics.saga.update_order_status';
  constructor(public readonly payload: UpdateOrderStatusPayload) { super(); }
}
