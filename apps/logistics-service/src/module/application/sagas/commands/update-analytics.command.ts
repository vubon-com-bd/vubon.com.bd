import { BaseCommand } from '@vubon/shared-kernel/application/commands';


export interface UpdateAnalyticsPayload {
  readonly sagaId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class UpdateAnalyticsCommand extends BaseCommand {
  readonly type = 'logistics.saga.update_analytics';
  constructor(public readonly payload: UpdateAnalyticsPayload) { super(); }
}
