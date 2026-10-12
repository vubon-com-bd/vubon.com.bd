/**
 * Vendor-service queue names & job names
 * @module vendor-service/infrastructure/queues
 */
export const VENDOR_QUEUE = {
  PAYOUT_PROCESSING: 'vendor-payout-processing',
  REPORT_GENERATION: 'vendor-report-generation',
  STATS_AGGREGATION: 'vendor-stats-aggregation',
  SUSPENSION_AUTO_LIFT: 'vendor-suspension-auto-lift',
  DOCUMENT_EXPIRY: 'vendor-document-expiry',
  TIER_EVALUATION: 'vendor-tier-evaluation',
} as const;

export const VENDOR_JOB = {
  PROCESS_PAYOUT: 'process-payout',
  GENERATE_REPORT: 'generate-report',
  AGGREGATE_STATS: 'aggregate-stats',
  AUTO_LIFT_SUSPENSION: 'auto-lift-suspension',
  EXPIRE_DOCUMENTS: 'expire-documents',
  EVALUATE_TIERS: 'evaluate-tiers',
} as const;

export const VENDOR_JOB_OPTIONS = {
  attempts: 3,
  backoff: { type: 'exponential' as const, delay: 5000 },
  removeOnComplete: { count: 1000 },
  removeOnFail: { count: 5000 },
} as const;

export type VendorQueueName = (typeof VENDOR_QUEUE)[keyof typeof VENDOR_QUEUE];
export type VendorJobName = (typeof VENDOR_JOB)[keyof typeof VENDOR_JOB];
