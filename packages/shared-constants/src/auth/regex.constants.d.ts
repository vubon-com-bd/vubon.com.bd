/**
 * Regular expression constants for validation
 * All regex patterns are centralized here for consistent validation across the application
 */
/**
 * Email validation regex patterns
 * Following RFC 5322 specification for email validation
 */
export declare const EMAIL_REGEX: {
    /**
     * Standard email regex compliant with RFC 5322
     * Validates most common email formats
     */
    readonly STANDARD: RegExp;
    /**
     * Strict email regex with additional validation
     * Requires domain with at least one dot and valid TLD
     */
    readonly STRICT: RegExp;
    /**
     * Simple email regex for basic validation
     * Less strict but faster for simple checks
     */
    readonly SIMPLE: RegExp;
    /**
     * International email regex supporting Unicode characters
     * For international domain names and local parts
     */
    readonly INTERNATIONAL: RegExp;
    /**
     * Email regex with domain validation
     * Validates domain has valid TLD and structure
     */
    readonly WITH_DOMAIN_VALIDATION: RegExp;
};
/**
 * Password validation regex patterns
 * Various complexity levels for password validation
 */
export declare const PASSWORD_REGEX: {
    /**
     * Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
     * Strong password validation for maximum security
     */
    readonly STRONG: RegExp;
    /**
     * Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number
     * Medium strength password validation
     */
    readonly MEDIUM: RegExp;
    /**
     * Minimum 8 characters, at least one letter and one number
     * Basic password validation
     */
    readonly BASIC: RegExp;
    /**
     * Minimum 8 characters, only letters and numbers allowed
     * Simple alphanumeric validation
     */
    readonly ALPHANUMERIC: RegExp;
    /**
     * Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
     * Special characters: @$!%*?&
     */
    readonly COMPLEX: RegExp;
    /**
     * Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
     * Extended special characters: @$!%*?&_-
     */
    readonly EXTENDED: RegExp;
    /**
     * No special characters allowed, only letters and numbers
     * Minimum 8 characters
     */
    readonly NO_SPECIAL_CHARS: RegExp;
    /**
     * Must contain at least one special character
     * Minimum 8 characters
     */
    readonly WITH_SPECIAL_CHARS: RegExp;
};
/**
 * Username validation regex patterns
 */
export declare const USERNAME_REGEX: {
    /**
     * Alphanumeric username with underscore and hyphen
     * 3-20 characters
     */
    readonly STANDARD: RegExp;
    /**
     * Alphanumeric username only
     * 3-20 characters
     */
    readonly ALPHANUMERIC: RegExp;
    /**
     * Username with only lowercase letters, numbers, and underscore
     * 3-20 characters
     */
    readonly LOWERCASE: RegExp;
    /**
     * Username with no special characters
     * 3-30 characters
     */
    readonly SIMPLE: RegExp;
};
/**
 * Phone number validation regex patterns
 */
export declare const PHONE_REGEX: {
    /**
     * International phone number format
     * Supports + and country codes
     */
    readonly INTERNATIONAL: RegExp;
    /**
     * US phone number format
     * (XXX) XXX-XXXX or XXX-XXX-XXXX or XXXXXXXXXX
     */
    readonly US: RegExp;
    /**
     * Simple phone number validation
     * Digits only, 7-15 characters
     */
    readonly SIMPLE: RegExp;
    /**
     * Phone number with optional country code
     * Supports + and leading zeros
     */
    readonly WITH_COUNTRY_CODE: RegExp;
    /**
     * Indian phone number format
     * 10 digits starting with 6,7,8,9
     */
    readonly INDIA: RegExp;
};
/**
 * URL validation regex patterns
 */
export declare const URL_REGEX: {
    /**
     * HTTP/HTTPS URL validation
     * Validates common URL formats
     */
    readonly HTTP: RegExp;
    /**
     * URL with optional protocol
     * Can be http, https, or without protocol
     */
    readonly WITH_OPTIONAL_PROTOCOL: RegExp;
    /**
     * Localhost URL validation
     * For development environments
     */
    readonly LOCALHOST: RegExp;
    /**
     * IP address URL validation
     * Validates URLs with IP addresses
     */
    readonly IP_ADDRESS: RegExp;
    /**
     * International URL validation
     * Supports Unicode characters in domains
     */
    readonly INTERNATIONAL: RegExp;
};
/**
 * IP address validation regex patterns
 */
export declare const IP_REGEX: {
    /**
     * IPv4 address validation
     * Standard IPv4 format: xxx.xxx.xxx.xxx
     */
    readonly IPV4: RegExp;
    /**
     * IPv6 address validation
     * Standard IPv6 format
     */
    readonly IPV6: RegExp;
    /**
     * CIDR notation validation
     * IPv4 with CIDR: xxx.xxx.xxx.xxx/xx
     */
    readonly CIDR: RegExp;
};
/**
 * Date and time validation regex patterns
 */
