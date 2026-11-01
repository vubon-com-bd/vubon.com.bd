/**
 * PublicUnsubscribeController — public unsubscribe/resubscribe endpoints
 * @module notification-service/interfaces/controllers/rest
 *
 * No JWT required — token-based (signed HMAC token in URL)
 * Required for CAN-SPAM / GDPR compliance.
 */
import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { UnsubscribeTokenInfraService } from '@infrastructure/services/internal/unsubscribe-token.service.js';
import {
  PREFERENCE_SERVICE,
  type IPreferenceService,
} from '@application/services/interfaces/preference.service.interface.js';

@ApiTags('public-unsubscribe')
@Controller('unsubscribe')
export class PublicUnsubscribeController {
  private readonly logger = new Logger(PublicUnsubscribeController.name);

  constructor(
    private readonly tokenService: UnsubscribeTokenInfraService,
    @Inject(PREFERENCE_SERVICE)
    private readonly preferenceService: IPreferenceService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Show unsubscribe confirmation page (no auth)' })
  async showConfirmPage(
    @Query('token') token: string,
    @Res() res: Response,
  ): Promise<void> {
    if (!token) {
      res.status(400).send(this.renderPage({
        title: 'Invalid Link',
        message: 'Missing unsubscribe token.',
        success: false,
      }));
      return;
    }

    try {
      const payload = this.tokenService.verifyToken(token);
      res.status(200).send(this.renderPage({
        title: 'Unsubscribe from Emails',
        message: `Do you want to stop receiving <strong>${payload.channel}</strong> notifications?`,
        token,
        success: true,
        showButton: true,
      }));
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Invalid token';
      res.status(400).send(this.renderPage({
        title: 'Invalid or Expired Link',
        message: `This unsubscribe link is invalid or has expired: ${msg}`,
        success: false,
      }));
    }
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Perform unsubscribe (no auth)' })
  async performUnsubscribe(
    @Body() body: { token: string },
    @Res() res: Response,
  ): Promise<void> {
    if (!body?.token) {
      res.status(400).send(this.renderPage({
        title: 'Invalid Request',
        message: 'Missing token.',
        success: false,
      }));
      return;
    }

    try {
      const payload = this.tokenService.verifyToken(body.token);
      
      this.logger.log(
        `Public unsubscribe: user=${payload.userId} channel=${payload.channel}`,
      );

      await this.preferenceService.unsubscribe(
        {
          userId: payload.userId,
          channel: payload.channel,
          reason: 'user-requested',
        } as never,
        'public-unsubscribe',
      );

      res.status(200).send(this.renderPage({
        title: 'Successfully Unsubscribed',
        message: `You have been unsubscribed from <strong>${payload.channel}</strong> notifications. You will no longer receive these emails.`,
        success: true,
      }));
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed';
      res.status(500).send(this.renderPage({
        title: 'Unsubscribe Failed',
        message: `We could not process your request: ${msg}`,
        success: false,
      }));
    }
  }

  private renderPage(input: {
    title: string;
    message: string;
    success: boolean;
    token?: string;
    showButton?: boolean;
  }): string {
    const color = input.success ? '#10b981' : '#ef4444';
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${input.title} — Vubon</title>
<style>
  body { font-family: 'Inter', Arial, sans-serif; background: #f1f5f9; margin: 0; padding: 40px 20px; }
  .card { max-width: 500px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; }
  .header { background: #0f172a; color: white; padding: 24px; text-align: center; font-size: 20px; font-weight: 600; }
  .body { padding: 32px 24px; text-align: center; }
  .icon { font-size: 48px; margin-bottom: 16px; }
  h1 { color: ${color}; font-size: 22px; margin: 0 0 16px 0; }
  p { color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0; }
  button, a.btn { background: ${color}; color: white; border: none; padding: 12px 32px; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; }
  button:hover { opacity: 0.9; }
</style>
</head>
<body>
  <div class="card">
    <div class="header">Vubon</div>
    <div class="body">
      <div class="icon">${input.success ? '✅' : '❌'}</div>
      <h1>${input.title}</h1>
      <p>${input.message}</p>
      ${input.showButton && input.token ? `
        <form method="POST" action="/unsubscribe">
          <input type="hidden" name="token" value="${input.token}" />
          <button type="submit">Confirm Unsubscribe</button>
        </form>
      ` : ''}
    </div>
  </div>
</body>
</html>`;
  }
}
