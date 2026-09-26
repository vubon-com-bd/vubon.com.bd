import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { CreateSocialPostCommand } from '../../../application/commands/social-media/create-social-post.command';
import { ScheduleSocialPostCommand } from '../../../application/commands/social-media/schedule-social-post.command';
import { PublishSocialPostCommand } from '../../../application/commands/social-media/publish-social-post.command';
import {
  CreateSocialPostRequestDTO,
  ScheduleSocialPostRequestDTO,
  PublishSocialPostRequestDTO,
} from '../../dtos/requests/social.request.dto';

@Controller('social-media')
@UseGuards(JwtAuthGuard)
export class SocialMediaController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('posts')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateSocialPostRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new CreateSocialPostCommand(body.platform, body.content),
    );
  }

  @Post('posts/schedule')
  @HttpCode(HttpStatus.OK)
  async schedule(@Body() body: ScheduleSocialPostRequestDTO): Promise<void> {
    await this.commandBus.execute(
      new ScheduleSocialPostCommand(body.postId, body.scheduledAt),
    );
  }

  @Post('posts/publish')
  @HttpCode(HttpStatus.OK)
  async publish(@Body() body: PublishSocialPostRequestDTO): Promise<void> {
    await this.commandBus.execute(new PublishSocialPostCommand(body.postId));
  }
}