export declare const DATE_REGEX: {
    /**
     * ISO 8601 date format
     * YYYY-MM-DD
     */
    readonly ISO_DATE: RegExp;
    /**
     * ISO 8601 datetime format
     * YYYY-MM-DDThh:mm:ss
     */
    readonly ISO_DATETIME: RegExp;
    /**
     * US date format
     * MM/DD/YYYY
     */
    readonly US_DATE: RegExp;
    /**
     * EU date format
     * DD/MM/YYYY
     */
    readonly EU_DATE: RegExp;
    /**
     * SQL datetime format
     * YYYY-MM-DD HH:MM:SS
     */
    readonly SQL_DATETIME: RegExp;
};
/**
 * Credit card validation regex patterns
 */
export declare const CREDIT_CARD_REGEX: {
    /**
     * Visa credit card
     * Starts with 4, 13-16 digits
     */
    readonly VISA: RegExp;
    /**
     * Mastercard
     * Starts with 51-55 or 2221-2720, 16 digits
     */
    readonly MASTERCARD: RegExp;
    /**
     * American Express
     * Starts with 34 or 37, 15 digits
     */
    readonly AMERICAN_EXPRESS: RegExp;
    /**
     * Discover
     * Starts with 6011, 622126-622925, 64, 65, 16 digits
     */
    readonly DISCOVER: RegExp;
    /**
     * JCB
     * Starts with 3528-3589, 16 digits
     */
    readonly JCB: RegExp;
    /**
     * Diner's Club
     * Starts with 300-305, 36, 38, 14-19 digits
     */
    readonly DINERS_CLUB: RegExp;
    /**
     * Generic credit card
     * 13-19 digits
     */
    readonly GENERIC: RegExp;
};
/**
 * General validation regex patterns
 */
export declare const VALIDATION_REGEX: {
    /**
     * UUID v4 validation
     * Standard UUID format
     */
    readonly UUID: RegExp;
    /**
     * UUID v1, v2, v3, v4, v5 validation
     * All UUID versions
     */
    readonly UUID_ALL: RegExp;
    /**
     * Hexadecimal color code
     * #RRGGBB or #RGB
     */
    readonly HEX_COLOR: RegExp;
    /**
     * RGB color code
     * rgb(0-255, 0-255, 0-255)
     */
    readonly RGB_COLOR: RegExp;
    /**
     * HSL color code
     * hsl(0-360, 0-100%, 0-100%)
     */
    readonly HSL_COLOR: RegExp;
    /**
     * Postal/ZIP code
     * US ZIP code format
     */
    readonly US_ZIP: RegExp;
    /**
     * Postal/ZIP code
     * UK postcode format
     */
    readonly UK_POSTCODE: RegExp;
    /**
     * Canadian postal code
     * Format: A1A 1A1
     */
    readonly CANADA_POSTCODE: RegExp;
    /**
     * HTML tag validation
     * Validates basic HTML tags
     */
    readonly HTML_TAG: RegExp;
    /**
     * JSON validation
     * Validates JSON string format
     */
    readonly JSON: RegExp;
    /**
     * Base64 validation
     * Validates Base64 encoded strings
     */
    readonly BASE64: RegExp;
    /**
     * Bitcoin address validation
     * Valid Bitcoin address format
     */
    readonly BITCOIN: RegExp;
    /**
     * Ethereum address validation
     * Valid Ethereum address format
     */
    readonly ETHEREUM: RegExp;
    /**
     * MongoDB ObjectID validation
     * Valid MongoDB ObjectID format
     */
    readonly MONGODB_OBJECTID: RegExp;
};
/**
 * Slug and URL slug validation regex patterns
 */
export declare const SLUG_REGEX: {
    /**
     * URL slug format
     * Lowercase letters, numbers, and hyphens
     */
    readonly URL_SLUG: RegExp;
    /**
     * URL slug with underscore support
     * Lowercase letters, numbers, hyphens, and underscores
     */
    readonly URL_SLUG_WITH_UNDERSCORE: RegExp;
    /**
     * Blog post slug
     * Allows numbers, letters, hyphens, and underscores
     */
    readonly BLOG_SLUG: RegExp;
    /**
     * SEO friendly slug
     * Only lowercase letters, numbers, and hyphens
     * Minimum 3 characters
     */
    readonly SEO_SLUG: RegExp;
};
/**
 * File extension validation regex patterns
 */
