/**
 * সাপোর্ট শিডিউলের বিভিন্ন টাইপ সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * শিডিউল টাইপ
 */
export const SCHEDULE_TYPE = {
  MORNING_SHIFT: 'morning_shift',
  EVENING_SHIFT: 'evening_shift',
  NIGHT_SHIFT: 'night_shift',
  WEEKEND_SHIFT: 'weekend_shift',
  ON_CALL: 'on_call',
  TRAINING_SESSION: 'training_session',
  MEETING: 'meeting',
  BREAK: 'break',
  HOLIDAY: 'holiday',
  SICK_LEAVE: 'sick_leave',
  VACATION: 'vacation',
  REMOTE_WORK: 'remote_work',
  OVERTIME: 'overtime',
  COMPENSATORY_OFF: 'compensatory_off',
  TEAM_MEETING: 'team_meeting',
  ONE_ON_ONE: 'one_on_one',
  WORKSHOP: 'workshop',
  SEMINAR: 'seminar',
  SHADOWING: 'shadowing',
  MENTORING: 'mentoring',
  COACHING: 'coaching',
  ASSESSMENT: 'assessment',
  CERTIFICATION: 'certification',
  FLEXIBLE: 'flexible',
  COMPRESSED: 'compressed',
  SPLIT_SHIFT: 'split_shift',
} as const;

/**
 * শিডিউল টাইপের ডিসপ্লে নাম
 */
export const SCHEDULE_TYPE_DISPLAY_NAMES = {
  [SCHEDULE_TYPE.MORNING_SHIFT]: 'সকাল শিফট',
  [SCHEDULE_TYPE.EVENING_SHIFT]: 'সন্ধ্যা শিফট',
  [SCHEDULE_TYPE.NIGHT_SHIFT]: 'রাত শিফট',
  [SCHEDULE_TYPE.WEEKEND_SHIFT]: 'সাপ্তাহিক ছুটির শিফট',
  [SCHEDULE_TYPE.ON_CALL]: 'অন-কল',
  [SCHEDULE_TYPE.TRAINING_SESSION]: 'প্রশিক্ষণ সেশন',
  [SCHEDULE_TYPE.MEETING]: 'মিটিং',
  [SCHEDULE_TYPE.BREAK]: 'বিরতি',
  [SCHEDULE_TYPE.HOLIDAY]: 'ছুটির দিন',
  [SCHEDULE_TYPE.SICK_LEAVE]: 'অসুস্থ ছুটি',
  [SCHEDULE_TYPE.VACATION]: 'ছুটি',
  [SCHEDULE_TYPE.REMOTE_WORK]: 'রিমোট কাজ',
  [SCHEDULE_TYPE.OVERTIME]: 'ওভারটাইম',
  [SCHEDULE_TYPE.COMPENSATORY_OFF]: 'ক্ষতিপূরণ ছুটি',
  [SCHEDULE_TYPE.TEAM_MEETING]: 'টিম মিটিং',
  [SCHEDULE_TYPE.ONE_ON_ONE]: 'এক-অন-এক',
  [SCHEDULE_TYPE.WORKSHOP]: 'ওয়ার্কশপ',
  [SCHEDULE_TYPE.SEMINAR]: 'সেমিনার',
  [SCHEDULE_TYPE.SHADOWING]: 'শ্যাডোয়িং',
  [SCHEDULE_TYPE.MENTORING]: 'মেন্টরিং',
  [SCHEDULE_TYPE.COACHING]: 'কোচিং',
  [SCHEDULE_TYPE.ASSESSMENT]: 'অ্যাসেসমেন্ট',
  [SCHEDULE_TYPE.CERTIFICATION]: 'সার্টিফিকেশন',
  [SCHEDULE_TYPE.FLEXIBLE]: 'নমনীয়',
  [SCHEDULE_TYPE.COMPRESSED]: 'সংকুচিত',
  [SCHEDULE_TYPE.SPLIT_SHIFT]: 'বিভক্ত শিফট',
} as const;

