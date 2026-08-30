/**
 * Type Constants
 * Common type definitions and type-related constants
 */

/**
 * Generic data types
 */
export const DATA_TYPE = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  ARRAY: 'array',
  OBJECT: 'object',
  NULL: 'null',
  UNDEFINED: 'undefined',
  DATE: 'date',
  DATETIME: 'datetime',
  TIME: 'time',
  TIMESTAMP: 'timestamp',
  BINARY: 'binary',
  JSON: 'json',
  UUID: 'uuid',
  EMAIL: 'email',
  URL: 'url',
  IP: 'ip',
  PHONE: 'phone',
  POSTAL_CODE: 'postal_code',
  CURRENCY: 'currency',
  PERCENTAGE: 'percentage',
  DECIMAL: 'decimal',
  INTEGER: 'integer',
  BIGINT: 'bigint',
  FLOAT: 'float',
  DOUBLE: 'double',
  BYTE: 'byte',
  FILE: 'file',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  DOCUMENT: 'document',
  ENUM: 'enum',
  ANY: 'any',
  UNKNOWN: 'unknown',
  NEVER: 'never',
  VOID: 'void',
} as const;

/**
 * Database column types
 */
export const DB_COLUMN_TYPE = {
  // Numeric types
  TINYINT: 'tinyint',
  SMALLINT: 'smallint',
  MEDIUMINT: 'mediumint',
  INT: 'int',
  BIGINT: 'bigint',
  DECIMAL: 'decimal',
  FLOAT: 'float',
  DOUBLE: 'double',
  REAL: 'real',

  // String types
  CHAR: 'char',
  VARCHAR: 'varchar',
  TEXT: 'text',
  TINYTEXT: 'tinytext',
  MEDIUMTEXT: 'mediumtext',
  LONGTEXT: 'longtext',
  BINARY: 'binary',
  VARBINARY: 'varbinary',
  BLOB: 'blob',
  TINYBLOB: 'tinyblob',
  MEDIUMBLOB: 'mediumblob',
  LONGBLOB: 'longblob',

  // Date and time types
  DATE: 'date',
  DATETIME: 'datetime',
  TIMESTAMP: 'timestamp',
  TIME: 'time',
  YEAR: 'year',

  // JSON types
  JSON: 'json',

  // Spatial types
  GEOMETRY: 'geometry',
  POINT: 'point',
  LINESTRING: 'linestring',
  POLYGON: 'polygon',
  MULTIPOINT: 'multipoint',
  MULTILINESTRING: 'multilinestring',
  MULTIPOLYGON: 'multipolygon',
  GEOMETRYCOLLECTION: 'geometrycollection',

  // Other types
  ENUM: 'enum',
  SET: 'set',
  BOOLEAN: 'boolean',
  UUID: 'uuid',
} as const;

/**
 * MongoDB data types
 */
export const MONGO_DATA_TYPE = {
  STRING: 'String',
  NUMBER: 'Number',
  BOOLEAN: 'Boolean',
  ARRAY: 'Array',
  OBJECT: 'Object',
  DATE: 'Date',
  BUFFER: 'Buffer',
  BINARY: 'Binary',
  MIXED: 'Mixed',
  OBJECT_ID: 'ObjectId',
  DECIMAL_128: 'Decimal128',
  MAP: 'Map',
  TIMESTAMP: 'Timestamp',
  UUID: 'UUID',
} as const;

/**
 * GraphQL data types
 */
export const GRAPHQL_TYPE = {
  ID: 'ID',
  STRING: 'String',
  INT: 'Int',
  FLOAT: 'Float',
  BOOLEAN: 'Boolean',
  DATE: 'Date',
  DATETIME: 'DateTime',
  JSON: 'JSON',
  JSON_OBJECT: 'JSONObject',
  UPLOAD: 'Upload',
} as const;

/**
 * OpenAPI/Swagger data types
 */