export declare const FILE_EXTENSION_REGEX: {
    /**
     * Image file extensions
     * jpg, jpeg, png, gif, webp, svg, bmp, ico
     */
    readonly IMAGE: RegExp;
    /**
     * Document file extensions
     * pdf, doc, docx, xls, xlsx, ppt, pptx, txt, csv, rtf
     */
    readonly DOCUMENT: RegExp;
    /**
     * Video file extensions
     * mp4, avi, mov, wmv, flv, mkv, webm, m4v
     */
    readonly VIDEO: RegExp;
    /**
     * Audio file extensions
     * mp3, wav, ogg, flac, aac, m4a, wma
     */
    readonly AUDIO: RegExp;
    /**
     * Archive file extensions
     * zip, rar, 7z, tar, gz, bz2, tgz, z
     */
    readonly ARCHIVE: RegExp;
    /**
     * Code file extensions
     * js, jsx, ts, tsx, py, java, c, cpp, rb, go, rs, php, html, css, scss, less
     */
    readonly CODE: RegExp;
    /**
     * Executable file extensions
     * exe, msi, app, dmg, deb, rpm
     */
    readonly EXECUTABLE: RegExp;
};
/**
 * Special character validation regex patterns
 */
export declare const SPECIAL_CHARS_REGEX: {
    /**
     * Contains at least one special character
     * Special characters: !@#$%^&*()_+-=[]{}|;:,.<>?
     */
    readonly CONTAINS_SPECIAL: RegExp;
    /**
     * Contains at least one uppercase letter
     */
    readonly CONTAINS_UPPERCASE: RegExp;
    /**
     * Contains at least one lowercase letter
     */
    readonly CONTAINS_LOWERCASE: RegExp;
    /**
     * Contains at least one number
     */
    readonly CONTAINS_NUMBER: RegExp;
    /**
     * Contains at least one letter
     */
    readonly CONTAINS_LETTER: RegExp;
    /**
     * Contains only letters, numbers, and spaces
     */
    readonly ONLY_LETTERS_NUMBERS_SPACES: RegExp;
    /**
     * Contains only letters and spaces
     */
    readonly ONLY_LETTERS_SPACES: RegExp;
    /**
     * Contains only numbers
     */
    readonly ONLY_NUMBERS: RegExp;
    /**
     * Contains no special characters
     */
    readonly NO_SPECIAL_CHARS: RegExp;
};
/**
 * Text formatting regex patterns
 */
export declare const TEXT_REGEX: {
    /**
     * HTML tag stripping
     * Removes all HTML tags
     */
    readonly STRIP_HTML_TAGS: RegExp;
    /**
     * Whitespace trimming
     * Removes leading and trailing whitespace
     */
    readonly TRIM_WHITESPACE: RegExp;
    /**
     * Multiple spaces to single space
     * Converts multiple spaces to a single space
     */
    readonly MULTIPLE_SPACES: RegExp;
    /**
     * Line breaks to <br>
     * Converts newlines to HTML line breaks
     */
    readonly LINE_BREAKS: RegExp;
    /**
     * Multiple line breaks to single
     * Converts multiple line breaks to a single line break
     */
    readonly MULTIPLE_LINE_BREAKS: RegExp;
    /**
     * Email extraction
     * Extracts email addresses from text
     */
    readonly EXTRACT_EMAILS: RegExp;
    /**
     * URL extraction
     * Extracts URLs from text
     */
    readonly EXTRACT_URLS: RegExp;
    /**
     * Hashtag extraction
     * Extracts hashtags from text
     */
    readonly EXTRACT_HASHTAGS: RegExp;
    /**
     * Mention extraction
     * Extracts @mentions from text
     */
    readonly EXTRACT_MENTIONS: RegExp;
};
/**
 * Regular expression utilities and helper functions
 */
export declare const REGEX_UTILS: {
    /**
     * Test if a string matches a regex pattern
     */
    readonly testPattern: (str: string, pattern: RegExp) => boolean;
    /**
     * Extract all matches from a string
     */
    readonly extractMatches: (str: string, pattern: RegExp) => RegExpMatchArray | null;
    /**
     * Replace all occurrences of a pattern in a string
     */
    readonly replaceAll: (str: string, pattern: RegExp, replacement: string) => string;
    /**
     * Escape special characters in a string for use in regex
     */
    readonly escapeString: (str: string) => string;
    /**
     * Combine multiple regex patterns into one
     */
    readonly combinePatterns: (patterns: RegExp[], flags?: string) => RegExp;
};
/**
 * Regex pattern categories for easier access
 */
