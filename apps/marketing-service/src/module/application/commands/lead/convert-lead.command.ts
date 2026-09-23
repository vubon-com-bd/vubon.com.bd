import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ConvertLeadCommand extends BaseCommand {
  readonly type = 'marketing.lead.convert';
  constructor(
    public readonly leadId: string,
    public readonly userId: string,
  ) { super(); }
}
