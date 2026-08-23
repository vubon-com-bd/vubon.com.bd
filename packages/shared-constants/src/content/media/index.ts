/**
 * Media Constants Index
 * Export all media constants and types for easy importing
 */

// Media Constants
export {
  CONTENT_MEDIA,
  contentMediaGetTypeLabel,
  contentMediaGetStatusLabel,
  contentMediaGetFormatLabel,
  contentMediaGetMimeType,
  contentMediaGetSizeCategoryLabel,
  contentMediaGetDimension,
  contentMediaGetSizeLimit,
  contentMediaIsImage,
  contentMediaIsVideo,
  contentMediaIsAudio,
  contentMediaIsDocument,
  contentMediaIsArchive,
  contentMediaIsValidType,
  contentMediaIsValidStatus,
  contentMediaIsValidFormat,
  contentMediaGetDefaultQuality,
  contentMediaGetDefaultMaxWidth,
  contentMediaGetDefaultMaxHeight,
  contentMediaGetThumbnailWidth,
  contentMediaGetThumbnailHeight,
  contentMediaGetMaxFilenameLength,
  contentMediaGetMaxFileSizeGB,
  contentMediaGetMaxUploadBatch,
} from './media.constants';

export type {
  ContentMediaType,
  ContentMediaStatus,
  ContentMediaFormat,
  ContentMediaMimeType,
} from './media.constants';

// Media Type Constants
export {
  CONTENT_MEDIA_TYPE,
  contentMediaTypeGetCategoryLabel,
  contentMediaTypeGetUsageLabel,
  contentMediaTypeGetSourceLabel,
  contentMediaTypeGetLicenseLabel,
  contentMediaTypeGetQualityLabel,
  contentMediaTypeIsValidCategory,
  contentMediaTypeIsValidUsage,
} from './media-type.constants';

export type {
  ContentMediaTypeCategory,
  ContentMediaTypeUsage,
  ContentMediaTypeSource,
  ContentMediaTypeLicense,
  ContentMediaTypeQuality,
} from './media-type.constants';

// Media Status Constants
export {
  CONTENT_MEDIA_STATUS,
  contentMediaStatusGetLabel,
  contentMediaStatusGetCategory,
  contentMediaStatusGetColor,
  contentMediaStatusGetPriority,
  contentMediaStatusIsReady,
  contentMediaStatusIsProcessing,
  contentMediaStatusIsFailed,
  contentMediaStatusIsArchived,
  contentMediaStatusCanTransitionTo,
  contentMediaStatusGetAvailableTransitions,
  contentMediaStatusGetStateLabel,
  contentMediaStatusGetActionLabel,
  contentMediaStatusIsValid,
  contentMediaStatusIsValidState,
} from './media-status.constants';

export type {
  ContentMediaStatusType,
  ContentMediaStatusCategory,
  ContentMediaStatusColor,
  ContentMediaStatusPriority,
  ContentMediaState,
  ContentMediaAction,
} from './media-status.constants';

// Media Format Constants
export {
  CONTENT_MEDIA_FORMAT,
  contentMediaFormatGetCategoryLabel,
  contentMediaFormatGetFeatureLabel,
  contentMediaFormatGetQualityLabel,
  contentMediaFormatHasFeature,
  contentMediaFormatIsImageFormat,
  contentMediaFormatIsVideoFormat,
  contentMediaFormatIsAudioFormat,
  contentMediaFormatIsDocumentFormat,
  contentMediaFormatIsArchiveFormat,
} from './media-format.constants';

export type {
  ContentMediaFormatCategory,
  ContentMediaImageFormat,
  ContentMediaVideoFormat,
  ContentMediaAudioFormat,
  ContentMediaDocumentFormat,
  ContentMediaArchiveFormat,
  ContentMediaFormatFeature,
  ContentMediaFormatQuality,
} from './media-format.constants';

// Media Size Constants
export {
  CONTENT_MEDIA_SIZE,
  contentMediaSizeGetCategoryLabel,
  contentMediaSizeGetDimension,
  contentMediaSizeGetImageSize,
  contentMediaSizeGetVideoSize,
  contentMediaSizeGetFileLimit,
  contentMediaSizeGetAspectRatioLabel,
  contentMediaSizeGetAspectRatioValue,
  contentMediaSizeGetMegapixelLabel,
  contentMediaSizeGetMegapixel,
  contentMediaSizeIsValidCategory,
  contentMediaSizeGetMaxWidth,
  contentMediaSizeGetMaxHeight,
} from './media-size.constants';

export type {
  ContentMediaSizeCategory,
  ContentMediaSizeDimension,
  ContentMediaImageSize,
  ContentMediaVideoSize,
  ContentMediaAspectRatio,
  ContentMediaAspectRatioValue,
  ContentMediaMegapixel,
} from './media-size.constants';
