/**
 * VendorReportQueue
 * @module vendor-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { VENDOR_QUEUE, VENDOR_JOB, VENDOR_JOB_OPTIONS } from './queue.constants.js';

export interface ReportGenerationJob {
  readonly reportId: string;
  readonly vendorId: string;
  readonly type: string;
  readonly format: string;
  readonly periodStart: string;
  readonly periodEnd: string;
}

@Injectable()
export class VendorReportQueue {
  constructor(
    @InjectQueue(VENDOR_QUEUE.REPORT_GENERATION) private readonly queue: Queue,
  ) {}

  async enqueueGenerate(job: ReportGenerationJob): Promise<void> {
    await this.queue.add(VENDOR_JOB.GENERATE_REPORT, job, VENDOR_JOB_OPTIONS);
  }

  async getJobCount(): Promise<number> {
    return this.queue.count();
  }
}