export const OPENAPI_TYPE = {
  STRING: 'string',
  NUMBER: 'number',
  INTEGER: 'integer',
  BOOLEAN: 'boolean',
  ARRAY: 'array',
  OBJECT: 'object',
  NULL: 'null',
  ANY: 'any',
} as const;

/**
 * MIME types
 */
export const MIME_TYPE = {
  // Text
  TEXT_PLAIN: 'text/plain',
  TEXT_HTML: 'text/html',
  TEXT_CSS: 'text/css',
  TEXT_JAVASCRIPT: 'text/javascript',
  TEXT_XML: 'text/xml',
  TEXT_CSV: 'text/csv',
  TEXT_MARKDOWN: 'text/markdown',

  // Application
  APPLICATION_JSON: 'application/json',
  APPLICATION_XML: 'application/xml',
  APPLICATION_PDF: 'application/pdf',
  APPLICATION_ZIP: 'application/zip',
  APPLICATION_GZIP: 'application/gzip',
  APPLICATION_WWW_FORM_URLENCODED: 'application/x-www-form-urlencoded',
  APPLICATION_OCTET_STREAM: 'application/octet-stream',
  APPLICATION_MSWORD: 'application/msword',
  APPLICATION_EXCEL: 'application/vnd.ms-excel',
  APPLICATION_POWERPOINT: 'application/vnd.ms-powerpoint',
  APPLICATION_DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  APPLICATION_XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  APPLICATION_PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',

  // Image
  IMAGE_JPEG: 'image/jpeg',
  IMAGE_PNG: 'image/png',
  IMAGE_GIF: 'image/gif',
  IMAGE_BMP: 'image/bmp',
  IMAGE_WEBP: 'image/webp',
  IMAGE_SVG: 'image/svg+xml',
  IMAGE_TIFF: 'image/tiff',
  IMAGE_ICO: 'image/x-icon',
  IMAGE_AVIF: 'image/avif',

  // Audio
  AUDIO_MPEG: 'audio/mpeg',
  AUDIO_WAV: 'audio/wav',
  AUDIO_AAC: 'audio/aac',
  AUDIO_FLAC: 'audio/flac',
  AUDIO_OGG: 'audio/ogg',
  AUDIO_WMA: 'audio/x-ms-wma',
  AUDIO_M4A: 'audio/m4a',

  // Video
  VIDEO_MP4: 'video/mp4',
  VIDEO_AVI: 'video/x-msvideo',
  VIDEO_MOV: 'video/quicktime',
  VIDEO_WMV: 'video/x-ms-wmv',
  VIDEO_FLV: 'video/x-flv',
  VIDEO_MKV: 'video/x-matroska',
  VIDEO_WEBM: 'video/webm',
  VIDEO_3GPP: 'video/3gpp',
  VIDEO_MPEG: 'video/mpeg',

  // Font
  FONT_TTF: 'font/ttf',
  FONT_OTF: 'font/otf',
  FONT_WOFF: 'font/woff',
  FONT_WOFF2: 'font/woff2',

  // Form data
  MULTIPART_FORM_DATA: 'multipart/form-data',
} as const;

/**
 * File extensions mapping
 */
