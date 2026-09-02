/**
 * Schedule Configuration
 * শিডিউল কনফিগারেশন
 */
export interface ScheduleConfig {
  enabled: boolean;
  tasks: {
    name: string;
    cron: string;
    enabled: boolean;
    timeout: number;
  }[];
  timezone: string;
  concurrency: number;
  lockDuration: number;
  retry: {
    attempts: number;
    delay: number;
  };
  logging: {
    enabled: boolean;
    level: 'debug' | 'info' | 'warn' | 'error';
  };
}

export const createScheduleConfig = (): ScheduleConfig => ({
  enabled: true,
  tasks: [
    { name: 'cleanup-logs', cron: '0 0 * * *', enabled: true, timeout: 3600000 },
    { name: 'generate-sitemap', cron: '0 0 * * 0', enabled: true, timeout: 1800000 },
    { name: 'sync-inventory', cron: '0 */6 * * *', enabled: true, timeout: 600000 },
    { name: 'process-payments', cron: '*/30 * * * *', enabled: true, timeout: 300000 },
    { name: 'send-newsletter', cron: '0 8 * * 1', enabled: true, timeout: 3600000 },
  ],
  timezone: 'Asia/Dhaka',
  concurrency: 5,
  lockDuration: 60000,
  retry: {
    attempts: 3,
    delay: 5000,
  },
  logging: {
    enabled: true,
    level: 'info',
  },
});
