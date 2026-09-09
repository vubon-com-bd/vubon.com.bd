import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { CASE_STUDY_STATUS } from '@vubon/shared-constants/src/content/case-study-status.constants';
import { CASE_STUDY } from '@vubon/shared-constants/src/content/case-study.constants';

export interface CaseStudyMetrics {
  revenueIncrease?: number;
  costReduction?: number;
  efficiencyGain?: number;
  customerSatisfaction?: number;
  otherMetrics?: Record<string, number>;
}

export interface CaseStudyMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  industry?: string;
  region?: string;
}

export interface CaseStudy extends BaseEntity {
  caseStudyId: string;
  title: string;
  slug: string;
  content: string;
  status: keyof typeof CASE_STUDY_STATUS | string;
  type: keyof typeof CASE_STUDY.CASE_STUDY_TYPES | string;
  authorId: string;
  author: User;
  featuredImage?: string;
  clientName?: string;
  clientLogo?: string;
  results: string[];
  metrics: CaseStudyMetrics;
  viewCount: number;
  likeCount: number;
  shareCount: number;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt?: Date;
  metadata: CaseStudyMetadata;
}