export const FILE_EXTENSION = {
  // Text
  TXT: 'txt',
  HTML: 'html',
  HTM: 'htm',
  CSS: 'css',
  JS: 'js',
  MJS: 'mjs',
  TS: 'ts',
  TSX: 'tsx',
  JSX: 'jsx',
  XML: 'xml',
  CSV: 'csv',
  MD: 'md',
  MARKDOWN: 'markdown',

  // Application
  JSON: 'json',
  PDF: 'pdf',
  ZIP: 'zip',
  GZ: 'gz',
  TAR: 'tar',
  RAR: 'rar',
  DOC: 'doc',
  DOCX: 'docx',
  XLS: 'xls',
  XLSX: 'xlsx',
  PPT: 'ppt',
  PPTX: 'pptx',

  // Image
  JPG: 'jpg',
  JPEG: 'jpeg',
  PNG: 'png',
  GIF: 'gif',
  BMP: 'bmp',
  WEBP: 'webp',
  SVG: 'svg',
  TIFF: 'tiff',
  TIF: 'tif',
  ICO: 'ico',
  AVIF: 'avif',

  // Audio
  MP3: 'mp3',
  WAV: 'wav',
  AAC: 'aac',
  FLAC: 'flac',
  OGG: 'ogg',
  WMA: 'wma',
  M4A: 'm4a',

  // Video
  MP4: 'mp4',
  AVI: 'avi',
  MOV: 'mov',
  WMV: 'wmv',
  FLV: 'flv',
  MKV: 'mkv',
  WEBM: 'webm',
  M4V: 'm4v',
  MPEG: 'mpeg',
  MPG: 'mpg',
  THREE_GP: '3gp',

  // Font
  TTF: 'ttf',
  OTF: 'otf',
  WOFF: 'woff',
  WOFF2: 'woff2',

  // Config
  ENV: 'env',
  YAML: 'yaml',
  YML: 'yml',
  TOML: 'toml',
  INI: 'ini',
  CONF: 'conf',

  // Source code
  PY: 'py',
  JAVA: 'java',
  C: 'c',
  CPP: 'cpp',
  H: 'h',
  HPP: 'hpp',
  GO: 'go',
  RB: 'rb',
  PHP: 'php',
  R: 'r',
} as const;

/**
 * Content encoding types
 */
export const CONTENT_ENCODING = {
  GZIP: 'gzip',
  DEFLATE: 'deflate',
  BR: 'br',
  ZSTD: 'zstd',
  IDENTITY: 'identity',
} as const;

/**
 * Language types
 */
export const LANGUAGE_TYPE = {
  BENGALI: 'bn',
  BENGALI_BD: 'bn-BD',
  ENGLISH: 'en',
  ENGLISH_US: 'en-US',
  ENGLISH_UK: 'en-GB',
  ARABIC: 'ar',
  HINDI: 'hi',
  URDU: 'ur',
  SPANISH: 'es',
  FRENCH: 'fr',
  GERMAN: 'de',
  ITALIAN: 'it',
  PORTUGUESE: 'pt',
  RUSSIAN: 'ru',
  JAPANESE: 'ja',
  KOREAN: 'ko',
  CHINESE_SIMPLIFIED: 'zh-CN',
  CHINESE_TRADITIONAL: 'zh-TW',
} as const;

/**
 * Country types
 */
export const COUNTRY_TYPE = {
  BANGLADESH: 'BD',
  USA: 'US',
  UK: 'GB',
  CANADA: 'CA',
  AUSTRALIA: 'AU',
  INDIA: 'IN',
  PAKISTAN: 'PK',
  UAE: 'AE',
  SAUDI_ARABIA: 'SA',
  SINGAPORE: 'SG',
  MALAYSIA: 'MY',
  THAILAND: 'TH',
  INDONESIA: 'ID',
  PHILIPPINES: 'PH',
  VIETNAM: 'VN',
} as const;

/**
 * Currency types
 */
export const CURRENCY_TYPE = {
  BDT: 'BDT',
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  CAD: 'CAD',
  AUD: 'AUD',
  INR: 'INR',
  PKR: 'PKR',
  AED: 'AED',
  SAR: 'SAR',
  SGD: 'SGD',
  MYR: 'MYR',
  THB: 'THB',
  IDR: 'IDR',
  PHP: 'PHP',
  VND: 'VND',
  JPY: 'JPY',
  KRW: 'KRW',
  CNY: 'CNY',
} as const;

/**
 * Timezone types
 */