/**
 * শিডিউল টাইপের আইকন (অনুষঙ্গিক নাম)
 */
export const SCHEDULE_TYPE_ICONS = {
  [SCHEDULE_TYPE.MORNING_SHIFT]: 'sunrise',
  [SCHEDULE_TYPE.EVENING_SHIFT]: 'sunset',
  [SCHEDULE_TYPE.NIGHT_SHIFT]: 'moon',
  [SCHEDULE_TYPE.WEEKEND_SHIFT]: 'calendar',
  [SCHEDULE_TYPE.ON_CALL]: 'phone',
  [SCHEDULE_TYPE.TRAINING_SESSION]: 'book',
  [SCHEDULE_TYPE.MEETING]: 'users',
  [SCHEDULE_TYPE.BREAK]: 'coffee',
  [SCHEDULE_TYPE.HOLIDAY]: 'flag',
  [SCHEDULE_TYPE.SICK_LEAVE]: 'thermometer',
  [SCHEDULE_TYPE.VACATION]: 'umbrella',
  [SCHEDULE_TYPE.REMOTE_WORK]: 'home',
  [SCHEDULE_TYPE.OVERTIME]: 'clock',
  [SCHEDULE_TYPE.COMPENSATORY_OFF]: 'calendar-check',
  [SCHEDULE_TYPE.TEAM_MEETING]: 'users',
  [SCHEDULE_TYPE.ONE_ON_ONE]: 'user',
  [SCHEDULE_TYPE.WORKSHOP]: 'tool',
  [SCHEDULE_TYPE.SEMINAR]: 'presentation',
  [SCHEDULE_TYPE.SHADOWING]: 'eye',
  [SCHEDULE_TYPE.MENTORING]: 'star',
  [SCHEDULE_TYPE.COACHING]: 'target',
  [SCHEDULE_TYPE.ASSESSMENT]: 'clipboard',
  [SCHEDULE_TYPE.CERTIFICATION]: 'award',
  [SCHEDULE_TYPE.FLEXIBLE]: 'sliders',
  [SCHEDULE_TYPE.COMPRESSED]: 'compress',
  [SCHEDULE_TYPE.SPLIT_SHIFT]: 'split',
} as const;

/**
 * শিডিউল টাইপের রঙের কোড (হেক্স)
 */
export const SCHEDULE_TYPE_COLORS = {
  [SCHEDULE_TYPE.MORNING_SHIFT]: '#f39c12',
  [SCHEDULE_TYPE.EVENING_SHIFT]: '#e67e22',
  [SCHEDULE_TYPE.NIGHT_SHIFT]: '#2c3e50',
  [SCHEDULE_TYPE.WEEKEND_SHIFT]: '#9b59b6',
  [SCHEDULE_TYPE.ON_CALL]: '#e74c3c',
  [SCHEDULE_TYPE.TRAINING_SESSION]: '#3498db',
  [SCHEDULE_TYPE.MEETING]: '#1abc9c',
  [SCHEDULE_TYPE.BREAK]: '#95a5a6',
  [SCHEDULE_TYPE.HOLIDAY]: '#2ecc71',
  [SCHEDULE_TYPE.SICK_LEAVE]: '#e74c3c',
  [SCHEDULE_TYPE.VACATION]: '#3498db',
  [SCHEDULE_TYPE.REMOTE_WORK]: '#1abc9c',
  [SCHEDULE_TYPE.OVERTIME]: '#e67e22',
  [SCHEDULE_TYPE.COMPENSATORY_OFF]: '#27ae60',
  [SCHEDULE_TYPE.TEAM_MEETING]: '#2980b9',
  [SCHEDULE_TYPE.ONE_ON_ONE]: '#8e44ad',
  [SCHEDULE_TYPE.WORKSHOP]: '#f39c12',
  [SCHEDULE_TYPE.SEMINAR]: '#9b59b6',
  [SCHEDULE_TYPE.SHADOWING]: '#34495e',
  [SCHEDULE_TYPE.MENTORING]: '#2ecc71',
  [SCHEDULE_TYPE.COACHING]: '#3498db',
  [SCHEDULE_TYPE.ASSESSMENT]: '#e67e22',
  [SCHEDULE_TYPE.CERTIFICATION]: '#f1c40f',
  [SCHEDULE_TYPE.FLEXIBLE]: '#7f8c8d',
  [SCHEDULE_TYPE.COMPRESSED]: '#95a5a6',
  [SCHEDULE_TYPE.SPLIT_SHIFT]: '#c0392b',
} as const;

