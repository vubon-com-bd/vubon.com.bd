import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ScheduleSocialPostCommand extends BaseCommand {
  readonly type = 'marketing.social-media.schedule';
  constructor(
    public readonly postId: string,
    public readonly scheduledAt: string,
  ) { super(); }
}
