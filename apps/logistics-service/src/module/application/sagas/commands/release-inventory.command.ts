import { BaseCommand } from '@vubon/shared-kernel/application/commands';


export interface ReleaseInventoryPayload {
  readonly sagaId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class ReleaseInventoryCommand extends BaseCommand {
  readonly type = 'logistics.saga.release_inventory';
  constructor(public readonly payload: ReleaseInventoryPayload) { super(); }
}
