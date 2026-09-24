import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { UploadAttachmentCommand } from '../../../application/commands/attachment/upload-attachment.command';

interface UploadBody {
  url: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'archive' | 'other';
  size: number;
  ticketId?: string;
  messageId?: string;
}

@ApiTags('Attachments')
@Controller('attachments')
@UseGuards(JwtAuthGuard)
export class AttachmentController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return { id };
  }

  @Post()
  async upload(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: UploadBody,
  ): Promise<unknown> {
    void user;
    return this.commandBus.execute(
      new UploadAttachmentCommand(
        body.url,
        body.type,
        body.size,
        body.ticketId,
        body.messageId,
      ),
    );
  }
}
