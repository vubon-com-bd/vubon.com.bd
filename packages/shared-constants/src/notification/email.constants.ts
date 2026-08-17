// ============================================
// ইমেইল সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. ইমেইল মৌলিক কনফিগারেশন
// ============================================

/**
 * সর্বোচ্চ ইমেইল সাইজ (বাইটে)
 * @default 26214400 (২৫MB)
 */
export const EMAIL_MAX_SIZE = 25 * 1024 * 1024;

/**
 * সর্বোচ্চ ইমেইল বডি সাইজ (বাইটে)
 * @default 10485760 (১০MB)
 */
export const EMAIL_MAX_BODY_SIZE = 10 * 1024 * 1024;

/**
 * ডিফল্ট ইমেইল চারসেট
 * @default 'UTF-8'
 */
export const EMAIL_DEFAULT_CHARSET = 'UTF-8';

/**
 * ডিফল্ট ইমেইল ফরম্যাট
 * @default 'HTML'
 */
export const EMAIL_DEFAULT_FORMAT = 'HTML';

/**
 * ডিফল্ট ইমেইল ভাষা
 * @default 'en'
 */
export const EMAIL_DEFAULT_LANGUAGE = 'en';

/**
 * ইমেইল এক্সপাইরি সময় (মিলিসেকেন্ডে)
 * @default 604800000 (৭ দিন)
 */
export const EMAIL_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000;

/**
 * ইমেইল রিট্রাই লিমিট
 * @default 3
 */
export const EMAIL_RETRY_LIMIT = 3;

/**
 * ইমেইল রিট্রাই ডেলায় (মিলিসেকেন্ডে)
 * @default 300000 (৫ মিনিট)
 */
export const EMAIL_RETRY_DELAY = 5 * 60 * 1000;

/**
 * ইমেইল ব্যাচ সাইজ
 * @default 100
 */
export const EMAIL_BATCH_SIZE = 100;

/**
 * ইমেইল টাইমআউট (মিলিসেকেন্ডে)
 * @default 30000 (৩০ সেকেন্ড)
 */
export const EMAIL_TIMEOUT = 30000;

/**
 * ইমেইল কানেকশন টাইমআউট (মিলিসেকেন্ডে)
 * @default 10000 (১০ সেকেন্ড)
 */
export const EMAIL_CONNECTION_TIMEOUT = 10000;

// ============================================
// ২. ইমেইল ফরম্যাট
// ============================================

/**
 * ইমেইল ফরম্যাট টাইপ
 */
export type EmailFormat =
  typeof EMAIL_FORMAT_HTML | typeof EMAIL_FORMAT_PLAIN | typeof EMAIL_FORMAT_HTML_AND_PLAIN;

/**
 * HTML ফরম্যাট
 * @description HTML ফরম্যাটে ইমেইল
 */
export const EMAIL_FORMAT_HTML = 'HTML';

/**
 * PLAIN ফরম্যাট
 * @description প্লেইন টেক্সট ফরম্যাটে ইমেইল
 */
export const EMAIL_FORMAT_PLAIN = 'PLAIN';

/**
 * HTML_AND_PLAIN ফরম্যাট
 * @description HTML এবং প্লেইন টেক্সট উভয় ফরম্যাটে ইমেইল
 */
export const EMAIL_FORMAT_HTML_AND_PLAIN = 'HTML_AND_PLAIN';

// ============================================
// ৩. ইমেইল চারসেট
// ============================================

/**
 * ইমেইল চারসেট টাইপ
 */
export type EmailCharset =
  | typeof EMAIL_CHARSET_UTF_8
  | typeof EMAIL_CHARSET_ISO_8859_1
  | typeof EMAIL_CHARSET_ISO_8859_15
  | typeof EMAIL_CHARSET_WINDOWS_1252
  | typeof EMAIL_CHARSET_WINDOWS_1256
  | typeof EMAIL_CHARSET_ASCII;

/**
 * UTF-8 চারসেট
 */
export const EMAIL_CHARSET_UTF_8 = 'UTF-8';

/**
 * ISO-8859-1 চারসেট
 */
