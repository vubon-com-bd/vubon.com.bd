export const TIMEZONE = {
  UTC: 'UTC',
  ASIA_DHAKA: 'Asia/Dhaka',
  ASIA_KOLKATA: 'Asia/Kolkata',
  ASIA_DUBAI: 'Asia/Dubai',
  ASIA_TOKYO: 'Asia/Tokyo',
  ASIA_SHANGHAI: 'Asia/Shanghai',
  EUROPE_LONDON: 'Europe/London',
  EUROPE_PARIS: 'Europe/Paris',
  AMERICA_NEW_YORK: 'America/New_York',
  AMERICA_LOS_ANGELES: 'America/Los_Angeles',
  AUSTRALIA_SYDNEY: 'Australia/Sydney',
} as const;

export const DEFAULT_TIMEZONE = TIMEZONE.ASIA_DHAKA;

export type TimezoneType = (typeof TIMEZONE)[keyof typeof TIMEZONE];
