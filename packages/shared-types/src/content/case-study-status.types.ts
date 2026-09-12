import { StatusObject } from '../common/status.types';
import { CASE_STUDY_STATUS } from '@vubon/shared-constants/src/content/case-study-status.constants';

export interface CaseStudyStatus extends StatusObject {
  type: keyof typeof CASE_STUDY_STATUS | string;
  category: 'case_study';
  isDraft: boolean;
  isPublished: boolean;
  isArchived: boolean;
}

export type CaseStudyStatusKey = keyof typeof CASE_STUDY_STATUS;
