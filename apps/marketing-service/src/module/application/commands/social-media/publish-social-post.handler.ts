import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { PublishSocialPostCommand } from './publish-social-post.command';
import type { SocialMediaServiceInterface } from '../../services/interfaces/social-media.service.interface';

@CommandHandler(PublishSocialPostCommand)
export class PublishSocialPostHandler
  extends BaseCommandHandler<PublishSocialPostCommand, void>
  implements ICommandHandler<PublishSocialPostCommand>
{
  readonly commandType = 'marketing.social-media.publish';
  constructor(private readonly service: SocialMediaServiceInterface) { super(); }
  async execute(command: PublishSocialPostCommand): Promise<void> {
    await this.service.publish(command.postId);
  }
}
