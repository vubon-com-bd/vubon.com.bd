import { FLASH_SALE_SHARE } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-share.constants';

export interface ShareInput {
  userId: string;
  url: string;
  type: string;
  platform: string;
}

export const validateShare = (
  share: Partial<ShareInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!share.userId) errors.push('User ID is required');
  if (!share.url) errors.push('URL is required');
  if (share.type && !Object.keys(FLASH_SALE_SHARE.TYPES).includes(share.type)) {
    errors.push('Invalid share type');
  }
  if (share.platform && !Object.keys(FLASH_SALE_SHARE.SOCIAL_MEDIA).includes(share.platform)) {
    errors.push('Invalid social media platform');
  }
  return { isValid: errors.length === 0, errors };
};