export const TIMEZONE_TYPE = {
  UTC: 'UTC',
  BANGLADESH: 'Asia/Dhaka',
  USA_EASTERN: 'America/New_York',
  USA_CENTRAL: 'America/Chicago',
  USA_MOUNTAIN: 'America/Denver',
  USA_PACIFIC: 'America/Los_Angeles',
  UK: 'Europe/London',
  EUROPE_CENTRAL: 'Europe/Paris',
  EUROPE_EASTERN: 'Europe/Bucharest',
  INDIA: 'Asia/Kolkata',
  PAKISTAN: 'Asia/Karachi',
  UAE: 'Asia/Dubai',
  SAUDI_ARABIA: 'Asia/Riyadh',
  SINGAPORE: 'Asia/Singapore',
  MALAYSIA: 'Asia/Kuala_Lumpur',
  THAILAND: 'Asia/Bangkok',
  INDONESIA: 'Asia/Jakarta',
  PHILIPPINES: 'Asia/Manila',
  VIETNAM: 'Asia/Ho_Chi_Minh',
  JAPAN: 'Asia/Tokyo',
  KOREA: 'Asia/Seoul',
  CHINA: 'Asia/Shanghai',
  AUSTRALIA_EASTERN: 'Australia/Sydney',
  AUSTRALIA_WESTERN: 'Australia/Perth',
  NEW_ZEALAND: 'Pacific/Auckland',
} as const;

/**
 * Sort order types
 */
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
} as const;

/**
 * Sort by types
 */
export const SORT_BY = {
  ID: 'id',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  DELETED_AT: 'deletedAt',
  NAME: 'name',
  TITLE: 'title',
  DESCRIPTION: 'description',
  STATUS: 'status',
  TYPE: 'type',
  PRIORITY: 'priority',
  PRICE: 'price',
  DISCOUNT: 'discount',
  RATING: 'rating',
  RELEVANCE: 'relevance',
  POPULARITY: 'popularity',
  DATE: 'date',
  TIME: 'time',
} as const;

/**
 * Connection types
 */
export const CONNECTION_TYPE = {
  WIRELESS: 'wireless',
  WIRED: 'wired',
  BLUETOOTH: 'bluetooth',
  CELLULAR: 'cellular',
  ETHERNET: 'ethernet',
  WIFI: 'wifi',
  DATA: 'data',
} as const;

/**
 * Check if value is of a specific type
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Check if value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Check if value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Check if value is an array
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Check if value is an object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Check if value is null
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * Check if value is undefined
 */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 */
export function isEmpty(value: unknown): boolean {
  if (isNull(value) || isUndefined(value)) {
    return true;
  }
  if (isString(value)) {
    return value.trim().length === 0;
  }
  if (isArray(value)) {
    return value.length === 0;
  }
  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }
  return false;
}

/**
 * Check if value is a valid UUID
 */
export function isUUID(value: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

/**
 * Check if value is a valid email
 */
export function isEmail(value: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value);
}

/**
 * Check if value is a valid URL
 */
