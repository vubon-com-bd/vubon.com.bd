import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiExcludeController } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { WebhookSignatureGuard } from '../../guards/webhook-signature.guard.js';
import { HandleSteadfastWebhookCommand } from '@application/commands/webhook/handle-steadfast-webhook.command.js';
import { WebhookRequestHttpDTO } from '../../dtos/requests/webhook/webhook.request.dto.js';
import { WebhookControllerMapper } from '../../mappers/webhook.controller.mapper.js';

@ApiExcludeController()
@Public()
@Controller('webhooks/steadfast')
@UseGuards(WebhookSignatureGuard)
export class SteadfastWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() dto: WebhookRequestHttpDTO): Promise<{ success: boolean }> {
    const appDto = WebhookControllerMapper.toAppDto(dto);
    return this.commandBus.execute<
      HandleSteadfastWebhookCommand,
      { success: boolean }
    >(new HandleSteadfastWebhookCommand(appDto as never));
  }
}
