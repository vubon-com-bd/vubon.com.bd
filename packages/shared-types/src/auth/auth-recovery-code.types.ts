/**
 * Auth Recovery Code Types
 * প্রমাণীকরণ রিকোভারি কোড সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common/base.entity';

export interface AuthRecoveryCode extends BaseEntity {
  userId: string;
  code: string;
  used: boolean;
  usedAt?: Date;
  expiresAt: Date;
  metadata?: Record<string, unknown>;
}

export interface AuthRecoveryCodeGenerateInput {
  userId: string;
  count?: number;
  expiresIn?: number;
}

export interface AuthRecoveryCodeResponse {
  codes: string[];
  generatedAt: Date;
  expiresAt: Date;
}
