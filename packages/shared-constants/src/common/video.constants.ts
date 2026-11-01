export const VIDEO_FORMAT = {
  MP4: 'mp4',
  WEBM: 'webm',
  MOV: 'mov',
  AVI: 'avi',
  MKV: 'mkv',
} as const;

export const VIDEO_MIME = {
  MP4: 'video/mp4',
  WEBM: 'video/webm',
  MOV: 'video/quicktime',
  AVI: 'video/x-msvideo',
  MKV: 'video/x-matroska',
} as const;

export type VideoFormatType = (typeof VIDEO_FORMAT)[keyof typeof VIDEO_FORMAT];