export declare const REGEX: {
    readonly EMAIL: {
        /**
         * Standard email regex compliant with RFC 5322
         * Validates most common email formats
         */
        readonly STANDARD: RegExp;
        /**
         * Strict email regex with additional validation
         * Requires domain with at least one dot and valid TLD
         */
        readonly STRICT: RegExp;
        /**
         * Simple email regex for basic validation
         * Less strict but faster for simple checks
         */
        readonly SIMPLE: RegExp;
        /**
         * International email regex supporting Unicode characters
         * For international domain names and local parts
         */
        readonly INTERNATIONAL: RegExp;
        /**
         * Email regex with domain validation
         * Validates domain has valid TLD and structure
         */
        readonly WITH_DOMAIN_VALIDATION: RegExp;
    };
    readonly PASSWORD: {
        /**
         * Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
         * Strong password validation for maximum security
         */
        readonly STRONG: RegExp;
        /**
         * Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number
         * Medium strength password validation
         */
        readonly MEDIUM: RegExp;
        /**
         * Minimum 8 characters, at least one letter and one number
         * Basic password validation
         */
        readonly BASIC: RegExp;
        /**
         * Minimum 8 characters, only letters and numbers allowed
         * Simple alphanumeric validation
         */
        readonly ALPHANUMERIC: RegExp;
        /**
         * Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
         * Special characters: @$!%*?&
         */
        readonly COMPLEX: RegExp;
        /**
         * Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
         * Extended special characters: @$!%*?&_-
         */
        readonly EXTENDED: RegExp;
        /**
         * No special characters allowed, only letters and numbers
         * Minimum 8 characters
         */
        readonly NO_SPECIAL_CHARS: RegExp;
        /**
         * Must contain at least one special character
         * Minimum 8 characters
         */
        readonly WITH_SPECIAL_CHARS: RegExp;
    };
    readonly USERNAME: {
        /**
         * Alphanumeric username with underscore and hyphen
         * 3-20 characters
         */
        readonly STANDARD: RegExp;
        /**
         * Alphanumeric username only
         * 3-20 characters
         */
        readonly ALPHANUMERIC: RegExp;
        /**
         * Username with only lowercase letters, numbers, and underscore
         * 3-20 characters
         */
        readonly LOWERCASE: RegExp;
        /**
         * Username with no special characters
         * 3-30 characters
         */
        readonly SIMPLE: RegExp;
    };
    readonly PHONE: {
        /**
         * International phone number format
         * Supports + and country codes
         */
        readonly INTERNATIONAL: RegExp;
        /**
         * US phone number format
         * (XXX) XXX-XXXX or XXX-XXX-XXXX or XXXXXXXXXX
         */
        readonly US: RegExp;
        /**
         * Simple phone number validation
         * Digits only, 7-15 characters
         */
        readonly SIMPLE: RegExp;
        /**
         * Phone number with optional country code
         * Supports + and leading zeros
         */
        readonly WITH_COUNTRY_CODE: RegExp;
        /**
         * Indian phone number format
         * 10 digits starting with 6,7,8,9
         */
        readonly INDIA: RegExp;
    };
    readonly URL: {
        /**
         * HTTP/HTTPS URL validation
         * Validates common URL formats
         */
        readonly HTTP: RegExp;
        /**
         * URL with optional protocol
         * Can be http, https, or without protocol
         */
        readonly WITH_OPTIONAL_PROTOCOL: RegExp;
        /**
         * Localhost URL validation
         * For development environments
         */
        readonly LOCALHOST: RegExp;
        /**
         * IP address URL validation
         * Validates URLs with IP addresses
         */
        readonly IP_ADDRESS: RegExp;
        /**
         * International URL validation
         * Supports Unicode characters in domains
         */
        readonly INTERNATIONAL: RegExp;
    };
    readonly IP: {
        /**
         * IPv4 address validation
         * Standard IPv4 format: xxx.xxx.xxx.xxx
         */
        readonly IPV4: RegExp;
        /**
         * IPv6 address validation
         * Standard IPv6 format
         */
        readonly IPV6: RegExp;
        /**
         * CIDR notation validation
         * IPv4 with CIDR: xxx.xxx.xxx.xxx/xx
         */
        readonly CIDR: RegExp;
    };
    readonly DATE: {
        /**
         * ISO 8601 date format
         * YYYY-MM-DD
         */
        readonly ISO_DATE: RegExp;
        /**
         * ISO 8601 datetime format
         * YYYY-MM-DDThh:mm:ss
         */
        readonly ISO_DATETIME: RegExp;
        /**
         * US date format
         * MM/DD/YYYY
         */
        readonly US_DATE: RegExp;
        /**
         * EU date format
         * DD/MM/YYYY
         */
        readonly EU_DATE: RegExp;
        /**
         * SQL datetime format
         * YYYY-MM-DD HH:MM:SS
         */
        readonly SQL_DATETIME: RegExp;
    };
    readonly CREDIT_CARD: {
        /**
         * Visa credit card
         * Starts with 4, 13-16 digits
         */
        readonly VISA: RegExp;
        /**
         * Mastercard
         * Starts with 51-55 or 2221-2720, 16 digits
         */
        readonly MASTERCARD: RegExp;
        /**
         * American Express
         * Starts with 34 or 37, 15 digits
         */
        readonly AMERICAN_EXPRESS: RegExp;
        /**
         * Discover
         * Starts with 6011, 622126-622925, 64, 65, 16 digits
         */
        readonly DISCOVER: RegExp;
        /**
         * JCB
         * Starts with 3528-3589, 16 digits
         */
        readonly JCB: RegExp;
        /**
         * Diner's Club
         * Starts with 300-305, 36, 38, 14-19 digits
         */
        readonly DINERS_CLUB: RegExp;
        /**
         * Generic credit card
         * 13-19 digits
         */
        readonly GENERIC: RegExp;
    };
    readonly VALIDATION: {
        /**
         * UUID v4 validation
         * Standard UUID format
         */
        readonly UUID: RegExp;
        /**
         * UUID v1, v2, v3, v4, v5 validation
         * All UUID versions
         */
        readonly UUID_ALL: RegExp;
        /**
         * Hexadecimal color code
         * #RRGGBB or #RGB
         */
        readonly HEX_COLOR: RegExp;
        /**
         * RGB color code
         * rgb(0-255, 0-255, 0-255)
         */
        readonly RGB_COLOR: RegExp;
        /**
         * HSL color code
         * hsl(0-360, 0-100%, 0-100%)
         */
        readonly HSL_COLOR: RegExp;
        /**
         * Postal/ZIP code
         * US ZIP code format
         */
        readonly US_ZIP: RegExp;
        /**
         * Postal/ZIP code
         * UK postcode format
         */
        readonly UK_POSTCODE: RegExp;
        /**
         * Canadian postal code
         * Format: A1A 1A1
         */
        readonly CANADA_POSTCODE: RegExp;
        /**
         * HTML tag validation
         * Validates basic HTML tags
         */
        readonly HTML_TAG: RegExp;
        /**
         * JSON validation
         * Validates JSON string format
         */
        readonly JSON: RegExp;
        /**
         * Base64 validation
         * Validates Base64 encoded strings
         */
        readonly BASE64: RegExp;
        /**
         * Bitcoin address validation
         * Valid Bitcoin address format
         */
        readonly BITCOIN: RegExp;
        /**
         * Ethereum address validation
         * Valid Ethereum address format
         */
        readonly ETHEREUM: RegExp;
        /**
         * MongoDB ObjectID validation
         * Valid MongoDB ObjectID format
         */
        readonly MONGODB_OBJECTID: RegExp;
    };
    readonly SLUG: {
        /**
         * URL slug format
         * Lowercase letters, numbers, and hyphens
         */
        readonly URL_SLUG: RegExp;
        /**
         * URL slug with underscore support
         * Lowercase letters, numbers, hyphens, and underscores
         */
        readonly URL_SLUG_WITH_UNDERSCORE: RegExp;
        /**
         * Blog post slug
         * Allows numbers, letters, hyphens, and underscores
         */
        readonly BLOG_SLUG: RegExp;
        /**
         * SEO friendly slug
         * Only lowercase letters, numbers, and hyphens
         * Minimum 3 characters
         */
        readonly SEO_SLUG: RegExp;
    };
    readonly FILE_EXTENSION: {
        /**
         * Image file extensions
         * jpg, jpeg, png, gif, webp, svg, bmp, ico
         */
        readonly IMAGE: RegExp;
        /**
         * Document file extensions
         * pdf, doc, docx, xls, xlsx, ppt, pptx, txt, csv, rtf
         */
        readonly DOCUMENT: RegExp;
        /**
         * Video file extensions
         * mp4, avi, mov, wmv, flv, mkv, webm, m4v
         */
        readonly VIDEO: RegExp;
        /**
         * Audio file extensions
         * mp3, wav, ogg, flac, aac, m4a, wma
         */
        readonly AUDIO: RegExp;
        /**
         * Archive file extensions
         * zip, rar, 7z, tar, gz, bz2, tgz, z
         */
        readonly ARCHIVE: RegExp;
        /**
         * Code file extensions
         * js, jsx, ts, tsx, py, java, c, cpp, rb, go, rs, php, html, css, scss, less
         */
        readonly CODE: RegExp;
        /**
         * Executable file extensions
         * exe, msi, app, dmg, deb, rpm
         */
        readonly EXECUTABLE: RegExp;
    };
    readonly SPECIAL_CHARS: {
        /**
         * Contains at least one special character
         * Special characters: !@#$%^&*()_+-=[]{}|;:,.<>?
         */
        readonly CONTAINS_SPECIAL: RegExp;
        /**
         * Contains at least one uppercase letter
         */
        readonly CONTAINS_UPPERCASE: RegExp;
        /**
         * Contains at least one lowercase letter
         */
        readonly CONTAINS_LOWERCASE: RegExp;
        /**
         * Contains at least one number
         */
        readonly CONTAINS_NUMBER: RegExp;
        /**
         * Contains at least one letter
         */
        readonly CONTAINS_LETTER: RegExp;
        /**
         * Contains only letters, numbers, and spaces
         */
        readonly ONLY_LETTERS_NUMBERS_SPACES: RegExp;
        /**
         * Contains only letters and spaces
         */
        readonly ONLY_LETTERS_SPACES: RegExp;
        /**
         * Contains only numbers
         */
        readonly ONLY_NUMBERS: RegExp;
        /**
         * Contains no special characters
         */
        readonly NO_SPECIAL_CHARS: RegExp;
    };
    readonly TEXT: {
        /**
         * HTML tag stripping
         * Removes all HTML tags
         */
        readonly STRIP_HTML_TAGS: RegExp;
        /**
         * Whitespace trimming
         * Removes leading and trailing whitespace
         */
        readonly TRIM_WHITESPACE: RegExp;
        /**
         * Multiple spaces to single space
         * Converts multiple spaces to a single space
         */
        readonly MULTIPLE_SPACES: RegExp;
        /**
         * Line breaks to <br>
         * Converts newlines to HTML line breaks
         */
        readonly LINE_BREAKS: RegExp;
        /**
         * Multiple line breaks to single
         * Converts multiple line breaks to a single line break
         */
        readonly MULTIPLE_LINE_BREAKS: RegExp;
        /**
         * Email extraction
         * Extracts email addresses from text
         */
        readonly EXTRACT_EMAILS: RegExp;
        /**
         * URL extraction
         * Extracts URLs from text
         */
        readonly EXTRACT_URLS: RegExp;
        /**
         * Hashtag extraction
         * Extracts hashtags from text
         */
        readonly EXTRACT_HASHTAGS: RegExp;
        /**
         * Mention extraction
         * Extracts @mentions from text
         */
        readonly EXTRACT_MENTIONS: RegExp;
    };
};
/**
 * Type definitions for regex patterns
 */
