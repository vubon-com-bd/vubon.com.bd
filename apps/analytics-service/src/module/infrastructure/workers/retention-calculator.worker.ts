/**
 * Retention Calculator Worker
 */
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RetentionCalculatorWorker {
  private readonly logger = new Logger(RetentionCalculatorWorker.name);

  async runCohortRetention(cohortId: string): Promise<{ readonly calculated: boolean }> {
    this.logger.debug(`Calculating retention for cohort ${cohortId}`);
    return { calculated: true };
  }
}
