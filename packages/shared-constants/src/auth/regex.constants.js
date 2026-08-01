/**
 * Regular expression constants for validation
 * All regex patterns are centralized here for consistent validation across the application
 */
/**
 * Email validation regex patterns
 * Following RFC 5322 specification for email validation
 */
export const EMAIL_REGEX = {
    /**
     * Standard email regex compliant with RFC 5322
     * Validates most common email formats
     */
    STANDARD: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    /**
     * Strict email regex with additional validation
     * Requires domain with at least one dot and valid TLD
     */
    STRICT: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/,
    /**
     * Simple email regex for basic validation
     * Less strict but faster for simple checks
     */
    SIMPLE: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    /**
     * International email regex supporting Unicode characters
     * For international domain names and local parts
     */
    INTERNATIONAL: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/u,
    /**
     * Email regex with domain validation
     * Validates domain has valid TLD and structure
     */
    WITH_DOMAIN_VALIDATION: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
};
/**
 * Password validation regex patterns
 * Various complexity levels for password validation
 */
export const PASSWORD_REGEX = {
    /**
     * Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
     * Strong password validation for maximum security
     */
    STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    /**
     * Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number
     * Medium strength password validation
     */
    MEDIUM: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
    /**
     * Minimum 8 characters, at least one letter and one number
     * Basic password validation
     */
    BASIC: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    /**
     * Minimum 8 characters, only letters and numbers allowed
     * Simple alphanumeric validation
     */
    ALPHANUMERIC: /^[A-Za-z\d]{8,}$/,
    /**
     * Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
     * Special characters: @$!%*?&
     */
    COMPLEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    /**
     * Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
     * Extended special characters: @$!%*?&_-
     */
    EXTENDED: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/,
    /**
     * No special characters allowed, only letters and numbers
     * Minimum 8 characters
     */
    NO_SPECIAL_CHARS: /^[A-Za-z\d]{8,}$/,
    /**
     * Must contain at least one special character
     * Minimum 8 characters
     */
    WITH_SPECIAL_CHARS: /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};
/**
 * Username validation regex patterns
 */
export const USERNAME_REGEX = {
    /**
     * Alphanumeric username with underscore and hyphen
     * 3-20 characters
     */
    STANDARD: /^[a-zA-Z0-9_-]{3,20}$/,
    /**
     * Alphanumeric username only
     * 3-20 characters
     */
    ALPHANUMERIC: /^[a-zA-Z0-9]{3,20}$/,
    /**
     * Username with only lowercase letters, numbers, and underscore
     * 3-20 characters
     */
    LOWERCASE: /^[a-z0-9_]{3,20}$/,
    /**
     * Username with no special characters
     * 3-30 characters
     */
    SIMPLE: /^[a-zA-Z0-9]{3,30}$/,
};
/**
 * Phone number validation regex patterns
 */
export const PHONE_REGEX = {
    /**
     * International phone number format
     * Supports + and country codes
     */
    INTERNATIONAL: /^\+(?:[0-9]){1,3}[0-9]{6,14}$/,
    /**
     * US phone number format
     * (XXX) XXX-XXXX or XXX-XXX-XXXX or XXXXXXXXXX
     */
    US: /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
    /**
     * Simple phone number validation
     * Digits only, 7-15 characters
     */
    SIMPLE: /^[0-9]{7,15}$/,
    /**
     * Phone number with optional country code
     * Supports + and leading zeros
     */
    WITH_COUNTRY_CODE: /^(\+?\d{1,3}[- ]?)?\d{7,15}$/,
    /**
     * Indian phone number format
     * 10 digits starting with 6,7,8,9
     */
    INDIA: /^[6-9]\d{9}$/,
};
/**
 * URL validation regex patterns
 */
