/**
 * Timezone Constants
 * @module shared-constants/common/timezone.constants
 */

export const TIMEZONE = {
  // Major timezones
  UTC: 'UTC',
  GMT: 'GMT',
  EST: 'America/New_York',
  CST: 'America/Chicago',
  MST: 'America/Denver',
  PST: 'America/Los_Angeles',
  HST: 'Pacific/Honolulu',

  // Europe
  LONDON: 'Europe/London',
  PARIS: 'Europe/Paris',
  BERLIN: 'Europe/Berlin',
  ROME: 'Europe/Rome',
  MADRID: 'Europe/Madrid',
  MOSCOW: 'Europe/Moscow',
  ISTANBUL: 'Europe/Istanbul',

  // Asia
  DHAKA: 'Asia/Dhaka',
  KOLKATA: 'Asia/Kolkata',
  KARACHI: 'Asia/Karachi',
  DUBAI: 'Asia/Dubai',
  RIYADH: 'Asia/Riyadh',
  SINGAPORE: 'Asia/Singapore',
  KUALA_LUMPUR: 'Asia/Kuala_Lumpur',
  BANGKOK: 'Asia/Bangkok',
  JAKARTA: 'Asia/Jakarta',
  TOKYO: 'Asia/Tokyo',
  SEOUL: 'Asia/Seoul',
  BEIJING: 'Asia/Shanghai',
  HONG_KONG: 'Asia/Hong_Kong',
  TAIPEI: 'Asia/Taipei',

  // Middle East
  TEHRAN: 'Asia/Tehran',
  BAGHDAD: 'Asia/Baghdad',
  JERUSALEM: 'Asia/Jerusalem',

  // Oceania
  SYDNEY: 'Australia/Sydney',
  MELBOURNE: 'Australia/Melbourne',
  AUCKLAND: 'Pacific/Auckland',

  // Africa
  CAIRO: 'Africa/Cairo',
  CAPE_TOWN: 'Africa/Johannesburg',
  LAGOS: 'Africa/Lagos',
  NAIROBI: 'Africa/Nairobi',

  // South America
  SAO_PAULO: 'America/Sao_Paulo',
  BUENOS_AIRES: 'America/Argentina/Buenos_Aires',

  // Pacific
  FIJI: 'Pacific/Fiji',
  SAMOA: 'Pacific/Samoa',

  // Default
  DEFAULT: 'Asia/Dhaka',
} as const;

export type Timezone = (typeof TIMEZONE)[keyof typeof TIMEZONE];

export const TIMEZONE_INFO: Record<
  Timezone,
  {
    name: string;
    offset: string;
    offsetHours: number;
    country: string;
    cities: string[];
  }
