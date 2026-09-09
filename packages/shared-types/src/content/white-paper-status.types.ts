import { StatusObject } from '../common/status.types';
import { WHITE_PAPER_STATUS } from '@vubon/shared-constants/src/content/white-paper-status.constants';

export interface WhitePaperStatus extends StatusObject {
  type: keyof typeof WHITE_PAPER_STATUS | string;
  category: 'white_paper';
  isDraft: boolean;
  isPublished: boolean;
  isArchived: boolean;
}

export type WhitePaperStatusKey = keyof typeof WHITE_PAPER_STATUS;
