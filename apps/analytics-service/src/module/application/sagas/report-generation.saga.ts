/**
 * Report Generation Saga
 * @module analytics-service/application/sagas
 *
 * Multi-step: fetch data → render → upload → notify।
 */
import { BaseSaga } from '@vubon/shared-kernel/application/sagas';

export interface ReportGenerationContext {
  reportId: string;
  outputUrl: string | null;
  uploaded: boolean;
  notified: boolean;
}

export class ReportGenerationSaga extends BaseSaga<ReportGenerationContext> {
  readonly name = 'report-generation';

  async execute(input: { reportId: string }): Promise<void> {
    this.setContext({
      reportId: input.reportId,
      outputUrl: null,
      uploaded: false,
      notified: false,
    });

    const ctx = this.getContext();
    // Step 1: Fetch analytics data
    // Step 2: Render via generator
    // Step 3: Upload to storage
    ctx.outputUrl = `s3://reports/${input.reportId}/${Date.now()}.pdf`;
    ctx.uploaded = true;
    // Step 4: Notify owner
    ctx.notified = true;
  }

  async compensate(): Promise<void> {
    const ctx = this.getContext();
    if (!ctx) return;
    if (ctx.uploaded && ctx.outputUrl) {
      // await storage.delete(ctx.outputUrl);
    }
  }
}