/**
 * শিডিউল টাইপের ক্যাটাগরি
 */
export const SCHEDULE_TYPE_CATEGORIES = {
  [SCHEDULE_TYPE.MORNING_SHIFT]: 'shift',
  [SCHEDULE_TYPE.EVENING_SHIFT]: 'shift',
  [SCHEDULE_TYPE.NIGHT_SHIFT]: 'shift',
  [SCHEDULE_TYPE.WEEKEND_SHIFT]: 'shift',
  [SCHEDULE_TYPE.ON_CALL]: 'special',
  [SCHEDULE_TYPE.TRAINING_SESSION]: 'development',
  [SCHEDULE_TYPE.MEETING]: 'collaboration',
  [SCHEDULE_TYPE.BREAK]: 'rest',
  [SCHEDULE_TYPE.HOLIDAY]: 'leave',
  [SCHEDULE_TYPE.SICK_LEAVE]: 'leave',
  [SCHEDULE_TYPE.VACATION]: 'leave',
  [SCHEDULE_TYPE.REMOTE_WORK]: 'work_mode',
  [SCHEDULE_TYPE.OVERTIME]: 'special',
  [SCHEDULE_TYPE.COMPENSATORY_OFF]: 'leave',
  [SCHEDULE_TYPE.TEAM_MEETING]: 'collaboration',
  [SCHEDULE_TYPE.ONE_ON_ONE]: 'collaboration',
  [SCHEDULE_TYPE.WORKSHOP]: 'development',
  [SCHEDULE_TYPE.SEMINAR]: 'development',
  [SCHEDULE_TYPE.SHADOWING]: 'development',
  [SCHEDULE_TYPE.MENTORING]: 'development',
  [SCHEDULE_TYPE.COACHING]: 'development',
  [SCHEDULE_TYPE.ASSESSMENT]: 'development',
  [SCHEDULE_TYPE.CERTIFICATION]: 'development',
  [SCHEDULE_TYPE.FLEXIBLE]: 'work_mode',
  [SCHEDULE_TYPE.COMPRESSED]: 'work_mode',
  [SCHEDULE_TYPE.SPLIT_SHIFT]: 'shift',
} as const;

/**
 * শিডিউল টাইপের ডিফল্ট সময় (ঘন্টায়)
 */
export const SCHEDULE_TYPE_DEFAULT_DURATION = {
  [SCHEDULE_TYPE.MORNING_SHIFT]: 8,
  [SCHEDULE_TYPE.EVENING_SHIFT]: 8,
  [SCHEDULE_TYPE.NIGHT_SHIFT]: 8,
  [SCHEDULE_TYPE.WEEKEND_SHIFT]: 8,
  [SCHEDULE_TYPE.ON_CALL]: 12,
  [SCHEDULE_TYPE.TRAINING_SESSION]: 2,
  [SCHEDULE_TYPE.MEETING]: 1,
  [SCHEDULE_TYPE.BREAK]: 0.5,
  [SCHEDULE_TYPE.HOLIDAY]: 8,
  [SCHEDULE_TYPE.SICK_LEAVE]: 8,
  [SCHEDULE_TYPE.VACATION]: 8,
  [SCHEDULE_TYPE.REMOTE_WORK]: 8,
  [SCHEDULE_TYPE.OVERTIME]: 2,
  [SCHEDULE_TYPE.COMPENSATORY_OFF]: 8,
  [SCHEDULE_TYPE.TEAM_MEETING]: 1,
  [SCHEDULE_TYPE.ONE_ON_ONE]: 0.5,
  [SCHEDULE_TYPE.WORKSHOP]: 4,
  [SCHEDULE_TYPE.SEMINAR]: 3,
  [SCHEDULE_TYPE.SHADOWING]: 4,
  [SCHEDULE_TYPE.MENTORING]: 1,
  [SCHEDULE_TYPE.COACHING]: 1,
  [SCHEDULE_TYPE.ASSESSMENT]: 2,
  [SCHEDULE_TYPE.CERTIFICATION]: 4,
  [SCHEDULE_TYPE.FLEXIBLE]: 8,
  [SCHEDULE_TYPE.COMPRESSED]: 10,
  [SCHEDULE_TYPE.SPLIT_SHIFT]: 8,
} as const;

