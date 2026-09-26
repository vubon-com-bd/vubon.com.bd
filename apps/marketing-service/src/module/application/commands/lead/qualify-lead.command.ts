import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class QualifyLeadCommand extends BaseCommand {
  readonly type = 'marketing.lead.qualify';
  constructor(public readonly leadId: string) { super(); }
}
