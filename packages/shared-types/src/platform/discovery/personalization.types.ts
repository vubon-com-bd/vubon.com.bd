import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { PERSONALIZATION } from '@vubon/shared-constants/src/platform/discovery/personalization.constants';
import { USER_PREFERENCES } from '@vubon/shared-constants/src/user/user-preferences.constants';

export interface Personalization extends BaseEntity {
  personalizationId: string;
  userId: string;
  user: User;
  type: keyof typeof PERSONALIZATION.TYPES | string;
  factors: (keyof typeof PERSONALIZATION.PERSONALIZATION_FACTORS | string)[];
  preferences: keyof typeof USER_PREFERENCES | string;
  score: number;
  status: keyof typeof PERSONALIZATION.STATUS | string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