/**
 * শিডিউল টাইপ গ্রুপ
 */
export const SCHEDULE_TYPE_GROUPS = {
  SHIFTS: ['morning_shift', 'evening_shift', 'night_shift', 'weekend_shift', 'split_shift'],
  LEAVE: ['holiday', 'sick_leave', 'vacation', 'compensatory_off'],
  DEVELOPMENT: [
    'training_session',
    'workshop',
    'seminar',
    'shadowing',
    'mentoring',
    'coaching',
    'assessment',
    'certification',
  ],
  COLLABORATION: ['meeting', 'team_meeting', 'one_on_one'],
  SPECIAL: ['on_call', 'overtime'],
  WORK_MODE: ['remote_work', 'flexible', 'compressed'],
  REST: ['break'],
} as const;

export type ScheduleType = (typeof SCHEDULE_TYPE)[keyof typeof SCHEDULE_TYPE];
export type ScheduleTypeDisplayNames = typeof SCHEDULE_TYPE_DISPLAY_NAMES;
export type ScheduleTypeIcons = typeof SCHEDULE_TYPE_ICONS;
export type ScheduleTypeColors = typeof SCHEDULE_TYPE_COLORS;
export type ScheduleTypeCategories = typeof SCHEDULE_TYPE_CATEGORIES;
export type ScheduleTypeDefaultDuration = typeof SCHEDULE_TYPE_DEFAULT_DURATION;
export type ScheduleTypeGroups = typeof SCHEDULE_TYPE_GROUPS;

export type ScheduleTypeGroup = keyof typeof SCHEDULE_TYPE_GROUPS;

export interface ScheduleTypeConfig {
  type: ScheduleType;
  displayName: string;
  icon: string;
  color: string;
  category: string;
  defaultDuration: number;
  group: ScheduleTypeGroup;
  description?: string;
}

/**
 * শিডিউল টাইপ কনফিগারেশন অবজেক্ট
 */
