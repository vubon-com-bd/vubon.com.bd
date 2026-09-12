import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { BaseTemplate } from './templates/base.template';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASSWORD || '',
      },
    });
  }

  async send(
    to: string | string[],
    subject: string,
    body: string,
    isHtml: boolean = false
  ): Promise<void> {
    const recipients = Array.isArray(to) ? to.join(', ') : to;

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@vubon.com.bd',
      to: recipients,
      subject,
      [isHtml ? 'html' : 'text']: body,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Email send error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to send email: ${errorMessage}`);
    }
  }

  async sendTemplate(to: string | string[], template: BaseTemplate, data: unknown): Promise<void> {
    const subject = template.getSubject();
    const body = template.render(data);
    const isHtml = template instanceof HtmlTemplate;

    await this.send(to, subject, body, isHtml);
  }

  async sendBulk(
    recipients: string[],
    subject: string,
    body: string,
    isHtml: boolean = false
  ): Promise<void> {
    const batchSize = 50;
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);
      await this.send(batch, subject, body, isHtml);
    }
  }

  async sendWithAttachments(
    to: string | string[],
    subject: string,
    body: string,
    attachments: { filename: string; content: Buffer; contentType?: string }[]
  ): Promise<void> {
    const recipients = Array.isArray(to) ? to.join(', ') : to;

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@vubon.com.bd',
      to: recipients,
      subject,
      html: body,
      attachments,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Email send error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to send email with attachments: ${errorMessage}`);
    }
  }
}

export abstract class HtmlTemplate extends BaseTemplate {
  render(data: unknown): string {
    return this.renderHtml(data);
  }
  abstract renderHtml(data: unknown): string;
}
