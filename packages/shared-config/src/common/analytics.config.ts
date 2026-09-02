/**
 * Analytics Configuration
 * অ্যানালিটিক্স কনফিগারেশন
 */
export interface AnalyticsConfig {
  enabled: boolean;
  providers: {
    google: boolean;
    mixpanel: boolean;
    amplitude: boolean;
    custom: boolean;
  };
  tracking: {
    pageViews: boolean;
    events: boolean;
    userActions: boolean;
    performance: boolean;
  };
  privacy: {
    anonymizeIP: boolean;
    respectDoNotTrack: boolean;
    cookieConsent: boolean;
    dataRetention: number;
  };
  reporting: {
    autoGenerate: boolean;
    frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
    recipients: string[];
  };
}

export const createAnalyticsConfig = (): AnalyticsConfig => ({
  enabled: true,
  providers: {
    google: false,
    mixpanel: false,
    amplitude: false,
    custom: true,
  },
  tracking: {
    pageViews: true,
    events: true,
    userActions: true,
    performance: false,
  },
  privacy: {
    anonymizeIP: true,
    respectDoNotTrack: true,
    cookieConsent: true,
    dataRetention: 90 * 24 * 60 * 60 * 1000, // 90 days
  },
  reporting: {
    autoGenerate: false,
    frequency: 'daily',
    recipients: [],
  },
});
