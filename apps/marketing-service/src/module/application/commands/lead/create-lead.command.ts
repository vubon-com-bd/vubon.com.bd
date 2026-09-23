import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateLeadCommand extends BaseCommand {
  readonly type = 'marketing.lead.create';
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly source: string,
  ) { super(); }
}
