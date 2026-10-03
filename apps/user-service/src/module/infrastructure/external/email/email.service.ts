/**
 * User Email Service
 * @module user-service/infrastructure/external/email
 *
 * Wraps kernel EmailService with user-service template helpers.
 * Uses `html` for rendered template text — kernel message input supports it.
 */
import { Injectable } from '@nestjs/common';
import { EmailService as KernelEmailService } from '@vubon/shared-kernel/infrastructure';
import {
  WelcomeEmailTemplate,
  type WelcomeEmailVariables,
  ProfileCompleteEmailTemplate,
  type ProfileCompleteEmailVariables,
  KycSubmittedEmailTemplate,
  type KycSubmittedEmailVariables,
  KycVerifiedEmailTemplate,
  type KycVerifiedEmailVariables,
  KycRejectedEmailTemplate,
  type KycRejectedEmailVariables,
} from './templates/index.js';

interface SendTemplateArgs {
  readonly to: string;
  readonly subject: string;
  readonly template: string;
  readonly variables: Readonly<Record<string, string>>;
}

@Injectable()
export class UserEmailService {
  constructor(private readonly kernel: KernelEmailService) {}

  /**
   * Renders a simple text body from template variables and sends via kernel.
   * (Real HTML templating lives in the provider adapter, not here.)
   */
  private renderTemplate(template: string, variables: Record<string, string>): string {
    const lines = [`[${template}]`];
    for (const [key, value] of Object.entries(variables)) {
      lines.push(`${key}: ${value}`);
    }
    return lines.join('\n');
  }

  private async sendTemplate(args: SendTemplateArgs): Promise<void> {
    const text = this.renderTemplate(args.template, args.variables);
    await this.kernel.send({
      to: args.to,
      subject: args.subject,
      text,
    });
  }

  async sendWelcome(to: string, vars: WelcomeEmailVariables): Promise<void> {
    await this.sendTemplate({
      to,
      subject: WelcomeEmailTemplate.subjectFallback,
      template: WelcomeEmailTemplate.name,
      variables: WelcomeEmailTemplate.buildVariables(vars),
    });
  }

  async sendProfileComplete(
    to: string,
    vars: ProfileCompleteEmailVariables
  ): Promise<void> {
    await this.sendTemplate({
      to,
      subject: ProfileCompleteEmailTemplate.subjectFallback,
      template: ProfileCompleteEmailTemplate.name,
      variables: ProfileCompleteEmailTemplate.buildVariables(vars),
    });
  }

  async sendKycSubmitted(to: string, vars: KycSubmittedEmailVariables): Promise<void> {
    await this.sendTemplate({
      to,
      subject: KycSubmittedEmailTemplate.subjectFallback,
      template: KycSubmittedEmailTemplate.name,
      variables: KycSubmittedEmailTemplate.buildVariables(vars),
    });
  }

  async sendKycVerified(to: string, vars: KycVerifiedEmailVariables): Promise<void> {
    await this.sendTemplate({
      to,
      subject: KycVerifiedEmailTemplate.subjectFallback,
      template: KycVerifiedEmailTemplate.name,
      variables: KycVerifiedEmailTemplate.buildVariables(vars),
    });
  }

  async sendKycRejected(to: string, vars: KycRejectedEmailVariables): Promise<void> {
    await this.sendTemplate({
      to,
      subject: KycRejectedEmailTemplate.subjectFallback,
      template: KycRejectedEmailTemplate.name,
      variables: KycRejectedEmailTemplate.buildVariables(vars),
    });
  }
}
