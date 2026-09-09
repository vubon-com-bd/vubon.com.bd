export const deviceConfig = {
  maxDevicesPerUser: 10,
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  trustDuration: 7 * 24 * 60 * 60 * 1000, // 7 days
  fingerprint: {
    enabled: true,
    salt: 'device-fingerprint-salt',
  },
  deviceTypes: ['mobile', 'tablet', 'desktop', 'other'],
};
