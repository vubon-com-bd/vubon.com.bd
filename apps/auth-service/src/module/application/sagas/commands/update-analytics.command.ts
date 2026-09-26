import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export type AnalyticsEventType =
  | 'login'
  | 'register'
  | 'mfa_enabled'
  | 'social_linked'
  | 'logout';

export class UpdateAnalyticsCommand extends BaseSagaCommand {
  readonly type = 'saga.update-analytics';
  constructor(
    public readonly eventType: AnalyticsEventType,
    public readonly userId: string,
    public readonly metadata?: Readonly<Record<string, string>>,
  ) { super(); }
}
