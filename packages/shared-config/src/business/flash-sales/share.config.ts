/**
 * Share Config
 * শেয়ার কনফিগারেশন
 */

export interface ShareConfig {
  enabled: boolean;
  maxShares: number;
  shareExpiry: number;
  allowedPlatforms: string[];
  trackClicks: boolean;
  trackConversions: boolean;
  defaults: {
    maxShares: number;
    shareExpiry: number;
  };
}

export const shareConfig: ShareConfig = {
  enabled: true,
  maxShares: 100,
  shareExpiry: 7,
  allowedPlatforms: [
    'facebook',
    'twitter',
    'linkedin',
    'whatsapp',
    'telegram',
    'email',
    'copy_link',
  ],
  trackClicks: true,
  trackConversions: true,
  defaults: {
    maxShares: 100,
    shareExpiry: 7,
  },
} as const;

export type ShareConfigType = typeof shareConfig;
