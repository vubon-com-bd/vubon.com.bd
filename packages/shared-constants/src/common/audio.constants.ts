export const AUDIO_FORMAT = {
  MP3: 'mp3',
  WAV: 'wav',
  OGG: 'ogg',
  AAC: 'aac',
  FLAC: 'flac',
  M4A: 'm4a',
} as const;

export const AUDIO_MIME = {
  MP3: 'audio/mpeg',
  WAV: 'audio/wav',
  OGG: 'audio/ogg',
  AAC: 'audio/aac',
  FLAC: 'audio/flac',
  M4A: 'audio/mp4',
} as const;

export type AudioFormatType = (typeof AUDIO_FORMAT)[keyof typeof AUDIO_FORMAT];
