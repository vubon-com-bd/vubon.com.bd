export const IMAGE_FORMAT = {
  JPEG: 'jpeg',
  JPG: 'jpg',
  PNG: 'png',
  GIF: 'gif',
  WEBP: 'webp',
  SVG: 'svg',
  BMP: 'bmp',
  AVIF: 'avif',
} as const;

export const IMAGE_MIME = {
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  GIF: 'image/gif',
  WEBP: 'image/webp',
  SVG: 'image/svg+xml',
  AVIF: 'image/avif',
} as const;

export type ImageFormatType = (typeof IMAGE_FORMAT)[keyof typeof IMAGE_FORMAT];
