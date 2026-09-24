import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyAgentAssignedCommand extends BaseSagaCommand {
  readonly type = 'saga.notify-agent-assigned';

  constructor(
    public readonly ticketId: string,
    public readonly agentId: string,
  ) {
    super();
  }
}
