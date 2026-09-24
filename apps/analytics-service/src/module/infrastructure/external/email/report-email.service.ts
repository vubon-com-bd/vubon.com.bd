import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from '@vubon/shared-kernel/infrastructure';

export interface ReportEmailInput {
  readonly to: readonly string[];
  readonly reportTitle: string;
  readonly reportUrl: string;
}

@Injectable()
export class ReportEmailService {
  private readonly logger = new Logger(ReportEmailService.name);

  constructor(private readonly email: EmailService) {}

  async send(input: ReportEmailInput): Promise<boolean> {
    try {
      const result = await this.email.send({
        to: [...input.to],
        subject: `Report ready: ${input.reportTitle}`,
        html: `<h2>${input.reportTitle}</h2><p><a href="${input.reportUrl}">Download</a></p>`,
        text: `${input.reportTitle}\n${input.reportUrl}`,
      });
      return result.success;
    } catch (error) {
      this.logger.error(`Failed to send report email: ${String(error)}`);
      return false;
    }
  }

  async sendKpiAlert(to: readonly string[], kpiName: string, actual: number): Promise<boolean> {
    try {
      const result = await this.email.send({
        to: [...to],
        subject: `KPI Breach: ${kpiName}`,
        html: `<h2>KPI Breach Alert</h2><p><strong>${kpiName}</strong> is at ${actual}</p>`,
        text: `KPI Breach: ${kpiName} = ${actual}`,
      });
      return result.success;
    } catch {
      return false;
    }
  }
}
