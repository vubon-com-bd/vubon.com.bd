/**
 * Courier Configuration
 * কুরিয়ার কনফিগারেশন
 */
export interface CourierConfig {
  enabled: boolean;
  providers: {
    sa_paribahan: boolean;
    redx: boolean;
    pathao: boolean;
    steadfast: boolean;
    sundarban: boolean;
    custom: boolean;
  };
  defaultProvider: 'sa_paribahan' | 'redx' | 'pathao' | 'steadfast' | 'sundarban' | 'custom';
  tracking: {
    enabled: boolean;
    autoUpdate: boolean;
    webhook: string;
  };
  pickup: {
    enabled: boolean;
    schedule: 'daily' | 'ondemand' | 'custom';
    timeWindow: { start: string; end: string };
  };
  delivery: {
    attempts: number;
    maxAttempts: number;
    proofOfDelivery: boolean;
  };
}

export const createCourierConfig = (): CourierConfig => ({
  enabled: true,
  providers: {
    sa_paribahan: true,
    redx: true,
    pathao: true,
    steadfast: true,
    sundarban: true,
    custom: false,
  },
  defaultProvider: 'sa_paribahan',
  tracking: {
    enabled: true,
    autoUpdate: true,
    webhook: process.env.COURIER_WEBHOOK_URL || '',
  },
  pickup: {
    enabled: true,
    schedule: 'daily',
    timeWindow: { start: '10:00', end: '18:00' },
  },
  delivery: {
    attempts: 2,
    maxAttempts: 3,
    proofOfDelivery: true,
  },
});
