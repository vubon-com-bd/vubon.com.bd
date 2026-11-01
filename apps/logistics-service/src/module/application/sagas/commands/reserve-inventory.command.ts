import { BaseCommand } from '@vubon/shared-kernel/application/commands';


export interface ReserveInventoryPayload {
  readonly sagaId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class ReserveInventoryCommand extends BaseCommand {
  readonly type = 'logistics.saga.reserve_inventory';
  constructor(public readonly payload: ReserveInventoryPayload) { super(); }
}