export const SCHEDULE_TYPE_CONFIGS: Record<ScheduleType, ScheduleTypeConfig> = {
  [SCHEDULE_TYPE.MORNING_SHIFT]: {
    type: SCHEDULE_TYPE.MORNING_SHIFT,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.MORNING_SHIFT],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.MORNING_SHIFT],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.MORNING_SHIFT],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.MORNING_SHIFT],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.MORNING_SHIFT],
    group: 'SHIFTS',
    description: 'সকালের শিফট (সাধারণত ৬টা থেকে ২টা)',
  },
  [SCHEDULE_TYPE.EVENING_SHIFT]: {
    type: SCHEDULE_TYPE.EVENING_SHIFT,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.EVENING_SHIFT],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.EVENING_SHIFT],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.EVENING_SHIFT],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.EVENING_SHIFT],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.EVENING_SHIFT],
    group: 'SHIFTS',
    description: 'সন্ধ্যার শিফট (সাধারণত ২টা থেকে ১০টা)',
  },
  [SCHEDULE_TYPE.NIGHT_SHIFT]: {
    type: SCHEDULE_TYPE.NIGHT_SHIFT,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.NIGHT_SHIFT],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.NIGHT_SHIFT],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.NIGHT_SHIFT],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.NIGHT_SHIFT],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.NIGHT_SHIFT],
    group: 'SHIFTS',
    description: 'রাতের শিফট (সাধারণত ১০টা থেকে ৬টা)',
  },
  [SCHEDULE_TYPE.WEEKEND_SHIFT]: {
    type: SCHEDULE_TYPE.WEEKEND_SHIFT,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.WEEKEND_SHIFT],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.WEEKEND_SHIFT],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.WEEKEND_SHIFT],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.WEEKEND_SHIFT],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.WEEKEND_SHIFT],
    group: 'SHIFTS',
    description: 'সাপ্তাহিক ছুটির দিনে শিফট',
  },
  [SCHEDULE_TYPE.ON_CALL]: {
    type: SCHEDULE_TYPE.ON_CALL,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.ON_CALL],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.ON_CALL],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.ON_CALL],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.ON_CALL],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.ON_CALL],
    group: 'SPECIAL',
    description: 'অন-কল ডিউটি',
  },
  [SCHEDULE_TYPE.TRAINING_SESSION]: {
    type: SCHEDULE_TYPE.TRAINING_SESSION,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.TRAINING_SESSION],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.TRAINING_SESSION],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.TRAINING_SESSION],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.TRAINING_SESSION],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.TRAINING_SESSION],
    group: 'DEVELOPMENT',
    description: 'প্রশিক্ষণ সেশন',
  },
  [SCHEDULE_TYPE.MEETING]: {
    type: SCHEDULE_TYPE.MEETING,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.MEETING],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.MEETING],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.MEETING],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.MEETING],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.MEETING],
    group: 'COLLABORATION',
    description: 'সাধারণ মিটিং',
  },
  [SCHEDULE_TYPE.BREAK]: {
    type: SCHEDULE_TYPE.BREAK,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.BREAK],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.BREAK],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.BREAK],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.BREAK],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.BREAK],
    group: 'REST',
    description: 'বিরতি সময়',
  },
  [SCHEDULE_TYPE.HOLIDAY]: {
    type: SCHEDULE_TYPE.HOLIDAY,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.HOLIDAY],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.HOLIDAY],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.HOLIDAY],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.HOLIDAY],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.HOLIDAY],
    group: 'LEAVE',
    description: 'জাতীয় বা প্রতিষ্ঠানিক ছুটির দিন',
  },
  [SCHEDULE_TYPE.SICK_LEAVE]: {
    type: SCHEDULE_TYPE.SICK_LEAVE,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.SICK_LEAVE],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.SICK_LEAVE],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.SICK_LEAVE],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.SICK_LEAVE],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.SICK_LEAVE],
    group: 'LEAVE',
    description: 'অসুস্থতার জন্য ছুটি',
  },
  [SCHEDULE_TYPE.VACATION]: {
    type: SCHEDULE_TYPE.VACATION,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.VACATION],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.VACATION],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.VACATION],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.VACATION],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.VACATION],
    group: 'LEAVE',
    description: 'ছুটি/ভ্রমণ',
  },
  [SCHEDULE_TYPE.REMOTE_WORK]: {
    type: SCHEDULE_TYPE.REMOTE_WORK,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.REMOTE_WORK],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.REMOTE_WORK],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.REMOTE_WORK],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.REMOTE_WORK],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.REMOTE_WORK],
    group: 'WORK_MODE',
    description: 'বাসা থেকে কাজ',
  },
  [SCHEDULE_TYPE.OVERTIME]: {
    type: SCHEDULE_TYPE.OVERTIME,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.OVERTIME],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.OVERTIME],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.OVERTIME],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.OVERTIME],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.OVERTIME],
    group: 'SPECIAL',
    description: 'অতিরিক্ত সময় কাজ',
  },
  [SCHEDULE_TYPE.COMPENSATORY_OFF]: {
    type: SCHEDULE_TYPE.COMPENSATORY_OFF,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.COMPENSATORY_OFF],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.COMPENSATORY_OFF],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.COMPENSATORY_OFF],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.COMPENSATORY_OFF],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.COMPENSATORY_OFF],
    group: 'LEAVE',
    description: 'ওভারটাইমের জন্য ক্ষতিপূরণ ছুটি',
  },
  [SCHEDULE_TYPE.TEAM_MEETING]: {
    type: SCHEDULE_TYPE.TEAM_MEETING,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.TEAM_MEETING],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.TEAM_MEETING],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.TEAM_MEETING],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.TEAM_MEETING],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.TEAM_MEETING],
    group: 'COLLABORATION',
    description: 'টিম মিটিং',
  },
  [SCHEDULE_TYPE.ONE_ON_ONE]: {
    type: SCHEDULE_TYPE.ONE_ON_ONE,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.ONE_ON_ONE],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.ONE_ON_ONE],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.ONE_ON_ONE],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.ONE_ON_ONE],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.ONE_ON_ONE],
    group: 'COLLABORATION',
    description: 'এক-অন-এক মিটিং',
  },
  [SCHEDULE_TYPE.WORKSHOP]: {
    type: SCHEDULE_TYPE.WORKSHOP,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.WORKSHOP],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.WORKSHOP],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.WORKSHOP],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.WORKSHOP],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.WORKSHOP],
    group: 'DEVELOPMENT',
    description: 'ওয়ার্কশপ',
  },
  [SCHEDULE_TYPE.SEMINAR]: {
    type: SCHEDULE_TYPE.SEMINAR,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.SEMINAR],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.SEMINAR],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.SEMINAR],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.SEMINAR],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.SEMINAR],
    group: 'DEVELOPMENT',
    description: 'সেমিনার',
  },
  [SCHEDULE_TYPE.SHADOWING]: {
    type: SCHEDULE_TYPE.SHADOWING,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.SHADOWING],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.SHADOWING],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.SHADOWING],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.SHADOWING],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.SHADOWING],
    group: 'DEVELOPMENT',
    description: 'শ্যাডোয়িং (অন্যের কাজ পর্যবেক্ষণ)',
  },
  [SCHEDULE_TYPE.MENTORING]: {
    type: SCHEDULE_TYPE.MENTORING,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.MENTORING],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.MENTORING],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.MENTORING],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.MENTORING],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.MENTORING],
    group: 'DEVELOPMENT',
    description: 'মেন্টরিং সেশন',
  },
  [SCHEDULE_TYPE.COACHING]: {
    type: SCHEDULE_TYPE.COACHING,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.COACHING],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.COACHING],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.COACHING],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.COACHING],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.COACHING],
    group: 'DEVELOPMENT',
    description: 'কোচিং সেশন',
  },
  [SCHEDULE_TYPE.ASSESSMENT]: {
    type: SCHEDULE_TYPE.ASSESSMENT,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.ASSESSMENT],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.ASSESSMENT],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.ASSESSMENT],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.ASSESSMENT],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.ASSESSMENT],
    group: 'DEVELOPMENT',
    description: 'অ্যাসেসমেন্ট/মূল্যায়ন',
  },
  [SCHEDULE_TYPE.CERTIFICATION]: {
    type: SCHEDULE_TYPE.CERTIFICATION,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.CERTIFICATION],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.CERTIFICATION],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.CERTIFICATION],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.CERTIFICATION],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.CERTIFICATION],
    group: 'DEVELOPMENT',
    description: 'সার্টিফিকেশন পরীক্ষা',
  },
  [SCHEDULE_TYPE.FLEXIBLE]: {
    type: SCHEDULE_TYPE.FLEXIBLE,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.FLEXIBLE],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.FLEXIBLE],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.FLEXIBLE],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.FLEXIBLE],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.FLEXIBLE],
    group: 'WORK_MODE',
    description: 'নমনীয় কাজের সময়',
  },
  [SCHEDULE_TYPE.COMPRESSED]: {
    type: SCHEDULE_TYPE.COMPRESSED,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.COMPRESSED],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.COMPRESSED],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.COMPRESSED],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.COMPRESSED],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.COMPRESSED],
    group: 'WORK_MODE',
    description: 'সংকুচিত কাজের সময় (দীর্ঘ দিন, কম দিন)',
  },
  [SCHEDULE_TYPE.SPLIT_SHIFT]: {
    type: SCHEDULE_TYPE.SPLIT_SHIFT,
    displayName: SCHEDULE_TYPE_DISPLAY_NAMES[SCHEDULE_TYPE.SPLIT_SHIFT],
    icon: SCHEDULE_TYPE_ICONS[SCHEDULE_TYPE.SPLIT_SHIFT],
    color: SCHEDULE_TYPE_COLORS[SCHEDULE_TYPE.SPLIT_SHIFT],
    category: SCHEDULE_TYPE_CATEGORIES[SCHEDULE_TYPE.SPLIT_SHIFT],
    defaultDuration: SCHEDULE_TYPE_DEFAULT_DURATION[SCHEDULE_TYPE.SPLIT_SHIFT],
    group: 'SHIFTS',
    description: 'বিভক্ত শিফট (মাঝে বিরতি সহ)',
  },
};

