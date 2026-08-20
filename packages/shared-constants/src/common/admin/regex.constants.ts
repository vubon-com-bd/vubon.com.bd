/**
 * সাধারণ রেগুলার এক্সপ্রেশন প্যাটার্ন সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ইমেইল ভ্যালিডেশন রিজেক্স
export const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// মোবাইল নম্বর ভ্যালিডেশন রিজেক্স
export const REGEX_PHONE = /^\+?[1-9]\d{1,14}$/;

// পাসওয়ার্ড ভ্যালিডেশন রিজেক্স
export const REGEX_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// ইউআরএল ভ্যালিডেশন রিজেক্স
export const REGEX_URL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

// ইউজারনেম ভ্যালিডেশন রিজেক্স
export const REGEX_USERNAME = /^[a-zA-Z0-9_]{3,20}$/;

// আলফানিউমেরিক রিজেক্স
export const REGEX_ALPHANUMERIC = /^[a-zA-Z0-9]+$/;

// তারিখ ফরম্যাট রিজেক্স (YYYY-MM-DD)
export const REGEX_DATE = /^\d{4}-\d{2}-\d{2}$/;

// সময় ফরম্যাট রিজেক্স (HH:MM:SS)
export const REGEX_TIME = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

// IP অ্যাড্রেস ভ্যালিডেশন রিজেক্স
export const REGEX_IP_ADDRESS =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

// UUID ভ্যালিডেশন রিজেক্স
export const REGEX_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// HTML ট্যাগ স্ট্রিপ রিজেক্স
export const REGEX_STRIP_HTML = /<[^>]*>/g;

// ইমেইল এক্সট্রাক্ট রিজেক্স
export const REGEX_EXTRACT_EMAIL = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// ফোন নম্বর ফরম্যাট রিজেক্স
export const REGEX_PHONE_FORMAT = /^(\+?\d{1,3}[-.]?)?\(?(\d{3})\)?[-.]?(\d{3})[-.]?(\d{4})$/;

// হেক্সাডেসিমাল কালার রিজেক্স
export const REGEX_HEX_COLOR = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// স্লাগ রিজেক্স
export const REGEX_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// ডোমেইন রিজেক্স
export const REGEX_DOMAIN = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

// অ্যালবাম আর্টিস্ট নাম রিজেক্স
export const REGEX_ARTIST_NAME = /^[a-zA-Z0-9\s\-_&.]{2,50}$/;

// ট্র্যাক টাইটেল রিজেক্স
export const REGEX_TRACK_TITLE = /^[a-zA-Z0-9\s\-_&.!?()]{1,100}$/;

// বুলিয়ান রিজেক্স
export const REGEX_BOOLEAN = /^(true|false|0|1)$/i;

// সংখ্যা রিজেক্স
export const REGEX_NUMBER = /^-?\d+\.?\d*$/;

// দশমিক সংখ্যা রিজেক্স
export const REGEX_DECIMAL = /^-?\d+(\.\d+)?$/;

// ইংরেজি অক্ষর রিজেক্স
export const REGEX_ALPHA = /^[a-zA-Z]+$/;

// স্পেস সহ ইংরেজি অক্ষর রিজেক্স
export const REGEX_ALPHA_SPACE = /^[a-zA-Z\s]+$/;

// পোস্টাল কোড রিজেক্স
export const REGEX_POSTAL_CODE = /^[0-9]{5}(?:-[0-9]{4})?$/;

// ক্রেডিট কার্ড রিজেক্স
export const REGEX_CREDIT_CARD = /^[0-9]{16}$/;

// CSV রিজেক্স
export const REGEX_CSV = /^([a-zA-Z0-9\s\-_&.!?()]+,?)+$/;

// JSON রিজেক্স
export const REGEX_JSON = /^[\],:{}\s]*$|^\{[\s\S]*\}$|^\[[\s\S]*\]$/;

// বেস64 রিজেক্স
export const REGEX_BASE64 = /^[A-Za-z0-9+/=]+$/;

// MD5 হ্যাশ রিজেক্স
export const REGEX_MD5 = /^[a-fA-F0-9]{32}$/;

// SHA1 হ্যাশ রিজেক্স
export const REGEX_SHA1 = /^[a-fA-F0-9]{40}$/;

// SHA256 হ্যাশ রিজেক্স
export const REGEX_SHA256 = /^[a-fA-F0-9]{64}$/;

// JWT রিজেক্স
export const REGEX_JWT = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

// ম্যাক অ্যাড্রেস রিজেক্স
export const REGEX_MAC_ADDRESS = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

// সেমভার রিজেক্স
export const REGEX_SEMVER =
  /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
