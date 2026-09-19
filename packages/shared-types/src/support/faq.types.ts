/**
 * FAQ Types
 * @module shared-types/support
 */

import type { FAQ_STATUS, FAQ_CATEGORY } from '@vubon/shared-constants/support';
import type { BaseEntity } from '../common/base';

export type FaqStatusValue = (typeof FAQ_STATUS)[keyof typeof FAQ_STATUS];

export type FaqCategoryValue = (typeof FAQ_CATEGORY)[keyof typeof FAQ_CATEGORY];

export interface Faq extends BaseEntity<string> {
  readonly question: string;
  readonly answer: string;
  readonly category: FaqCategoryValue;
  readonly status: FaqStatusValue;
  readonly tags?: readonly string[];
  readonly helpfulCount: number;
  readonly notHelpfulCount: number;
  readonly viewCount: number;
  readonly sortOrder: number;
  readonly isFeatured: boolean;
  readonly language?: string;
  readonly createdBy: string;
  readonly updatedBy?: string;
}

export interface FaqPublic {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly category: FaqCategoryValue;
  readonly helpfulCount: number;
  readonly viewCount: number;
}

export interface FaqListFilter {
  readonly status?: FaqStatusValue;
  readonly category?: FaqCategoryValue;
  readonly tags?: readonly string[];
  readonly isFeatured?: boolean;
  readonly search?: string;
}
