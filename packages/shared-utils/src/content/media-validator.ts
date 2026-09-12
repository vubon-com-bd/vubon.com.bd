import { MEDIA_STATUS } from '@vubon/shared-constants/src/content/media-status.constants';
import { MEDIA_TYPE } from '@vubon/shared-constants/src/content/media-type.constants';

export interface MediaInput {
  name: string;
  filename: string;
  url: string;
  status: string;
  type: string;
  size: number;
  isActive: boolean;
}

export const validateMedia = (
  media: Partial<MediaInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!media.name) errors.push('Media name is required');
  if (!media.filename) errors.push('Filename is required');
  if (!media.url) errors.push('URL is required');
  if (media.status && !Object.keys(MEDIA_STATUS).includes(media.status)) {
    errors.push('Invalid media status');
  }
  if (media.type && !Object.keys(MEDIA_TYPE.TYPES).includes(media.type)) {
    errors.push('Invalid media type');
  }
  if (media.size !== undefined && media.size < 0) {
    errors.push('Size cannot be negative');
  }
  return { isValid: errors.length === 0, errors };
};

export const isMediaValid = (media: MediaInput): boolean => {
  return media.status === 'uploaded' && media.isActive;
};

export const isMediaImage = (media: MediaInput): boolean => {
  return media.type === 'image';
};
