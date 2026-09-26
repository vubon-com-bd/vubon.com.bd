import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ScheduleSocialPostCommand } from './schedule-social-post.command';
import type { SocialMediaServiceInterface } from '../../services/interfaces/social-media.service.interface';

@CommandHandler(ScheduleSocialPostCommand)
export class ScheduleSocialPostHandler
  extends BaseCommandHandler<ScheduleSocialPostCommand, void>
  implements ICommandHandler<ScheduleSocialPostCommand>
{
  readonly commandType = 'marketing.social-media.schedule';
  constructor(private readonly service: SocialMediaServiceInterface) { super(); }
  async execute(command: ScheduleSocialPostCommand): Promise<void> {
    await this.service.schedule(command.postId, command.scheduledAt);
  }
}