/**
 * শিডিউল টাইপ গ্রুপ কনফিগারেশন
 */
export const SCHEDULE_TYPE_GROUP_CONFIGS: Record<
  ScheduleTypeGroup,
  {
    group: ScheduleTypeGroup;
    displayName: string;
    icon: string;
    color: string;
    types: readonly ScheduleType[];
    description?: string;
  }
> = {
  SHIFTS: {
    group: 'SHIFTS',
    displayName: 'শিফট',
    icon: 'clock',
    color: '#3498db',
    types: [
      'morning_shift',
      'evening_shift',
      'night_shift',
      'weekend_shift',
      'split_shift',
    ] as const,
    description: 'বিভিন্ন শিফট টাইপ',
  },
  LEAVE: {
    group: 'LEAVE',
    displayName: 'ছুটি',
    icon: 'calendar',
    color: '#2ecc71',
    types: ['holiday', 'sick_leave', 'vacation', 'compensatory_off'] as const,
    description: 'ছুটি সম্পর্কিত টাইপ',
  },
  DEVELOPMENT: {
    group: 'DEVELOPMENT',
    displayName: 'উন্নয়ন',
    icon: 'book',
    color: '#9b59b6',
    types: [
      'training_session',
      'workshop',
      'seminar',
      'shadowing',
      'mentoring',
      'coaching',
      'assessment',
      'certification',
    ] as const,
    description: 'উন্নয়নমূলক কার্যক্রম',
  },
  COLLABORATION: {
    group: 'COLLABORATION',
    displayName: 'সহযোগিতা',
    icon: 'users',
    color: '#1abc9c',
    types: ['meeting', 'team_meeting', 'one_on_one'] as const,
    description: 'সহযোগিতামূলক কার্যক্রম',
  },
  SPECIAL: {
    group: 'SPECIAL',
    displayName: 'বিশেষ',
    icon: 'star',
    color: '#e67e22',
    types: ['on_call', 'overtime'] as const,
    description: 'বিশেষ ধরনের শিডিউল',
  },
  WORK_MODE: {
    group: 'WORK_MODE',
    displayName: 'কাজের মোড',
    icon: 'home',
    color: '#7f8c8d',
    types: ['remote_work', 'flexible', 'compressed'] as const,
    description: 'কাজের মোড সম্পর্কিত টাইপ',
  },
  REST: {
    group: 'REST',
    displayName: 'বিরতি',
    icon: 'coffee',
    color: '#95a5a6',
    types: ['break'] as const,
    description: 'বিরতি ও বিশ্রাম',
  },
};

/**
 * শিডিউল টাইপ স্ট্যাটাস
 */
export const SCHEDULE_TYPE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DEPRECATED: 'deprecated',
} as const;

export type ScheduleTypeStatus = (typeof SCHEDULE_TYPE_STATUS)[keyof typeof SCHEDULE_TYPE_STATUS];
