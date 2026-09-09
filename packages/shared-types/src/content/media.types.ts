import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { MEDIA_STATUS } from '@vubon/shared-constants/src/content/media-status.constants';
import { MediaType } from './media-type.types';
import { MediaFormat } from './media-format.types';

export interface MediaMetadata {
  exif?: Record<string, unknown>;
  iptc?: Record<string, unknown>;
  xmp?: Record<string, unknown>;
  hash?: string;
  dominantColor?: string;
  compression?: string;
}

export interface Media extends BaseEntity {
  mediaId: string;
  name: string;
  filename: string;
  url: string;
  type: MediaType;
  format: MediaFormat;
  size: number;
  width?: number;
  height?: number;
  duration?: number;
  status: keyof typeof MEDIA_STATUS | string;
  uploadedBy: string;
  uploadedByUser: User;
  altText?: string;
  caption?: string;
  description?: string;
  tags: string[];
  isPublic: boolean;
  isFeatured: boolean;
  uploadedAt: Date;
  metadata: MediaMetadata;
}
