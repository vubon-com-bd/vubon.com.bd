import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { AI_PERSONALIZATION } from '@vubon/shared-constants/src/ai/ai-personalization.constants';
import { USER_PREFERENCES } from '@vubon/shared-constants/src/user/user-preferences.constants';
import { AI } from './ai.types';

export interface AIPersonalization extends BaseEntity {
  personalizationId: string;
  aiId: string;
  ai: AI;
  userId: string;
  user: User;
  type: keyof typeof AI_PERSONALIZATION.TYPES | string;
  algorithm: keyof typeof AI_PERSONALIZATION.PERSONALIZATION_ALGORITHMS | string;
  factors: (keyof typeof AI_PERSONALIZATION.PERSONALIZATION_FACTORS | string)[];
  preferences: keyof typeof USER_PREFERENCES | string;
  score: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
