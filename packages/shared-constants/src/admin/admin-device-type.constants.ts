/**
 * অ্যাডমিন ডিভাইসের টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ডিভাইস টাইপ
export const DEVICE_TYPES = {
  DESKTOP: 'desktop',
  LAPTOP: 'laptop',
  MOBILE: 'mobile',
  TABLET: 'tablet',
  OTHER: 'other',
} as const;

// টাইপের আইকন
export const DEVICE_TYPE_ICONS = {
  DESKTOP: '🖥️',
  LAPTOP: '💻',
  MOBILE: '📱',
  TABLET: '📋',
  OTHER: '🔌',
} as const;

// টাইপের কালার কোড
export const DEVICE_TYPE_COLORS = {
  DESKTOP: '#6366F1',
  LAPTOP: '#3B82F6',
  MOBILE: '#22C55E',
  TABLET: '#F59E0B',
  OTHER: '#94A3B8',
} as const;

// টাইপের ডেসক্রিপশন
export const DEVICE_TYPE_DESCRIPTIONS = {
  DESKTOP: 'Desktop computer with full capabilities',
  LAPTOP: 'Laptop computer with mobile capabilities',
  MOBILE: 'Mobile phone with touch interface',
  TABLET: 'Tablet device with touch interface',
  OTHER: 'Other type of device',
} as const;

// টাইপের ব্রাউজার সাপোর্ট
export const DEVICE_TYPE_BROWSER_SUPPORT = {
  DESKTOP: ['chrome', 'firefox', 'safari', 'edge', 'opera', 'brave', 'vivaldi'],
  LAPTOP: ['chrome', 'firefox', 'safari', 'edge', 'opera', 'brave', 'vivaldi'],
  MOBILE: ['chrome', 'safari', 'firefox', 'edge', 'opera', 'brave'],
  TABLET: ['chrome', 'safari', 'firefox', 'edge', 'opera'],
  OTHER: ['chrome', 'firefox', 'safari'],
} as const;

// টাইপের ওএস সাপোর্ট
export const DEVICE_TYPE_OS_SUPPORT = {
  DESKTOP: ['windows', 'macos', 'linux', 'chrome_os'],
  LAPTOP: ['windows', 'macos', 'linux', 'chrome_os'],
  MOBILE: ['android', 'ios'],
  TABLET: ['android', 'ios'],
  OTHER: ['android', 'ios', 'linux', 'chrome_os'],
} as const;

// টাইপের নিরাপত্তা লেভেল (১ = সর্বোচ্চ)
export const DEVICE_TYPE_SECURITY_LEVEL = {
  DESKTOP: 1,
  LAPTOP: 2,
  MOBILE: 3,
  TABLET: 4,
  OTHER: 5,
} as const;

// টাইপের ট্রাস্ট স্কোর বেস
export const DEVICE_TYPE_TRUST_SCORE_BASE = {
  DESKTOP: 85,
  LAPTOP: 80,
  MOBILE: 70,
  TABLET: 65,
  OTHER: 50,
} as const;

// টাইপ গ্রুপ
export const DEVICE_TYPE_GROUPS = {
  COMPUTERS: ['desktop', 'laptop'],
  MOBILE_DEVICES: ['mobile', 'tablet'],
  OTHER_DEVICES: ['other'],
} as const;

// টাইপের লেবেল (বাংলা)
export const DEVICE_TYPE_LABELS_BN = {
  DESKTOP: 'ডেস্কটপ',
  LAPTOP: 'ল্যাপটপ',
  MOBILE: 'মোবাইল',
  TABLET: 'ট্যাবলেট',
  OTHER: 'অন্যান্য',
} as const;

// টাইপের লেবেল (ইংরেজি)
export const DEVICE_TYPE_LABELS_EN = {
  DESKTOP: 'Desktop',
  LAPTOP: 'Laptop',
  MOBILE: 'Mobile',
  TABLET: 'Tablet',
  OTHER: 'Other',
} as const;

// টাইপের CSS ক্লাস
export const DEVICE_TYPE_CSS_CLASSES = {
  DESKTOP: 'device-desktop',
  LAPTOP: 'device-laptop',
  MOBILE: 'device-mobile',
  TABLET: 'device-tablet',
  OTHER: 'device-other',
} as const;

// টাইপের জন্য ইমোজি
export const DEVICE_TYPE_EMOJIS = {
  DESKTOP: '🖥️',
  LAPTOP: '💻',
  MOBILE: '📱',
  TABLET: '📲',
  OTHER: '🔋',
} as const;

// টাইপের স্ক্রিন রেজোলিউশন সাপোর্ট
export const DEVICE_TYPE_SCREEN_SUPPORT = {
  DESKTOP: { minWidth: 1024, minHeight: 768 },
  LAPTOP: { minWidth: 1366, minHeight: 768 },
  MOBILE: { minWidth: 320, minHeight: 480 },
  TABLET: { minWidth: 600, minHeight: 800 },
  OTHER: { minWidth: 0, minHeight: 0 },
} as const;

// টাইপের টাচ সাপোর্ট
export const DEVICE_TYPE_TOUCH_SUPPORT = {
  DESKTOP: false,
  LAPTOP: false,
  MOBILE: true,
  TABLET: true,
  OTHER: false,
} as const;
