/**
 * AI Cluster Schema
 * @module shared-schemas/ai
 *
 * Values আসে shared-constants/ai/ai-cluster.constants থেকে।
 */

import { z } from 'zod';
import { AI_CLUSTER_ALGORITHM, AI_CLUSTER_STATUS } from '@vubon/shared-constants/ai';

export const AiClusterAlgorithmSchema = z.enum(
  Object.values(AI_CLUSTER_ALGORITHM) as [string, ...string[]]
);

export const AiClusterStatusSchema = z.enum(
  Object.values(AI_CLUSTER_STATUS) as [string, ...string[]]
);

export const AiClusterJobSchema = z.object({
  id: z.string().min(1),
  algorithm: AiClusterAlgorithmSchema,
  status: AiClusterStatusSchema,
  clusterCount: z.number().int().positive().max(100),
  sourceCount: z.number().int().nonnegative(),
  sourceType: z.string().min(1).max(50),
  iterations: z.number().int().nonnegative().optional(),
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime().optional(),
  durationMs: z.number().int().nonnegative().optional(),
  error: z.string().max(1000).optional(),
  createdBy: z.string().optional(),
});

export const AiClusterSchema = z.object({
  id: z.string().min(1),
  jobId: z.string().min(1),
  label: z.string().min(1).max(200),
  centroid: z.array(z.number()).max(10000),
  size: z.number().int().nonnegative(),
  memberIds: z.array(z.string().min(1)).max(1000000),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const AiClusterRequestSchema = z.object({
  algorithm: AiClusterAlgorithmSchema,
  sourceType: z.string().min(1).max(50),
  clusterCount: z.number().int().min(2).max(100).optional(),
  maxIterations: z.number().int().positive().max(1000).optional(),
});

export type AiClusterAlgorithmSchemaType = z.infer<typeof AiClusterAlgorithmSchema>;
export type AiClusterStatusSchemaType = z.infer<typeof AiClusterStatusSchema>;
export type AiClusterJobSchemaType = z.infer<typeof AiClusterJobSchema>;
export type AiClusterSchemaType = z.infer<typeof AiClusterSchema>;
