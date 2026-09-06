/**
 * Audio Constants
 * @module shared-constants/common/audio.constants
 */

export const AUDIO = {
  // Audio formats
  FORMATS: {
    MP3: 'mp3',
    WAV: 'wav',
    OGG: 'ogg',
    AAC: 'aac',
    FLAC: 'flac',
    WMA: 'wma',
    M4A: 'm4a',
    OPUS: 'opus',
  } as const,

  // Audio bitrates (kbps)
  BITRATES: {
    LOW: 32,
    MEDIUM: 128,
    HIGH: 192,
    VERY_HIGH: 320,
    LOSSLESS: 1411,
  } as const,

  // Audio sample rates (Hz)
  SAMPLE_RATES: {
    LOW: 8000,
    MEDIUM: 22050,
    HIGH: 44100,
    VERY_HIGH: 48000,
    STUDIO: 96000,
  } as const,

  // Audio channels
  CHANNELS: {
    MONO: 1,
    STEREO: 2,
    SURROUND: 6,
    ATMOS: 8,
  } as const,

  // Audio codecs
  CODECS: {
    MP3: 'mp3',
    AAC: 'aac',
    VORBIS: 'vorbis',
    OPUS: 'opus',
    FLAC: 'flac',
    WAV: 'wav',
    ALAC: 'alac',
  } as const,

  // Audio quality levels
  QUALITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
    STUDIO: 'studio',
  } as const,

  // Audio settings
  SETTINGS: {
    MAX_DURATION: 3600, // 1 hour
    MIN_DURATION: 1,
    MAX_FILE_SIZE_MB: 50,
    ALLOWED_EXTENSIONS: ['mp3', 'wav', 'ogg', 'aac', 'flac', 'wma', 'm4a', 'opus'],
    ALLOWED_MIME_TYPES: [
      'audio/mpeg',
      'audio/wav',
      'audio/ogg',
      'audio/aac',
      'audio/flac',
      'audio/x-ms-wma',
      'audio/mp4',
      'audio/opus',
    ],
    DEFAULT_BITRATE: 128,
    DEFAULT_SAMPLE_RATE: 44100,
    DEFAULT_CHANNELS: 2,
    DEFAULT_QUALITY: 'high',
  },

  // Audio processing
  PROCESSING: {
    NORMALIZE: true,
    COMPRESS: false,
    EQUALIZE: false,
    REMOVE_SILENCE: false,
    AUTO_GAIN: false,
    NOISE_REDUCTION: false,
  },

  // Default values
  DEFAULT: {
    FORMAT: 'mp3',
    BITRATE: 128,
    SAMPLE_RATE: 44100,
    CHANNELS: 2,
    QUALITY: 'high',
  },
} as const;

export type AudioFormat = (typeof AUDIO.FORMATS)[keyof typeof AUDIO.FORMATS];
export type AudioBitrate = (typeof AUDIO.BITRATES)[keyof typeof AUDIO.BITRATES];
export type AudioSampleRate = (typeof AUDIO.SAMPLE_RATES)[keyof typeof AUDIO.SAMPLE_RATES];
export type AudioChannel = (typeof AUDIO.CHANNELS)[keyof typeof AUDIO.CHANNELS];
export type AudioCodec = (typeof AUDIO.CODECS)[keyof typeof AUDIO.CODECS];
export type AudioQuality = (typeof AUDIO.QUALITY)[keyof typeof AUDIO.QUALITY];