export type EmailRegexPattern = (typeof EMAIL_REGEX)[keyof typeof EMAIL_REGEX];
export type PasswordRegexPattern = (typeof PASSWORD_REGEX)[keyof typeof PASSWORD_REGEX];
export type UsernameRegexPattern = (typeof USERNAME_REGEX)[keyof typeof USERNAME_REGEX];
export type PhoneRegexPattern = (typeof PHONE_REGEX)[keyof typeof PHONE_REGEX];
export type UrlRegexPattern = (typeof URL_REGEX)[keyof typeof URL_REGEX];
export type IpRegexPattern = (typeof IP_REGEX)[keyof typeof IP_REGEX];
export type DateRegexPattern = (typeof DATE_REGEX)[keyof typeof DATE_REGEX];
export type CreditCardRegexPattern = (typeof CREDIT_CARD_REGEX)[keyof typeof CREDIT_CARD_REGEX];
export type ValidationRegexPattern = (typeof VALIDATION_REGEX)[keyof typeof VALIDATION_REGEX];
export type SlugRegexPattern = (typeof SLUG_REGEX)[keyof typeof SLUG_REGEX];
export type FileExtensionRegexPattern = (typeof FILE_EXTENSION_REGEX)[keyof typeof FILE_EXTENSION_REGEX];
export type SpecialCharsRegexPattern = (typeof SPECIAL_CHARS_REGEX)[keyof typeof SPECIAL_CHARS_REGEX];
export type TextRegexPattern = (typeof TEXT_REGEX)[keyof typeof TEXT_REGEX];
/**
 * All regex patterns combined for easy import
 */
