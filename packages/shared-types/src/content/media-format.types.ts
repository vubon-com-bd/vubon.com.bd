import { TypeObject } from '../common/types.types';
import { MEDIA_FORMAT } from '@vubon/shared-constants/src/content/media-format.constants';

export interface MediaFormat extends TypeObject {
  type: keyof typeof MEDIA_FORMAT.TYPES | string;
  category: 'media_format';
  extension: string;
  mimeType: string;
}

export type MediaFormatKey = keyof typeof MEDIA_FORMAT.TYPES;