export const EMAIL_CHARSET_ISO_8859_1 = 'ISO-8859-1';

/**
 * ISO-8859-15 চারসেট
 */
export const EMAIL_CHARSET_ISO_8859_15 = 'ISO-8859-15';

/**
 * Windows-1252 চারসেট
 */
export const EMAIL_CHARSET_WINDOWS_1252 = 'Windows-1252';

/**
 * Windows-1256 চারসেট
 */
export const EMAIL_CHARSET_WINDOWS_1256 = 'Windows-1256';

/**
 * ASCII চারসেট
 */
export const EMAIL_CHARSET_ASCII = 'ASCII';

// ============================================
// ৪. সাপোর্টেড অ্যাটাচমেন্ট ফরম্যাট
// ============================================

/**
 * অ্যাটাচমেন্ট ফরম্যাট টাইপ
 */
export type EmailAttachmentFormat =
  | typeof EMAIL_ATTACHMENT_FORMAT_PDF
  | typeof EMAIL_ATTACHMENT_FORMAT_IMAGE
  | typeof EMAIL_ATTACHMENT_FORMAT_DOCUMENT
  | typeof EMAIL_ATTACHMENT_FORMAT_SPREADSHEET
  | typeof EMAIL_ATTACHMENT_FORMAT_PRESENTATION
  | typeof EMAIL_ATTACHMENT_FORMAT_ARCHIVE
  | typeof EMAIL_ATTACHMENT_FORMAT_TEXT;

/**
 * PDF ফরম্যাট
 */
export const EMAIL_ATTACHMENT_FORMAT_PDF = 'PDF';

/**
 * ইমেজ ফরম্যাট
 */
export const EMAIL_ATTACHMENT_FORMAT_IMAGE = 'IMAGE';

/**
 * ডকুমেন্ট ফরম্যাট
 */
export const EMAIL_ATTACHMENT_FORMAT_DOCUMENT = 'DOCUMENT';

/**
 * স্প্রেডশীট ফরম্যাট
 */
export const EMAIL_ATTACHMENT_FORMAT_SPREADSHEET = 'SPREADSHEET';

/**
 * প্রেজেন্টেশন ফরম্যাট
 */
export const EMAIL_ATTACHMENT_FORMAT_PRESENTATION = 'PRESENTATION';

/**
 * আর্কাইভ ফরম্যাট
 */
export const EMAIL_ATTACHMENT_FORMAT_ARCHIVE = 'ARCHIVE';

/**
 * টেক্সট ফরম্যাট
 */
export const EMAIL_ATTACHMENT_FORMAT_TEXT = 'TEXT';

// ============================================
// ৫. সাপোর্টেড অ্যাটাচমেন্ট এক্সটেনশন
// ============================================

/**
 * অ্যাটাচমেন্ট এক্সটেনশন
 */
export const EMAIL_ATTACHMENT_EXTENSIONS: Record<EmailAttachmentFormat, string[]> = {
  [EMAIL_ATTACHMENT_FORMAT_PDF]: ['pdf'],
  [EMAIL_ATTACHMENT_FORMAT_IMAGE]: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'tiff'],
  [EMAIL_ATTACHMENT_FORMAT_DOCUMENT]: ['doc', 'docx', 'odt', 'rtf'],
  [EMAIL_ATTACHMENT_FORMAT_SPREADSHEET]: ['xls', 'xlsx', 'ods', 'csv'],
  [EMAIL_ATTACHMENT_FORMAT_PRESENTATION]: ['ppt', 'pptx', 'odp'],
  [EMAIL_ATTACHMENT_FORMAT_ARCHIVE]: ['zip', 'rar', '7z', 'tar', 'gz'],
  [EMAIL_ATTACHMENT_FORMAT_TEXT]: ['txt', 'log', 'xml', 'json', 'yaml', 'yml', 'md'],
};

/**
 * সর্বোচ্চ অ্যাটাচমেন্ট সাইজ (বাইটে)
 * @default 10485760 (১০MB)
 */
export const EMAIL_MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024;

/**
 * সর্বোচ্চ অ্যাটাচমেন্ট সংখ্যা
 * @default 10
 */
