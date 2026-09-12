import { TypeObject } from '../common/types.types';
import { PAGE_LAYOUT } from '@vubon/shared-constants/src/content/page-layout.constants';

export interface PageLayout extends TypeObject {
  type: keyof typeof PAGE_LAYOUT.TYPES | string;
  category: 'page_layout';
  columns: number;
  isGrid: boolean;
  isMasonry: boolean;
  width: keyof typeof PAGE_LAYOUT.LAYOUT_WIDTHS | string;
}

export type PageLayoutKey = keyof typeof PAGE_LAYOUT.TYPES;
