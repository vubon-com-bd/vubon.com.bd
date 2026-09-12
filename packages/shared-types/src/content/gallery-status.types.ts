import { StatusObject } from '../common/status.types';
import { GALLERY_STATUS } from '@vubon/shared-constants/src/content/gallery-status.constants';

export interface GalleryStatus extends StatusObject {
  type: keyof typeof GALLERY_STATUS | string;
  category: 'gallery';
  isActive: boolean;
  isInactive: boolean;
  isArchived: boolean;
}

export type GalleryStatusKey = keyof typeof GALLERY_STATUS;
