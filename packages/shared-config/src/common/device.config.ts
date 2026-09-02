/**
 * Device Configuration
 * ডিভাইস কনফিগারেশন
 */
export interface DeviceConfig {
  maxDevicesPerUser: number;
  sessionTimeout: number;
  trustDevices: boolean;
  deviceTracking: {
    enabled: boolean;
    storeIP: boolean;
    storeUserAgent: boolean;
    storeLocation: boolean;
  };
  allowedDeviceTypes: ('mobile' | 'tablet' | 'desktop' | 'tv' | 'other')[];
  blockUnknownDevices: boolean;
}

export const createDeviceConfig = (): DeviceConfig => ({
  maxDevicesPerUser: 5,
  sessionTimeout: 30 * 24 * 60 * 60 * 1000, // 30 days
  trustDevices: true,
  deviceTracking: {
    enabled: true,
    storeIP: true,
    storeUserAgent: true,
    storeLocation: false,
  },
  allowedDeviceTypes: ['mobile', 'tablet', 'desktop'],
  blockUnknownDevices: false,
});
