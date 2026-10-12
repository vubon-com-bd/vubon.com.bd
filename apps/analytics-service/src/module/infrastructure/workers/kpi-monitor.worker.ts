/**
 * KPI Monitor Worker — periodic evaluation of all active KPIs
 */
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class KpiMonitorWorker {
  private readonly logger = new Logger(KpiMonitorWorker.name);

  async runMonitorCycle(): Promise<{ readonly evaluated: number }> {
    this.logger.debug('Running KPI monitor cycle');
    // Schedule: for each active KPI, evaluate against recent metric value
    return { evaluated: 0 };
  }
}
