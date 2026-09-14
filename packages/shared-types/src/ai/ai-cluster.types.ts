/**
 * AI Cluster Types
 * @module shared-types/ai
 *
 * Values আসে shared-constants/ai/ai-cluster.constants থেকে।
 */

import type { AI_CLUSTER_ALGORITHM, AI_CLUSTER_STATUS } from '@vubon/shared-constants/ai';

export type AiClusterAlgorithmValue =
  (typeof AI_CLUSTER_ALGORITHM)[keyof typeof AI_CLUSTER_ALGORITHM];

export type AiClusterStatusValue = (typeof AI_CLUSTER_STATUS)[keyof typeof AI_CLUSTER_STATUS];

export interface AiClusterJob {
  readonly id: string;
  readonly algorithm: AiClusterAlgorithmValue;
  readonly status: AiClusterStatusValue;
  readonly clusterCount: number;
  readonly sourceCount: number;
  readonly sourceType: string;
  readonly iterations?: number;
  readonly startedAt: string;
  readonly completedAt?: string;
  readonly durationMs?: number;
  readonly error?: string;
  readonly createdBy?: string;
}

export interface AiCluster {
  readonly id: string;
  readonly jobId: string;
  readonly label: string;
  readonly centroid: readonly number[];
  readonly size: number;
  readonly memberIds: readonly string[];
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface AiClusterRequest {
  readonly algorithm: AiClusterAlgorithmValue;
  readonly sourceType: string;
  readonly clusterCount?: number;
  readonly maxIterations?: number;
}