export declare const ALL_REGEX: {
    /**
     * HTML tag stripping
     * Removes all HTML tags
     */
    readonly STRIP_HTML_TAGS: RegExp;
    /**
     * Whitespace trimming
     * Removes leading and trailing whitespace
     */
    readonly TRIM_WHITESPACE: RegExp;
    /**
     * Multiple spaces to single space
     * Converts multiple spaces to a single space
     */
    readonly MULTIPLE_SPACES: RegExp;
    /**
     * Line breaks to <br>
     * Converts newlines to HTML line breaks
     */
    readonly LINE_BREAKS: RegExp;
    /**
     * Multiple line breaks to single
     * Converts multiple line breaks to a single line break
     */
    readonly MULTIPLE_LINE_BREAKS: RegExp;
    /**
     * Email extraction
     * Extracts email addresses from text
     */
    readonly EXTRACT_EMAILS: RegExp;
    /**
     * URL extraction
     * Extracts URLs from text
     */
    readonly EXTRACT_URLS: RegExp;
    /**
     * Hashtag extraction
     * Extracts hashtags from text
     */
    readonly EXTRACT_HASHTAGS: RegExp;
    /**
     * Mention extraction
     * Extracts @mentions from text
     */
    readonly EXTRACT_MENTIONS: RegExp;
    /**
     * Contains at least one special character
     * Special characters: !@#$%^&*()_+-=[]{}|;:,.<>?
     */
    readonly CONTAINS_SPECIAL: RegExp;
    /**
     * Contains at least one uppercase letter
     */
    readonly CONTAINS_UPPERCASE: RegExp;
    /**
     * Contains at least one lowercase letter
     */
    readonly CONTAINS_LOWERCASE: RegExp;
    /**
     * Contains at least one number
     */
    readonly CONTAINS_NUMBER: RegExp;
    /**
     * Contains at least one letter
     */
    readonly CONTAINS_LETTER: RegExp;
    /**
     * Contains only letters, numbers, and spaces
     */
    readonly ONLY_LETTERS_NUMBERS_SPACES: RegExp;
    /**
     * Contains only letters and spaces
     */
    readonly ONLY_LETTERS_SPACES: RegExp;
    /**
     * Contains only numbers
     */
    readonly ONLY_NUMBERS: RegExp;
    /**
     * Contains no special characters
     */
    readonly NO_SPECIAL_CHARS: RegExp;
    /**
     * Image file extensions
     * jpg, jpeg, png, gif, webp, svg, bmp, ico
     */
    readonly IMAGE: RegExp;
    /**
     * Document file extensions
     * pdf, doc, docx, xls, xlsx, ppt, pptx, txt, csv, rtf
     */
    readonly DOCUMENT: RegExp;
    /**
     * Video file extensions
     * mp4, avi, mov, wmv, flv, mkv, webm, m4v
     */
    readonly VIDEO: RegExp;
    /**
     * Audio file extensions
     * mp3, wav, ogg, flac, aac, m4a, wma
     */
    readonly AUDIO: RegExp;
    /**
     * Archive file extensions
     * zip, rar, 7z, tar, gz, bz2, tgz, z
     */
    readonly ARCHIVE: RegExp;
    /**
     * Code file extensions
     * js, jsx, ts, tsx, py, java, c, cpp, rb, go, rs, php, html, css, scss, less
     */
    readonly CODE: RegExp;
    /**
     * Executable file extensions
     * exe, msi, app, dmg, deb, rpm
     */
    readonly EXECUTABLE: RegExp;
    /**
     * URL slug format
     * Lowercase letters, numbers, and hyphens
     */
    readonly URL_SLUG: RegExp;
    /**
     * URL slug with underscore support
     * Lowercase letters, numbers, hyphens, and underscores
     */
    readonly URL_SLUG_WITH_UNDERSCORE: RegExp;
    /**
     * Blog post slug
     * Allows numbers, letters, hyphens, and underscores
     */
    readonly BLOG_SLUG: RegExp;
    /**
     * SEO friendly slug
     * Only lowercase letters, numbers, and hyphens
     * Minimum 3 characters
     */
    readonly SEO_SLUG: RegExp;
    /**
     * UUID v4 validation
     * Standard UUID format
     */
    readonly UUID: RegExp;
    /**
     * UUID v1, v2, v3, v4, v5 validation
     * All UUID versions
     */
    readonly UUID_ALL: RegExp;
    /**
     * Hexadecimal color code
     * #RRGGBB or #RGB
     */
    readonly HEX_COLOR: RegExp;
    /**
     * RGB color code
     * rgb(0-255, 0-255, 0-255)
     */
    readonly RGB_COLOR: RegExp;
    /**
     * HSL color code
     * hsl(0-360, 0-100%, 0-100%)
     */
    readonly HSL_COLOR: RegExp;
    /**
     * Postal/ZIP code
     * US ZIP code format
     */
    readonly US_ZIP: RegExp;
    /**
     * Postal/ZIP code
     * UK postcode format
     */
    readonly UK_POSTCODE: RegExp;
    /**
     * Canadian postal code
     * Format: A1A 1A1
     */
    readonly CANADA_POSTCODE: RegExp;
    /**
     * HTML tag validation
     * Validates basic HTML tags
     */
    readonly HTML_TAG: RegExp;
    /**
     * JSON validation
     * Validates JSON string format
     */
    readonly JSON: RegExp;
    /**
     * Base64 validation
     * Validates Base64 encoded strings
     */
    readonly BASE64: RegExp;
    /**
     * Bitcoin address validation
     * Valid Bitcoin address format
     */
    readonly BITCOIN: RegExp;
    /**
     * Ethereum address validation
     * Valid Ethereum address format
     */
    readonly ETHEREUM: RegExp;
    /**
     * MongoDB ObjectID validation
     * Valid MongoDB ObjectID format
     */
    readonly MONGODB_OBJECTID: RegExp;
    /**
     * Visa credit card
     * Starts with 4, 13-16 digits
     */
    readonly VISA: RegExp;
    /**
     * Mastercard
     * Starts with 51-55 or 2221-2720, 16 digits
     */
    readonly MASTERCARD: RegExp;
    /**
     * American Express
     * Starts with 34 or 37, 15 digits
     */
    readonly AMERICAN_EXPRESS: RegExp;
    /**
     * Discover
     * Starts with 6011, 622126-622925, 64, 65, 16 digits
     */
    readonly DISCOVER: RegExp;
    /**
     * JCB
     * Starts with 3528-3589, 16 digits
     */
    readonly JCB: RegExp;
    /**
     * Diner's Club
     * Starts with 300-305, 36, 38, 14-19 digits
     */
    readonly DINERS_CLUB: RegExp;
    /**
     * Generic credit card
     * 13-19 digits
     */
    readonly GENERIC: RegExp;
    /**
     * ISO 8601 date format
     * YYYY-MM-DD
     */
    readonly ISO_DATE: RegExp;
    /**
     * ISO 8601 datetime format
     * YYYY-MM-DDThh:mm:ss
     */
    readonly ISO_DATETIME: RegExp;
    /**
     * US date format
     * MM/DD/YYYY
     */
    readonly US_DATE: RegExp;
    /**
     * EU date format
     * DD/MM/YYYY
     */
    readonly EU_DATE: RegExp;
    /**
     * SQL datetime format
     * YYYY-MM-DD HH:MM:SS
     */
    readonly SQL_DATETIME: RegExp;
    /**
     * IPv4 address validation
     * Standard IPv4 format: xxx.xxx.xxx.xxx
     */
    readonly IPV4: RegExp;
    /**
     * IPv6 address validation
     * Standard IPv6 format
     */
    readonly IPV6: RegExp;
    /**
     * CIDR notation validation
     * IPv4 with CIDR: xxx.xxx.xxx.xxx/xx
     */
    readonly CIDR: RegExp;
    /**
     * HTTP/HTTPS URL validation
     * Validates common URL formats
     */
    readonly HTTP: RegExp;
    /**
     * URL with optional protocol
     * Can be http, https, or without protocol
     */
    readonly WITH_OPTIONAL_PROTOCOL: RegExp;
    /**
     * Localhost URL validation
     * For development environments
     */
    readonly LOCALHOST: RegExp;
    /**
     * IP address URL validation
     * Validates URLs with IP addresses
     */
    readonly IP_ADDRESS: RegExp;
    /**
     * International URL validation
     * Supports Unicode characters in domains
     */
    readonly INTERNATIONAL: RegExp;
    /**
     * US phone number format
     * (XXX) XXX-XXXX or XXX-XXX-XXXX or XXXXXXXXXX
     */
    readonly US: RegExp;
    /**
     * Simple phone number validation
     * Digits only, 7-15 characters
     */
    readonly SIMPLE: RegExp;
    /**
     * Phone number with optional country code
     * Supports + and leading zeros
     */
    readonly WITH_COUNTRY_CODE: RegExp;
    /**
     * Indian phone number format
     * 10 digits starting with 6,7,8,9
     */
    readonly INDIA: RegExp;
    /**
     * Alphanumeric username with underscore and hyphen
     * 3-20 characters
     */
    readonly STANDARD: RegExp;
    /**
     * Alphanumeric username only
     * 3-20 characters
     */
    readonly ALPHANUMERIC: RegExp;
    /**
     * Username with only lowercase letters, numbers, and underscore
     * 3-20 characters
     */
    readonly LOWERCASE: RegExp;
    /**
     * Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
     * Strong password validation for maximum security
     */
    readonly STRONG: RegExp;
    /**
     * Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number
     * Medium strength password validation
     */
    readonly MEDIUM: RegExp;
    /**
     * Minimum 8 characters, at least one letter and one number
     * Basic password validation
     */
    readonly BASIC: RegExp;
    /**
     * Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
     * Special characters: @$!%*?&
     */
    readonly COMPLEX: RegExp;
    /**
     * Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
     * Extended special characters: @$!%*?&_-
     */
    readonly EXTENDED: RegExp;
    /**
     * Must contain at least one special character
     * Minimum 8 characters
     */
    readonly WITH_SPECIAL_CHARS: RegExp;
    /**
     * Strict email regex with additional validation
     * Requires domain with at least one dot and valid TLD
     */
    readonly STRICT: RegExp;
    /**
     * Email regex with domain validation
     * Validates domain has valid TLD and structure
     */
    readonly WITH_DOMAIN_VALIDATION: RegExp;
};
//# sourceMappingURL=regex.constants.d.ts.map