/**
 * PerformanceTrackerWorker — periodic vendor performance evaluation
 * @module vendor-service/infrastructure/workers
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

/**
 * ⚠️ Simplified: this is a periodic scheduler placeholder. Real
 * implementation would enqueue TRACK_PERFORMANCE jobs on a cron and
 * call PerformanceCalculatorService for each vendor.
 */
@Injectable()
export class PerformanceTrackerWorker implements OnModuleInit {
  private readonly logger = new Logger(PerformanceTrackerWorker.name);

  onModuleInit(): void {
    // Register cron job here if scheduler available
    this.logger.log('PerformanceTrackerWorker registered');
  }

  async trackAll(): Promise<{ evaluated: number }> {
    this.logger.debug('Tracking performance for all active vendors');
    // Placeholder — would iterate vendors and call performance service
    return { evaluated: 0 };
  }
}
