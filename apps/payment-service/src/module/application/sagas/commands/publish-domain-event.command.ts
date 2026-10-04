import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class PublishDomainEventCommand extends BaseCommand {
  readonly type = 'saga.publish_domain_event';
  constructor(
    public readonly aggregateId: string,
    public readonly eventType: string,
    public readonly payload: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}
