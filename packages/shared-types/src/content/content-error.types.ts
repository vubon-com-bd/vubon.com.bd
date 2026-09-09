import { BaseEntity } from '../common/base.types';
import { CONTENT_ERROR } from '@vubon/shared-constants/src/content/content-error.constants';

export interface ContentError extends BaseEntity {
  errorId: string;
  code: keyof typeof CONTENT_ERROR.TYPES | string;
  message: string;
  details?: Record<string, unknown>;
  stack?: string;
  timestamp: Date;
  resolvedAt?: Date;
  resolvedBy?: string;
  resolution?: string;
  metadata: Record<string, unknown>;
}

export type ContentErrorCode = keyof typeof CONTENT_ERROR.TYPES;
