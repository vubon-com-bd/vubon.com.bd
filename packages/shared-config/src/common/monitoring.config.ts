export const monitoringConfig = {
  enabled: true,
  metrics: {
    enabled: true,
    port: 9090,
    path: '/metrics',
  },
  health: {
    enabled: true,
    path: '/health',
    details: true,
  },
  alerts: {
    enabled: true,
    channels: ['email', 'slack'],
    thresholds: {
      cpu: 80,
      memory: 80,
      responseTime: 5000,
      errorRate: 5,
    },
  },
} as const;
