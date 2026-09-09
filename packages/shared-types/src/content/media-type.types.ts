import { TypeObject } from '../common/types.types';
import { MEDIA_TYPE } from '@vubon/shared-constants/src/content/media-type.constants';

export interface MediaType extends TypeObject {
  type: keyof typeof MEDIA_TYPE.TYPES | string;
  category: 'media_type';
  isImage: boolean;
  isVideo: boolean;
  isAudio: boolean;
  isDocument: boolean;
  isOther: boolean;
}

export type MediaTypeKey = keyof typeof MEDIA_TYPE.TYPES;