export const EMAIL_MAX_ATTACHMENTS = 10;

// ============================================
// ৬. ইমেইল হেডার
// ============================================

/**
 * ইমেইল হেডার টাইপ
 */
export type EmailHeaderType =
  | typeof EMAIL_HEADER_FROM
  | typeof EMAIL_HEADER_TO
  | typeof EMAIL_HEADER_CC
  | typeof EMAIL_HEADER_BCC
  | typeof EMAIL_HEADER_SUBJECT
  | typeof EMAIL_HEADER_REPLY_TO
  | typeof EMAIL_HEADER_DATE
  | typeof EMAIL_HEADER_MESSAGE_ID
  | typeof EMAIL_HEADER_CONTENT_TYPE
  | typeof EMAIL_HEADER_CONTENT_DISPOSITION
  | typeof EMAIL_HEADER_CONTENT_TRANSFER_ENCODING
  | typeof EMAIL_HEADER_MIME_VERSION
  | typeof EMAIL_HEADER_PRIORITY
  | typeof EMAIL_HEADER_X_PRIORITY
  | typeof EMAIL_HEADER_IN_REPLY_TO
  | typeof EMAIL_HEADER_REFERENCES
  | typeof EMAIL_HEADER_LIST_UNSUBSCRIBE
  | typeof EMAIL_HEADER_X_MAILER;

/**
 * From হেডার
 */
export const EMAIL_HEADER_FROM = 'From';

/**
 * To হেডার
 */
export const EMAIL_HEADER_TO = 'To';

/**
 * CC হেডার
 */
export const EMAIL_HEADER_CC = 'Cc';

/**
 * BCC হেডার
 */
export const EMAIL_HEADER_BCC = 'Bcc';

/**
 * Subject হেডার
 */
export const EMAIL_HEADER_SUBJECT = 'Subject';

/**
 * Reply-To হেডার
 */
export const EMAIL_HEADER_REPLY_TO = 'Reply-To';

/**
 * Date হেডার
 */
export const EMAIL_HEADER_DATE = 'Date';

/**
 * Message-ID হেডার
 */
export const EMAIL_HEADER_MESSAGE_ID = 'Message-ID';

/**
 * Content-Type হেডার
 */
export const EMAIL_HEADER_CONTENT_TYPE = 'Content-Type';

/**
 * Content-Disposition হেডার
 */
export const EMAIL_HEADER_CONTENT_DISPOSITION = 'Content-Disposition';

/**
 * Content-Transfer-Encoding হেডার
 */
export const EMAIL_HEADER_CONTENT_TRANSFER_ENCODING = 'Content-Transfer-Encoding';

/**
 * MIME-Version হেডার
 */
export const EMAIL_HEADER_MIME_VERSION = 'MIME-Version';

/**
 * Priority হেডার
 */
export const EMAIL_HEADER_PRIORITY = 'Priority';

/**
 * X-Priority হেডার
 */
export const EMAIL_HEADER_X_PRIORITY = 'X-Priority';

/**
 * In-Reply-To হেডার
 */
export const EMAIL_HEADER_IN_REPLY_TO = 'In-Reply-To';

/**
 * References হেডার
 */
export const EMAIL_HEADER_REFERENCES = 'References';

/**
 * List-Unsubscribe হেডার
 */
export const EMAIL_HEADER_LIST_UNSUBSCRIBE = 'List-Unsubscribe';

/**
 * X-Mailer হেডার
 */
export const EMAIL_HEADER_X_MAILER = 'X-Mailer';

// ============================================
// ৭. ডিফল্ট ইমেইল হেডার
// ============================================

/**
 * ডিফল্ট ইমেইল হেডার মান
 */
export const EMAIL_DEFAULT_HEADERS = {
  [EMAIL_HEADER_MIME_VERSION]: '1.0',
  [EMAIL_HEADER_CONTENT_TRANSFER_ENCODING]: '7bit',
  [EMAIL_HEADER_X_MAILER]: 'VubonMailer',
  [EMAIL_HEADER_CONTENT_TYPE]: 'text/html; charset=UTF-8',
};

// ============================================
// ৮. ইমেইল প্রায়োরিটি
// ============================================

