import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('webhooks/ses')
export class SesWebhookController {
  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() body: Record<string, unknown>): Promise<{ ok: boolean }> {
    void body;
    return { ok: true };
  }
}