export const URL_REGEX = {
    /**
     * HTTP/HTTPS URL validation
     * Validates common URL formats
     */
    HTTP: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
    /**
     * URL with optional protocol
     * Can be http, https, or without protocol
     */
    WITH_OPTIONAL_PROTOCOL: /^(https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
    /**
     * Localhost URL validation
     * For development environments
     */
    LOCALHOST: /^https?:\/\/localhost(:\d+)?(\/.*)?$/,
    /**
     * IP address URL validation
     * Validates URLs with IP addresses
     */
    IP_ADDRESS: /^https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?(\/.*)?$/,
    /**
     * International URL validation
     * Supports Unicode characters in domains
     */
    INTERNATIONAL: /^https?:\/\/(?:www\.)?[-\w\u00C0-\u017F]+(?:\.[-\w\u00C0-\u017F]+)*(?:\.[a-zA-Z]{2,})(?:\/[-\w\u00C0-\u017F]*)*$/u,
};
/**
 * IP address validation regex patterns
 */
export const IP_REGEX = {
    /**
     * IPv4 address validation
     * Standard IPv4 format: xxx.xxx.xxx.xxx
     */
    IPV4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    /**
     * IPv6 address validation
     * Standard IPv6 format
     */
    IPV6: /^(?:(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,7}:|(?:[a-fA-F0-9]{1,4}:){1,6}:[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,5}(?::[a-fA-F0-9]{1,4}){1,2}|(?:[a-fA-F0-9]{1,4}:){1,4}(?::[a-fA-F0-9]{1,4}){1,3}|(?:[a-fA-F0-9]{1,4}:){1,3}(?::[a-fA-F0-9]{1,4}){1,4}|(?:[a-fA-F0-9]{1,4}:){1,2}(?::[a-fA-F0-9]{1,4}){1,5}|[a-fA-F0-9]{1,4}:(?:(?::[a-fA-F0-9]{1,4}){1,6})|:(?:(?::[a-fA-F0-9]{1,4}){1,7}|:)|::(?:[a-fA-F0-9]{1,4}:){0,6}[a-fA-F0-9]{1,4})$/,
    /**
     * CIDR notation validation
     * IPv4 with CIDR: xxx.xxx.xxx.xxx/xx
     */
    CIDR: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(?:[0-9]|[12][0-9]|3[0-2])$/,
};
/**
 * Date and time validation regex patterns
 */
export const DATE_REGEX = {
    /**
     * ISO 8601 date format
     * YYYY-MM-DD
     */
    ISO_DATE: /^\d{4}-\d{2}-\d{2}$/,
    /**
     * ISO 8601 datetime format
     * YYYY-MM-DDThh:mm:ss
     */
    ISO_DATETIME: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/,
    /**
     * US date format
     * MM/DD/YYYY
     */
    US_DATE: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
    /**
     * EU date format
     * DD/MM/YYYY
     */
    EU_DATE: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    /**
     * SQL datetime format
     * YYYY-MM-DD HH:MM:SS
     */
    SQL_DATETIME: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
};
/**
 * Credit card validation regex patterns
 */
export const CREDIT_CARD_REGEX = {
    /**
     * Visa credit card
     * Starts with 4, 13-16 digits
     */
    VISA: /^4[0-9]{12}(?:[0-9]{3})?$/,
    /**
     * Mastercard
     * Starts with 51-55 or 2221-2720, 16 digits
     */
    MASTERCARD: /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
    /**
     * American Express
     * Starts with 34 or 37, 15 digits
     */
    AMERICAN_EXPRESS: /^3[47][0-9]{13}$/,
    /**
     * Discover
     * Starts with 6011, 622126-622925, 64, 65, 16 digits
     */
    DISCOVER: /^(6011|65|64[4-9]|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]))[0-9]{12}$/,
    /**
     * JCB
     * Starts with 3528-3589, 16 digits
     */
    JCB: /^35[2-8][0-9]{14}$/,
    /**
     * Diner's Club
     * Starts with 300-305, 36, 38, 14-19 digits
     */
    DINERS_CLUB: /^3(0[0-5]|[68][0-9])[0-9]{11}$/,
    /**
     * Generic credit card
     * 13-19 digits
     */
    GENERIC: /^[0-9]{13,19}$/,
};
/**
 * General validation regex patterns
 */