/**
 * ইমেইল প্রায়োরিটি লেভেল
 */
export type EmailPriority =
  | typeof EMAIL_PRIORITY_HIGHEST
  | typeof EMAIL_PRIORITY_HIGH
  | typeof EMAIL_PRIORITY_NORMAL
  | typeof EMAIL_PRIORITY_LOW
  | typeof EMAIL_PRIORITY_LOWEST;

/**
 * সর্বোচ্চ প্রায়োরিটি
 */
export const EMAIL_PRIORITY_HIGHEST = 'HIGHEST';

/**
 * উচ্চ প্রায়োরিটি
 */
export const EMAIL_PRIORITY_HIGH = 'HIGH';

/**
 * স্বাভাবিক প্রায়োরিটি
 */
export const EMAIL_PRIORITY_NORMAL = 'NORMAL';

/**
 * নিম্ন প্রায়োরিটি
 */
export const EMAIL_PRIORITY_LOW = 'LOW';

/**
 * সর্বনিম্ন প্রায়োরিটি
 */
export const EMAIL_PRIORITY_LOWEST = 'LOWEST';

/**
 * ইমেইল প্রায়োরিটি মান (সংখ্যাসূচক)
 */
export const EMAIL_PRIORITY_VALUES: Record<EmailPriority, number> = {
  [EMAIL_PRIORITY_HIGHEST]: 1,
  [EMAIL_PRIORITY_HIGH]: 2,
  [EMAIL_PRIORITY_NORMAL]: 3,
  [EMAIL_PRIORITY_LOW]: 4,
  [EMAIL_PRIORITY_LOWEST]: 5,
};

// ============================================
// ৯. ইমেইল কনফিগারেশন
// ============================================

/**
 * ইমেইল কনফিগারেশন ইন্টারফেস
 */
export interface EmailConfig {
  /** সর্বোচ্চ ইমেইল সাইজ */
  maxSize: number;
  /** সর্বোচ্চ ইমেইল বডি সাইজ */
  maxBodySize: number;
  /** ডিফল্ট চারসেট */
  defaultCharset: string;
  /** ডিফল্ট ফরম্যাট */
  defaultFormat: EmailFormat;
  /** ডিফল্ট ভাষা */
  defaultLanguage: string;
  /** এক্সপাইরি সময় */
  expiryTime: number;
  /** রিট্রাই লিমিট */
  retryLimit: number;
  /** রিট্রাই ডেলায় */
  retryDelay: number;
  /** ব্যাচ সাইজ */
  batchSize: number;
  /** টাইমআউট */
  timeout: number;
  /** কানেকশন টাইমআউট */
  connectionTimeout: number;
  /** সর্বোচ্চ অ্যাটাচমেন্ট সাইজ */
  maxAttachmentSize: number;
  /** সর্বোচ্চ অ্যাটাচমেন্ট সংখ্যা */
  maxAttachments: number;
  /** ডিফল্ট হেডার */
  defaultHeaders: Record<string, string>;
}

/**
 * ডিফল্ট ইমেইল কনফিগারেশন
 */
export const EMAIL_DEFAULT_CONFIG: EmailConfig = {
  maxSize: EMAIL_MAX_SIZE,
  maxBodySize: EMAIL_MAX_BODY_SIZE,
  defaultCharset: EMAIL_DEFAULT_CHARSET,
  defaultFormat: EMAIL_DEFAULT_FORMAT,
  defaultLanguage: EMAIL_DEFAULT_LANGUAGE,
  expiryTime: EMAIL_EXPIRY_TIME,
  retryLimit: EMAIL_RETRY_LIMIT,
  retryDelay: EMAIL_RETRY_DELAY,
  batchSize: EMAIL_BATCH_SIZE,
  timeout: EMAIL_TIMEOUT,
  connectionTimeout: EMAIL_CONNECTION_TIMEOUT,
  maxAttachmentSize: EMAIL_MAX_ATTACHMENT_SIZE,
  maxAttachments: EMAIL_MAX_ATTACHMENTS,
  defaultHeaders: EMAIL_DEFAULT_HEADERS,
};