export function isURL(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if value is a valid date
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/**
 * Check if value is a valid ISO date string
 */
export function isISODateString(value: string): boolean {
  const date = new Date(value);
  return !isNaN(date.getTime());
}

/**
 * Check if value is a valid JSON string
 */
export function isJSONString(value: string): boolean {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get type of value as string
 */
export function getType(value: unknown): string {
  if (isNull(value)) {
    return DATA_TYPE.NULL;
  }
  if (isUndefined(value)) {
    return DATA_TYPE.UNDEFINED;
  }
  if (isString(value)) {
    return DATA_TYPE.STRING;
  }
  if (isNumber(value)) {
    return DATA_TYPE.NUMBER;
  }
  if (isBoolean(value)) {
    return DATA_TYPE.BOOLEAN;
  }
  if (isArray(value)) {
    return DATA_TYPE.ARRAY;
  }
  if (isObject(value)) {
    return DATA_TYPE.OBJECT;
  }
  if (isDate(value)) {
    return DATA_TYPE.DATE;
  }
  return DATA_TYPE.UNKNOWN;
}

/**
 * Get MIME type from file extension
 */
export function getMimeTypeFromExtension(extension: string): string | undefined {
  const mimeTypeMap: Record<string, string> = {
    [FILE_EXTENSION.TXT]: MIME_TYPE.TEXT_PLAIN,
    [FILE_EXTENSION.HTML]: MIME_TYPE.TEXT_HTML,
    [FILE_EXTENSION.CSS]: MIME_TYPE.TEXT_CSS,
    [FILE_EXTENSION.JS]: MIME_TYPE.TEXT_JAVASCRIPT,
    [FILE_EXTENSION.JSON]: MIME_TYPE.APPLICATION_JSON,
    [FILE_EXTENSION.PDF]: MIME_TYPE.APPLICATION_PDF,
    [FILE_EXTENSION.JPG]: MIME_TYPE.IMAGE_JPEG,
    [FILE_EXTENSION.JPEG]: MIME_TYPE.IMAGE_JPEG,
    [FILE_EXTENSION.PNG]: MIME_TYPE.IMAGE_PNG,
    [FILE_EXTENSION.GIF]: MIME_TYPE.IMAGE_GIF,
    [FILE_EXTENSION.WEBP]: MIME_TYPE.IMAGE_WEBP,
    [FILE_EXTENSION.SVG]: MIME_TYPE.IMAGE_SVG,
    [FILE_EXTENSION.MP3]: MIME_TYPE.AUDIO_MPEG,
    [FILE_EXTENSION.MP4]: MIME_TYPE.VIDEO_MP4,
    [FILE_EXTENSION.ZIP]: MIME_TYPE.APPLICATION_ZIP,
  };

  return mimeTypeMap[extension.toLowerCase()];
}

/**
 * Get file extension from MIME type
 */
export function getExtensionFromMimeType(mimeType: string): string | undefined {
  const extensionMap: Record<string, string> = {
    [MIME_TYPE.TEXT_PLAIN]: FILE_EXTENSION.TXT,
    [MIME_TYPE.TEXT_HTML]: FILE_EXTENSION.HTML,
    [MIME_TYPE.TEXT_CSS]: FILE_EXTENSION.CSS,
    [MIME_TYPE.TEXT_JAVASCRIPT]: FILE_EXTENSION.JS,
    [MIME_TYPE.APPLICATION_JSON]: FILE_EXTENSION.JSON,
    [MIME_TYPE.APPLICATION_PDF]: FILE_EXTENSION.PDF,
    [MIME_TYPE.IMAGE_JPEG]: FILE_EXTENSION.JPEG,
    [MIME_TYPE.IMAGE_PNG]: FILE_EXTENSION.PNG,
    [MIME_TYPE.IMAGE_GIF]: FILE_EXTENSION.GIF,
    [MIME_TYPE.IMAGE_WEBP]: FILE_EXTENSION.WEBP,
    [MIME_TYPE.IMAGE_SVG]: FILE_EXTENSION.SVG,
    [MIME_TYPE.AUDIO_MPEG]: FILE_EXTENSION.MP3,
    [MIME_TYPE.VIDEO_MP4]: FILE_EXTENSION.MP4,
    [MIME_TYPE.APPLICATION_ZIP]: FILE_EXTENSION.ZIP,
  };

  return extensionMap[mimeType];
}

/**
 * Check if file extension is allowed
 */
export function isAllowedFileExtension(extension: string, allowedExtensions: string[]): boolean {
  return allowedExtensions.includes(extension.toLowerCase());
}

/**
 * Check if MIME type is allowed
 */
export function isAllowedMimeType(mimeType: string, allowedMimeTypes: string[]): boolean {
  return allowedMimeTypes.includes(mimeType);
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
}

/**
 * Get filename without extension
 */
export function getFilenameWithoutExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.');
  return lastDotIndex > 0 ? filename.substring(0, lastDotIndex) : filename;
}
