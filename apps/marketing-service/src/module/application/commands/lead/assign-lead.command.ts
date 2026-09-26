import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AssignLeadCommand extends BaseCommand {
  readonly type = 'marketing.lead.assign';
  constructor(
    public readonly leadId: string,
    public readonly assigneeId: string,
  ) { super(); }
}
