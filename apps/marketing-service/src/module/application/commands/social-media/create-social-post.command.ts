import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateSocialPostCommand extends BaseCommand {
  readonly type = 'marketing.social-media.create';
  constructor(
    public readonly platform: string,
    public readonly content: string,
  ) { super(); }
}