export const VALIDATION_REGEX = {
    /**
     * UUID v4 validation
     * Standard UUID format
     */
    UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    /**
     * UUID v1, v2, v3, v4, v5 validation
     * All UUID versions
     */
    UUID_ALL: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    /**
     * Hexadecimal color code
     * #RRGGBB or #RGB
     */
    HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    /**
     * RGB color code
     * rgb(0-255, 0-255, 0-255)
     */
    RGB_COLOR: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
    /**
     * HSL color code
     * hsl(0-360, 0-100%, 0-100%)
     */
    HSL_COLOR: /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/,
    /**
     * Postal/ZIP code
     * US ZIP code format
     */
    US_ZIP: /^\d{5}(-\d{4})?$/,
    /**
     * Postal/ZIP code
     * UK postcode format
     */
    UK_POSTCODE: /^([A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2})$/i,
    /**
     * Canadian postal code
     * Format: A1A 1A1
     */
    CANADA_POSTCODE: /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i,
    /**
     * HTML tag validation
     * Validates basic HTML tags
     */
    HTML_TAG: /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/i,
    /**
     * JSON validation
     * Validates JSON string format
     */
    JSON: /^[\],:{}\s]*$|^"(?:[^\\"]|\\.)*"|^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?|^(?:true|false|null)$/,
    /**
     * Base64 validation
     * Validates Base64 encoded strings
     */
    BASE64: /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,
    /**
     * Bitcoin address validation
     * Valid Bitcoin address format
     */
    BITCOIN: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
    /**
     * Ethereum address validation
     * Valid Ethereum address format
     */
    ETHEREUM: /^0x[a-fA-F0-9]{40}$/,
    /**
     * MongoDB ObjectID validation
     * Valid MongoDB ObjectID format
     */
    MONGODB_OBJECTID: /^[0-9a-fA-F]{24}$/,
};
/**
 * Slug and URL slug validation regex patterns
 */
export const SLUG_REGEX = {
    /**
     * URL slug format
     * Lowercase letters, numbers, and hyphens
     */
    URL_SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    /**
     * URL slug with underscore support
     * Lowercase letters, numbers, hyphens, and underscores
     */
    URL_SLUG_WITH_UNDERSCORE: /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/,
    /**
     * Blog post slug
     * Allows numbers, letters, hyphens, and underscores
     */
    BLOG_SLUG: /^[a-zA-Z0-9_-]+$/,
    /**
     * SEO friendly slug
     * Only lowercase letters, numbers, and hyphens
     * Minimum 3 characters
     */
    SEO_SLUG: /^[a-z0-9-]{3,}$/,
};
/**
 * File extension validation regex patterns
 */
export const FILE_EXTENSION_REGEX = {
    /**
     * Image file extensions
     * jpg, jpeg, png, gif, webp, svg, bmp, ico
     */
    IMAGE: /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i,
    /**
     * Document file extensions
     * pdf, doc, docx, xls, xlsx, ppt, pptx, txt, csv, rtf
     */
    DOCUMENT: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|csv|rtf)$/i,
    /**
     * Video file extensions
     * mp4, avi, mov, wmv, flv, mkv, webm, m4v
     */
    VIDEO: /\.(mp4|avi|mov|wmv|flv|mkv|webm|m4v)$/i,
    /**
     * Audio file extensions
     * mp3, wav, ogg, flac, aac, m4a, wma
     */
    AUDIO: /\.(mp3|wav|ogg|flac|aac|m4a|wma)$/i,
    /**
     * Archive file extensions
     * zip, rar, 7z, tar, gz, bz2, tgz, z
     */
    ARCHIVE: /\.(zip|rar|7z|tar|gz|bz2|tgz|z)$/i,
    /**
     * Code file extensions
     * js, jsx, ts, tsx, py, java, c, cpp, rb, go, rs, php, html, css, scss, less
     */
    CODE: /\.(js|jsx|ts|tsx|py|java|c|cpp|rb|go|rs|php|html|css|scss|less)$/i,
    /**
     * Executable file extensions
     * exe, msi, app, dmg, deb, rpm
     */
    EXECUTABLE: /\.(exe|msi|app|dmg|deb|rpm)$/i,
};
/**
 * Special character validation regex patterns
 */
