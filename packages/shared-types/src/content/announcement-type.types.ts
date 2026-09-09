import { TypeObject } from '../common/types.types';
import { ANNOUNCEMENT_TYPE } from '@vubon/shared-constants/src/content/announcement-type.constants';

export interface AnnouncementType extends TypeObject {
  type: keyof typeof ANNOUNCEMENT_TYPE.TYPES | string;
  category: 'announcement';
  isGeneral: boolean;
  isPromotional: boolean;
  isMaintenance: boolean;
  isSecurity: boolean;
  isFeature: boolean;
  isUpdate: boolean;
  isEvent: boolean;
  isUrgent: boolean;
}

export type AnnouncementTypeKey = keyof typeof ANNOUNCEMENT_TYPE.TYPES;
