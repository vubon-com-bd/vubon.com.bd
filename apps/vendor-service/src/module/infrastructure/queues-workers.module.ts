/**
 * QueuesWorkersModule — registers all vendor queues + workers
 * @module vendor-service/infrastructure
 *
 * NOTE: BullMQ requires a live Redis connection.
 * When QUEUE_ENABLED=false (e.g., local Termux dev), we register the module
 * but skip BullModule + Worker classes to avoid a hard boot failure.
 */
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { VENDOR_QUEUE } from './queues/queue.constants.js';

import { VendorPayoutQueue } from './queues/vendor-payout.queue.js';
import { VendorReportQueue } from './queues/vendor-report.queue.js';
import { VendorStatsQueue } from './queues/vendor-stats.queue.js';
import { VendorSuspensionQueue } from './queues/vendor-suspension.queue.js';
import { VendorVerificationQueue } from './queues/vendor-verification.queue.js';
import { VendorTierQueue } from './queues/vendor-tier.queue.js';

import { PayoutProcessingWorker } from './workers/payout-processing.worker.js';
import { ReportGenerationWorker } from './workers/report-generation.worker.js';
import { StatsAggregationWorker } from './workers/stats-aggregation.worker.js';
import { SuspensionAutoLiftWorker } from './workers/suspension-auto-lift.worker.js';
import { DocumentExpiryWorker } from './workers/document-expiry.worker.js';
import { TierEvaluationWorker } from './workers/tier-evaluation.worker.js';

const QUEUES = [
  VendorPayoutQueue,
  VendorReportQueue,
  VendorStatsQueue,
  VendorSuspensionQueue,
  VendorVerificationQueue,
  VendorTierQueue,
];

const WORKERS = [
  PayoutProcessingWorker,
  ReportGenerationWorker,
  StatsAggregationWorker,
  SuspensionAutoLiftWorker,
  DocumentExpiryWorker,
  TierEvaluationWorker,
];

const QUEUE_ENABLED = process.env.QUEUE_ENABLED !== 'false';

const imports = QUEUE_ENABLED
  ? [
      BullModule.registerQueue(
        { name: VENDOR_QUEUE.PAYOUT_PROCESSING },
        { name: VENDOR_QUEUE.REPORT_GENERATION },
        { name: VENDOR_QUEUE.STATS_AGGREGATION },
        { name: VENDOR_QUEUE.SUSPENSION_AUTO_LIFT },
        { name: VENDOR_QUEUE.DOCUMENT_EXPIRY },
        { name: VENDOR_QUEUE.TIER_EVALUATION },
      ),
    ]
  : [];

const providers = QUEUE_ENABLED ? [...QUEUES, ...WORKERS] : [];
const exports_ = QUEUE_ENABLED ? [...QUEUES] : [];

@Module({
  imports,
  providers,
  exports: exports_,
})
export class QueuesWorkersModule {}