> = {
  [TIMEZONE.UTC]: {
    name: 'Coordinated Universal Time',
    offset: '+00:00',
    offsetHours: 0,
    country: 'International',
    cities: ['UTC'],
  },
  [TIMEZONE.GMT]: {
    name: 'Greenwich Mean Time',
    offset: '+00:00',
    offsetHours: 0,
    country: 'United Kingdom',
    cities: ['London'],
  },
  [TIMEZONE.EST]: {
    name: 'Eastern Standard Time',
    offset: '-05:00',
    offsetHours: -5,
    country: 'United States',
    cities: ['New York', 'Washington', 'Boston'],
  },
  [TIMEZONE.CST]: {
    name: 'Central Standard Time',
    offset: '-06:00',
    offsetHours: -6,
    country: 'United States',
    cities: ['Chicago', 'Dallas', 'Houston'],
  },
  [TIMEZONE.MST]: {
    name: 'Mountain Standard Time',
    offset: '-07:00',
    offsetHours: -7,
    country: 'United States',
    cities: ['Denver', 'Phoenix', 'Salt Lake City'],
  },
  [TIMEZONE.PST]: {
    name: 'Pacific Standard Time',
    offset: '-08:00',
    offsetHours: -8,
    country: 'United States',
    cities: ['Los Angeles', 'San Francisco', 'Seattle'],
  },
  [TIMEZONE.HST]: {
    name: 'Hawaii-Aleutian Standard Time',
    offset: '-10:00',
    offsetHours: -10,
    country: 'United States',
    cities: ['Honolulu'],
  },
  [TIMEZONE.LONDON]: {
    name: 'London',
    offset: '+00:00',
    offsetHours: 0,
    country: 'United Kingdom',
    cities: ['London'],
  },
  [TIMEZONE.PARIS]: {
    name: 'Paris',
    offset: '+01:00',
    offsetHours: 1,
    country: 'France',
    cities: ['Paris'],
  },
  [TIMEZONE.BERLIN]: {
    name: 'Berlin',
    offset: '+01:00',
    offsetHours: 1,
    country: 'Germany',
    cities: ['Berlin', 'Munich', 'Frankfurt'],
  },
  [TIMEZONE.ROME]: {
    name: 'Rome',
    offset: '+01:00',
    offsetHours: 1,
    country: 'Italy',
    cities: ['Rome', 'Milan', 'Naples'],
  },
  [TIMEZONE.MADRID]: {
    name: 'Madrid',
    offset: '+01:00',
    offsetHours: 1,
    country: 'Spain',
    cities: ['Madrid', 'Barcelona'],
  },
  [TIMEZONE.MOSCOW]: {
    name: 'Moscow',
    offset: '+03:00',
    offsetHours: 3,
    country: 'Russia',
    cities: ['Moscow', 'Saint Petersburg'],
  },
  [TIMEZONE.ISTANBUL]: {
    name: 'Istanbul',
    offset: '+03:00',
    offsetHours: 3,
    country: 'Turkey',
    cities: ['Istanbul', 'Ankara'],
  },
  [TIMEZONE.DHAKA]: {
    name: 'Dhaka',
    offset: '+06:00',
    offsetHours: 6,
    country: 'Bangladesh',
    cities: ['Dhaka', 'Chittagong', 'Khulna'],
  },
  [TIMEZONE.KOLKATA]: {
    name: 'Kolkata',
    offset: '+05:30',
    offsetHours: 5.5,
    country: 'India',
    cities: ['Kolkata', 'Delhi', 'Mumbai', 'Bangalore'],
  },
  [TIMEZONE.KARACHI]: {
    name: 'Karachi',
    offset: '+05:00',
    offsetHours: 5,
    country: 'Pakistan',
    cities: ['Karachi', 'Lahore', 'Islamabad'],
  },
  [TIMEZONE.DUBAI]: {
    name: 'Dubai',
    offset: '+04:00',
    offsetHours: 4,
    country: 'UAE',
    cities: ['Dubai', 'Abu Dhabi'],
  },
  [TIMEZONE.RIYADH]: {
    name: 'Riyadh',
    offset: '+03:00',
    offsetHours: 3,
    country: 'Saudi Arabia',
    cities: ['Riyadh', 'Jeddah', 'Mecca'],
  },
  [TIMEZONE.SINGAPORE]: {
    name: 'Singapore',
    offset: '+08:00',
    offsetHours: 8,
    country: 'Singapore',
    cities: ['Singapore'],
  },
  [TIMEZONE.KUALA_LUMPUR]: {
    name: 'Kuala Lumpur',
    offset: '+08:00',
    offsetHours: 8,
    country: 'Malaysia',
    cities: ['Kuala Lumpur'],
  },
  [TIMEZONE.BANGKOK]: {
    name: 'Bangkok',
    offset: '+07:00',
    offsetHours: 7,
    country: 'Thailand',
    cities: ['Bangkok'],
  },
  [TIMEZONE.JAKARTA]: {
    name: 'Jakarta',
    offset: '+07:00',
    offsetHours: 7,
    country: 'Indonesia',
    cities: ['Jakarta'],
  },
  [TIMEZONE.TOKYO]: {
    name: 'Tokyo',
    offset: '+09:00',
    offsetHours: 9,
    country: 'Japan',
    cities: ['Tokyo', 'Osaka', 'Kyoto'],
  },
  [TIMEZONE.SEOUL]: {
    name: 'Seoul',
    offset: '+09:00',
    offsetHours: 9,
    country: 'South Korea',
    cities: ['Seoul', 'Busan'],
  },
  [TIMEZONE.BEIJING]: {
    name: 'Beijing',
    offset: '+08:00',
    offsetHours: 8,
    country: 'China',
    cities: ['Beijing', 'Shanghai'],
  },
  [TIMEZONE.HONG_KONG]: {
    name: 'Hong Kong',
    offset: '+08:00',
    offsetHours: 8,
    country: 'Hong Kong',
    cities: ['Hong Kong'],
  },
  [TIMEZONE.TAIPEI]: {
    name: 'Taipei',
    offset: '+08:00',
    offsetHours: 8,
    country: 'Taiwan',
    cities: ['Taipei'],
  },
  [TIMEZONE.TEHRAN]: {
    name: 'Tehran',
    offset: '+03:30',
    offsetHours: 3.5,
    country: 'Iran',
    cities: ['Tehran'],
  },
  [TIMEZONE.BAGHDAD]: {
    name: 'Baghdad',
    offset: '+03:00',
    offsetHours: 3,
    country: 'Iraq',
    cities: ['Baghdad'],
  },
  [TIMEZONE.JERUSALEM]: {
    name: 'Jerusalem',
    offset: '+02:00',
    offsetHours: 2,
    country: 'Israel',
    cities: ['Jerusalem', 'Tel Aviv'],
  },
  [TIMEZONE.SYDNEY]: {
    name: 'Sydney',
    offset: '+10:00',
    offsetHours: 10,
    country: 'Australia',
    cities: ['Sydney', 'Melbourne'],
  },
  [TIMEZONE.MELBOURNE]: {
    name: 'Melbourne',
    offset: '+10:00',
    offsetHours: 10,
    country: 'Australia',
    cities: ['Melbourne'],
  },
  [TIMEZONE.AUCKLAND]: {
    name: 'Auckland',
    offset: '+12:00',
    offsetHours: 12,
    country: 'New Zealand',
    cities: ['Auckland', 'Wellington'],
  },
  [TIMEZONE.CAIRO]: {
    name: 'Cairo',
    offset: '+02:00',
    offsetHours: 2,
    country: 'Egypt',
    cities: ['Cairo'],
  },
  [TIMEZONE.CAPE_TOWN]: {
    name: 'Cape Town',
    offset: '+02:00',
    offsetHours: 2,
    country: 'South Africa',
    cities: ['Cape Town', 'Johannesburg'],
  },
  [TIMEZONE.LAGOS]: {
    name: 'Lagos',
    offset: '+01:00',
    offsetHours: 1,
    country: 'Nigeria',
    cities: ['Lagos'],
  },
  [TIMEZONE.NAIROBI]: {
    name: 'Nairobi',
    offset: '+03:00',
    offsetHours: 3,
    country: 'Kenya',
    cities: ['Nairobi'],
  },
  [TIMEZONE.SAO_PAULO]: {
    name: 'São Paulo',
    offset: '-03:00',
    offsetHours: -3,
    country: 'Brazil',
    cities: ['São Paulo', 'Rio de Janeiro'],
  },
  [TIMEZONE.BUENOS_AIRES]: {
    name: 'Buenos Aires',
    offset: '-03:00',
    offsetHours: -3,
    country: 'Argentina',
    cities: ['Buenos Aires'],
  },
  [TIMEZONE.FIJI]: {
    name: 'Fiji',
    offset: '+12:00',
    offsetHours: 12,
    country: 'Fiji',
    cities: ['Suva'],
  },
  [TIMEZONE.SAMOA]: {
    name: 'Samoa',
    offset: '+13:00',
    offsetHours: 13,
    country: 'Samoa',
    cities: ['Apia'],
  },
};

