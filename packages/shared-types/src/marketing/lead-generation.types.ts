/**
 * Lead Generation Types
 * @module shared-types/marketing
 */

import type { BaseEntity } from '../common/base';
import type { Email, Phone } from '../common/primitives';
import type { LeadStatusValue } from './lead-status.types';
import type { LeadQualityValue } from './lead-status.types';
import type { LeadSourceValue } from './lead-source.types';

export interface Lead extends BaseEntity<string> {
  readonly name: string;
  readonly email?: Email;
  readonly phone?: Phone;
  readonly company?: string;
  readonly jobTitle?: string;
  readonly source: LeadSourceValue;
  readonly status: LeadStatusValue;
  readonly quality: LeadQualityValue;
  readonly score: number;
  readonly notes?: string;
  readonly tags?: readonly string[];
  readonly assignedTo?: string;
  readonly campaignId?: string;
  readonly utmSource?: string;
  readonly utmMedium?: string;
  readonly utmCampaign?: string;
  readonly country?: string;
  readonly city?: string;
  readonly convertedAt?: string;
  readonly lostAt?: string;
  readonly lostReason?: string;
}

export interface LeadPublic {
  readonly id: string;
  readonly name: string;
  readonly email?: Email;
  readonly phone?: Phone;
  readonly source: LeadSourceValue;
  readonly status: LeadStatusValue;
  readonly quality: LeadQualityValue;
  readonly score: number;
  readonly createdAt: string;
}

export interface LeadCreateInput {
  readonly name: string;
  readonly email?: string;
  readonly phone?: string;
  readonly company?: string;
  readonly jobTitle?: string;
  readonly source: LeadSourceValue;
  readonly notes?: string;
  readonly tags?: readonly string[];
  readonly utmSource?: string;
  readonly utmMedium?: string;
  readonly utmCampaign?: string;
}

export interface LeadListFilter {
  readonly status?: LeadStatusValue;
  readonly quality?: LeadQualityValue;
  readonly source?: LeadSourceValue;
  readonly assignedTo?: string;
  readonly campaignId?: string;
  readonly minScore?: number;
  readonly search?: string;
}
