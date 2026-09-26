import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class PublishSocialPostCommand extends BaseCommand {
  readonly type = 'marketing.social-media.publish';
  constructor(public readonly postId: string) { super(); }
}