export const SPECIAL_CHARS_REGEX = {
    /**
     * Contains at least one special character
     * Special characters: !@#$%^&*()_+-=[]{}|;:,.<>?
     */
    CONTAINS_SPECIAL: /[!@#$%^&*()_+-=[\]{}|;:,.<>?]/,
    /**
     * Contains at least one uppercase letter
     */
    CONTAINS_UPPERCASE: /[A-Z]/,
    /**
     * Contains at least one lowercase letter
     */
    CONTAINS_LOWERCASE: /[a-z]/,
    /**
     * Contains at least one number
     */
    CONTAINS_NUMBER: /\d/,
    /**
     * Contains at least one letter
     */
    CONTAINS_LETTER: /[A-Za-z]/,
    /**
     * Contains only letters, numbers, and spaces
     */
    ONLY_LETTERS_NUMBERS_SPACES: /^[A-Za-z0-9 ]+$/,
    /**
     * Contains only letters and spaces
     */
    ONLY_LETTERS_SPACES: /^[A-Za-z ]+$/,
    /**
     * Contains only numbers
     */
    ONLY_NUMBERS: /^\d+$/,
    /**
     * Contains no special characters
     */
    NO_SPECIAL_CHARS: /^[A-Za-z0-9]+$/,
};
/**
 * Text formatting regex patterns
 */
export const TEXT_REGEX = {
    /**
     * HTML tag stripping
     * Removes all HTML tags
     */
    STRIP_HTML_TAGS: /<[^>]*>/g,
    /**
     * Whitespace trimming
     * Removes leading and trailing whitespace
     */
    TRIM_WHITESPACE: /^\s+|\s+$/g,
    /**
     * Multiple spaces to single space
     * Converts multiple spaces to a single space
     */
    MULTIPLE_SPACES: /\s{2,}/g,
    /**
     * Line breaks to <br>
     * Converts newlines to HTML line breaks
     */
    LINE_BREAKS: /\n/g,
    /**
     * Multiple line breaks to single
     * Converts multiple line breaks to a single line break
     */
    MULTIPLE_LINE_BREAKS: /\n{2,}/g,
    /**
     * Email extraction
     * Extracts email addresses from text
     */
    EXTRACT_EMAILS: /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/g,
    /**
     * URL extraction
     * Extracts URLs from text
     */
    EXTRACT_URLS: /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/g,
    /**
     * Hashtag extraction
     * Extracts hashtags from text
     */
    EXTRACT_HASHTAGS: /#\w+/g,
    /**
     * Mention extraction
     * Extracts @mentions from text
     */
    EXTRACT_MENTIONS: /@\w+/g,
};
/**
 * Regular expression utilities and helper functions
 */
export const REGEX_UTILS = {
    /**
     * Test if a string matches a regex pattern
     */
    testPattern: (str, pattern) => {
        return pattern.test(str);
    },
    /**
     * Extract all matches from a string
     */
    extractMatches: (str, pattern) => {
        return str.match(pattern);
    },
    /**
     * Replace all occurrences of a pattern in a string
     */
    replaceAll: (str, pattern, replacement) => {
        return str.replace(pattern, replacement);
    },
    /**
     * Escape special characters in a string for use in regex
     */
    escapeString: (str) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },
    /**
     * Combine multiple regex patterns into one
     */
    combinePatterns: (patterns, flags = '') => {
        const sources = patterns.map((p) => p.source);
        return new RegExp(sources.join('|'), flags);
    },
};
/**
 * Regex pattern categories for easier access
 */
export const REGEX = {
    EMAIL: EMAIL_REGEX,
    PASSWORD: PASSWORD_REGEX,
    USERNAME: USERNAME_REGEX,
    PHONE: PHONE_REGEX,
    URL: URL_REGEX,
    IP: IP_REGEX,
    DATE: DATE_REGEX,
    CREDIT_CARD: CREDIT_CARD_REGEX,
    VALIDATION: VALIDATION_REGEX,
    SLUG: SLUG_REGEX,
    FILE_EXTENSION: FILE_EXTENSION_REGEX,
    SPECIAL_CHARS: SPECIAL_CHARS_REGEX,
    TEXT: TEXT_REGEX,
};
/**
 * All regex patterns combined for easy import
 */
export const ALL_REGEX = {
    ...EMAIL_REGEX,
    ...PASSWORD_REGEX,
    ...USERNAME_REGEX,
    ...PHONE_REGEX,
    ...URL_REGEX,
    ...IP_REGEX,
    ...DATE_REGEX,
    ...CREDIT_CARD_REGEX,
    ...VALIDATION_REGEX,
    ...SLUG_REGEX,
    ...FILE_EXTENSION_REGEX,
    ...SPECIAL_CHARS_REGEX,
    ...TEXT_REGEX,
};
//# sourceMappingURL=regex.constants.js.map