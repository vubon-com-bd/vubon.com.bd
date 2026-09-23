import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateSocialPostCommand } from './create-social-post.command';
import type { SocialMediaServiceInterface } from '../../services/interfaces/social-media.service.interface';
import type { SocialPostResponseDTO } from '../../dtos/responses/social-post-response.dto';

@CommandHandler(CreateSocialPostCommand)
export class CreateSocialPostHandler
  extends BaseCommandHandler<CreateSocialPostCommand, SocialPostResponseDTO>
  implements ICommandHandler<CreateSocialPostCommand>
{
  readonly commandType = 'marketing.social-media.create';
  constructor(private readonly service: SocialMediaServiceInterface) { super(); }
  async execute(command: CreateSocialPostCommand): Promise<SocialPostResponseDTO> {
    return this.service.create({
      platform: command.platform,
      content: command.content,
    } as never);
  }
}
