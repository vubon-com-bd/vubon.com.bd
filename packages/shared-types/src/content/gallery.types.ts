import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { GALLERY_STATUS } from '@vubon/shared-constants/src/content/gallery-status.constants';
import { GALLERY } from '@vubon/shared-constants/src/content/gallery.constants';
import { Media } from './media.types';

export interface Gallery extends BaseEntity {
  galleryId: string;
  name: string;
  slug: string;
  description?: string;
  status: keyof typeof GALLERY_STATUS | string;
  type: keyof typeof GALLERY.GALLERY_TYPES | string;
  media: Media[];
  mediaCount: number;
  createdBy: string;
  createdByUser: User;
  coverImage?: string;
  isActive: boolean;
  isPublic: boolean;
  order: number;
  metadata: Record<string, unknown>;
}
