import { Injectable } from '@nestjs/common';
import { AbstractProvider } from '../base/provider.abstract';
import type { ProviderSendInput, ProviderSendResult } from '../base/provider.types';

@Injectable()
export class SmtpProvider extends AbstractProvider {
  readonly name = 'smtp';
  readonly channel = 'email';

  async send(input: ProviderSendInput): Promise<ProviderSendResult> {
    try {
      const host = process.env.SMTP_HOST;
      const port = process.env.SMTP_PORT;
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;

      if (!host || !user || !pass) {
        throw new Error('SMTP credentials not configured');
      }

      // ⚠️ Real nodemailer integration
      // const nodemailer = require('nodemailer');
      // const transporter = nodemailer.createTransport({
      //   host, port: Number(port), secure: true,
      //   auth: { user, pass },
      // });
      // await transporter.sendMail({
      //   from: this.config.fromAddress,
      //   to: input.recipient,
      //   subject: input.subject,
      //   html: input.bodyHtml,
      //   text: input.body,
      // });

      const messageId = this.generateMessageId();
      this.logger.log(`SMTP (${host}:${port}) → ${input.recipient} (${messageId})`);
      return this.buildResult(true, messageId);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`SMTP error for ${input.recipient}: ${message}`);
      return this.buildResult(false, null, message);
    }
  }

  async isAvailable(): Promise<boolean> {
    return Boolean(process.env.SMTP_HOST);
  }
}
