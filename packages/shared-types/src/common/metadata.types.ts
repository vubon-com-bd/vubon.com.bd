import { METADATA } from '@vubon/shared-constants/src/common/metadata.constants';

/**
 * Metadata interface
 */
export interface Metadata {
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  version: number;
  tags?: string[];
  notes?: string;
  custom?: Record<string, unknown>;
}

/**
 * Metadata key type — derived from METADATA constant
 */
export type MetadataKey = (typeof METADATA)[keyof typeof METADATA];
