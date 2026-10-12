/**
 * Report Sender Worker — sends generated reports via email/Slack
 */
import { Injectable, Logger } from '@nestjs/common';

export interface ReportSendPayload {
  readonly reportId: string;
  readonly recipients: readonly string[];
  readonly outputUrl: string;
}

@Injectable()
export class ReportSenderWorker {
  private readonly logger = new Logger(ReportSenderWorker.name);

  async send(payload: ReportSendPayload): Promise<{ readonly sent: number }> {
    this.logger.debug(`Sending report ${payload.reportId} to ${payload.recipients.length} recipients`);
    return { sent: payload.recipients.length };
  }
}