export const DEFAULT_TIMEZONE: Timezone = TIMEZONE.DHAKA;

export const SUPPORTED_TIMEZONES = Object.values(TIMEZONE);

export const TIMEZONE_OFFSETS: Record<Timezone, number> = {
  [TIMEZONE.UTC]: 0,
  [TIMEZONE.GMT]: 0,
  [TIMEZONE.EST]: -5,
  [TIMEZONE.CST]: -6,
  [TIMEZONE.MST]: -7,
  [TIMEZONE.PST]: -8,
  [TIMEZONE.HST]: -10,
  [TIMEZONE.LONDON]: 0,
  [TIMEZONE.PARIS]: 1,
  [TIMEZONE.BERLIN]: 1,
  [TIMEZONE.ROME]: 1,
  [TIMEZONE.MADRID]: 1,
  [TIMEZONE.MOSCOW]: 3,
  [TIMEZONE.ISTANBUL]: 3,
  [TIMEZONE.DHAKA]: 6,
  [TIMEZONE.KOLKATA]: 5.5,
  [TIMEZONE.KARACHI]: 5,
  [TIMEZONE.DUBAI]: 4,
  [TIMEZONE.RIYADH]: 3,
  [TIMEZONE.SINGAPORE]: 8,
  [TIMEZONE.KUALA_LUMPUR]: 8,
  [TIMEZONE.BANGKOK]: 7,
  [TIMEZONE.JAKARTA]: 7,
  [TIMEZONE.TOKYO]: 9,
  [TIMEZONE.SEOUL]: 9,
  [TIMEZONE.BEIJING]: 8,
  [TIMEZONE.HONG_KONG]: 8,
  [TIMEZONE.TAIPEI]: 8,
  [TIMEZONE.TEHRAN]: 3.5,
  [TIMEZONE.BAGHDAD]: 3,
  [TIMEZONE.JERUSALEM]: 2,
  [TIMEZONE.SYDNEY]: 10,
  [TIMEZONE.MELBOURNE]: 10,
  [TIMEZONE.AUCKLAND]: 12,
  [TIMEZONE.CAIRO]: 2,
  [TIMEZONE.CAPE_TOWN]: 2,
  [TIMEZONE.LAGOS]: 1,
  [TIMEZONE.NAIROBI]: 3,
  [TIMEZONE.SAO_PAULO]: -3,
  [TIMEZONE.BUENOS_AIRES]: -3,
  [TIMEZONE.FIJI]: 12,
  [TIMEZONE.SAMOA]: 13,
};
