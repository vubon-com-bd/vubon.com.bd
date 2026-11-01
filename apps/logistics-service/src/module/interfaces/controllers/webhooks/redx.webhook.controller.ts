import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiExcludeController } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { WebhookSignatureGuard } from '../../guards/webhook-signature.guard.js';
import { HandleRedxWebhookCommand } from '@application/commands/webhook/handle-redx-webhook.command.js';
import { WebhookRequestHttpDTO } from '../../dtos/requests/webhook/webhook.request.dto.js';
import { WebhookControllerMapper } from '../../mappers/webhook.controller.mapper.js';

@ApiExcludeController()
@Public()
@Controller('webhooks/redx')
@UseGuards(WebhookSignatureGuard)
export class RedxWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() dto: WebhookRequestHttpDTO): Promise<{ success: boolean }> {
    const appDto = WebhookControllerMapper.toAppDto(dto);
    return this.commandBus.execute<
      HandleRedxWebhookCommand,
      { success: boolean }
    >(new HandleRedxWebhookCommand(appDto as never));
  }
}
