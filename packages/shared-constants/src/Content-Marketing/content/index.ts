/**
 * কন্টেন্ট ম্যানেজমেন্ট কনস্ট্যান্টস এক্সপোর্ট
 * @module Content-Marketing/content
 */

// বেসিক কনস্ট্যান্টসমূহ
export {
  CONTENT_MODULE_NAME,
  DEFAULT_CONTENT_STATUS,
  CONTENT_SORT_FIELDS,
  CONTENT_PAGE_SIZE,
  MAX_CONTENT_TITLE_LENGTH,
  MAX_CONTENT_EXCERPT_LENGTH,
  MAX_CONTENT_BODY_LENGTH,
  type ContentStatus as BaseContentStatus,
  type ContentSortField,
} from './content.constants';

// কন্টেন্ট টাইপ কনস্ট্যান্টসমূহ
export {
  CONTENT_TYPES,
  CONTENT_TYPE_LABELS,
  getContentTypeLabel,
  getAllContentTypes,
  isValidContentType,
  type ContentType,
  type ContentTypeLabel,
} from './content-type.constants';

// কন্টেন্ট স্ট্যাটাস কনস্ট্যান্টসমূহ
export {
  CONTENT_STATUSES,
  CONTENT_STATUS_COLORS,
  CONTENT_STATUS_LABELS,
  getContentStatusColor,
  getContentStatusLabel,
  getAllContentStatuses,
  isValidContentStatus,
  isPublishedStatus,
  isDeletedStatus,
  type ContentStatus,
  type ContentStatusColor,
  type ContentStatusLabel,
} from './content-status.constants';

// কন্টেন্ট ক্যাটাগরি কনস্ট্যান্টসমূহ
export {
  DEFAULT_CATEGORIES,
  MAX_CATEGORY_NAME_LENGTH,
  MAX_CATEGORY_DESCRIPTION_LENGTH,
  CATEGORY_SORT_FIELDS,
  isDefaultCategory,
  isValidCategorySortField,
  generateCategorySlug,
  isValidCategoryName,
  isValidCategoryDescription,
  getAllDefaultCategories,
  type Category,
  type CategorySortField,
  type CategoryInterface,
  type CreateCategoryInput,
  type UpdateCategoryInput,
  type CategoryFilter,
} from './content-category.constants';

// কন্টেন্ট ট্যাগ কনস্ট্যান্টসমূহ
export {
  MAX_TAG_NAME_LENGTH,
  MIN_TAG_NAME_LENGTH,
  MAX_TAGS_PER_CONTENT,
  POPULAR_TAGS_LIMIT,
  TAG_SORT_FIELDS,
  isValidTagName,
  generateTagSlug,
  isValidTagSortField,
  isTagUsable,
  filterPopularTags,
  normalizeTagName,
  areTagsValid,
  getUniqueTagNames,
  type TagSortField,
  type TagInterface,
  type TagMetadata,
  type CreateTagInput,
  type UpdateTagInput,
  type TagFilter,
} from './content-tag.constants';

// কন্টেন্ট ফরম্যাট কনস্ট্যান্টসমূহ
export {
  CONTENT_FORMATS,
  DEFAULT_CONTENT_FORMAT,
  SUPPORTED_FORMATS,
  FORMAT_EXTENSIONS,
  FORMAT_MIME_TYPES,
  FORMAT_LABELS,
  isValidFormat,
  isSupportedFormat,
  getFormatExtension,
  getFormatMimeType,
  getFormatLabel,
  getFormatFromExtension,
  getFormatFromMimeType,
  getAllFormats,
  getAllSupportedFormats,
  isRichTextFormat,
  isPlainTextFormat,
  isStructuredFormat,
  type ContentFormat,
  type SupportedFormat,
} from './content-format.constants';

// কন্টেন্ট ভাষা কনস্ট্যান্টসমূহ
export {
  SUPPORTED_LANGUAGES,
  LANGUAGE_NAMES,
  DEFAULT_LANGUAGE,
  LANGUAGE_CODES,
  LANGUAGE_TO_CODE,
  CODE_TO_LANGUAGE,
  LANGUAGE_LOCALES,
  LANGUAGE_RTL,
  isValidLanguage,
  isValidLanguageCode,
  getLanguageCode,
  getLanguageFromCode,
  getLanguageName,
  getLanguageLocale,
  isRTL,
  getAllLanguages,
  getAllLanguageCodes,
  getDefaultLanguage,
  isLanguageSupported,
  normalizeLanguage,
  type Language,
  type LanguageCode,
} from './content-language.constants';

// কন্টেন্ট লাইসেন্স কনস্ট্যান্টসমূহ
export {
  LICENSE_TYPES,
  LICENSE_URLS,
  DEFAULT_LICENSE,
  LICENSE_LABELS,
  LICENSE_DESCRIPTIONS,
  isValidLicense,
  getLicenseUrl,
  getLicenseLabel,
  getLicenseDescription,
  getAllLicenses,
  getDefaultLicense,
  isCommercialAllowed,
  isDerivativesAllowed,
  isAttributionRequired,
  isShareAlikeRequired,
  isOpenLicense,
  isFreeLicense,
  type LicenseType,
} from './content-license.constants';

// ব্লগ কনস্ট্যান্টসমূহ
export {
  BLOG_MODULE_NAME,
  DEFAULT_BLOG_STATUS,
  BLOG_SORT_FIELDS,
  BLOG_PAGE_SIZE,
  MAX_BLOG_TITLE_LENGTH,
  MAX_BLOG_EXCERPT_LENGTH,
  MAX_BLOG_BODY_LENGTH,
  BLOG_READING_TIME_WORDS_PER_MINUTE,
  DEFAULT_BLOG_COVER_IMAGE,
  isValidBlogSortField,
  isValidBlogStatus as isValidBlogStatusBase,
  calculateReadingTime,
  generateBlogSlug,
  isValidBlogTitle,
  isValidBlogExcerpt,
  isValidBlogBody,
  isBlogPublished,
  isBlogEditable as isBlogEditableBase,
  type BlogSortField,
  type BlogStatus as BlogStatusBase,
  type BlogInterface,
  type BlogMetadata,
  type CreateBlogInput,
  type UpdateBlogInput,
  type BlogFilter,
} from './blog.constants';

// ব্লগ স্ট্যাটাস কনস্ট্যান্টসমূহ
export {
  BLOG_STATUSES,
  BLOG_STATUS_COLORS,
  BLOG_STATUS_LABELS,
  PUBLISHABLE_STATUSES,
  getBlogStatusColor,
  getBlogStatusLabel,
  getAllBlogStatuses,
  isValidBlogStatus,
  isPublishableStatus,
  isBlogEditable,
  isBlogDeletable,
  isBlogArchivable,
  canTransitionTo,
  getPublishableStatuses,
  type BlogStatus,
  type PublishableStatus,
} from './blog-status.constants';

// ব্লগ ক্যাটাগরি কনস্ট্যান্টসমূহ
export {
  DEFAULT_BLOG_CATEGORIES,
  MAX_BLOG_CATEGORY_NAME_LENGTH,
  MAX_BLOG_CATEGORY_DESCRIPTION_LENGTH,
  isDefaultBlogCategory,
  generateBlogCategorySlug,
  isValidBlogCategoryName,
  isValidBlogCategoryDescription,
  getAllDefaultBlogCategories,
  isBlogCategoryActive,
  updateBlogCategoryPostCount,
  type BlogCategory,
  type BlogCategoryInterface,
  type CreateBlogCategoryInput,
  type UpdateBlogCategoryInput,
  type BlogCategoryFilter,
} from './blog-category.constants';

// ব্লগ ট্যাগ কনস্ট্যান্টসমূহ
export {
  MAX_BLOG_TAG_NAME_LENGTH,
  MAX_BLOG_TAGS_PER_POST,
  POPULAR_BLOG_TAGS_LIMIT,
  isValidBlogTagName,
  generateBlogTagSlug,
  isBlogTagUsable,
  filterPopularBlogTags,
  normalizeBlogTagName,
  areBlogTagsValid,
  getUniqueBlogTagNames,
  incrementBlogTagUsage,
  decrementBlogTagUsage,
  getDefaultBlogTags,
  type BlogTagName,
  type BlogTagInterface,
  type CreateBlogTagInput,
  type UpdateBlogTagInput,
  type BlogTagFilter,
} from './blog-tag.constants';

// পেজ কনস্ট্যান্টসমূহ
export {
  PAGE_MODULE_NAME,
  DEFAULT_PAGE_STATUS,
  DEFAULT_PAGE_TEMPLATE,
  PAGE_SORT_FIELDS,
  MAX_PAGE_TITLE_LENGTH,
  MAX_PAGE_BODY_LENGTH,
  SYSTEM_PAGES,
  isValidPageSortField,
  isValidPageStatus as isValidPageStatusBase,
  isValidPageTemplate as isValidPageTemplateBase,
  isValidSystemPage,
  generatePageSlug,
  isValidPageTitle,
  isValidPageBody,
  isPagePublished as isPagePublishedBase,
  isPageEditable as isPageEditableBase,
  isSystemPageType,
  getAllSystemPages,
  getDefaultPageTemplate as getDefaultPageTemplateBase,
  getDefaultPageStatus,
  type PageSortField,
  type PageStatus as PageStatusBase,
  type PageTemplate as PageTemplateBase,
  type SystemPage,
  type PageInterface,
  type PageMetadata,
  type CreatePageInput,
  type UpdatePageInput,
  type PageFilter,
} from './page.constants';

// পেজ স্ট্যাটাস কনস্ট্যান্টসমূহ
export {
  PAGE_STATUSES,
  PAGE_STATUS_COLORS,
  getPageStatusColor,
  getAllPageStatuses,
  isValidPageStatus,
  isPagePublishable,
  isPageEditable,
  isPageDeletable,
  isPageArchivable,
  canPageTransitionTo,
  isPagePublished,
  isPageDraft,
  type PageStatus,
} from './page-status.constants';

// পেজ টেমপ্লেট কনস্ট্যান্টসমূহ
export {
  PAGE_TEMPLATES,
  PAGE_TEMPLATE_LABELS,
  getPageTemplateLabel,
  getAllPageTemplates,
  isValidPageTemplate,
  hasSidebar,
  isFullWidth,
  isLandingPage,
  isCustomTemplate,
  getDefaultPageTemplate,
  type PageTemplate,
} from './page-template.constants';

// পেজ লেআউট কনস্ট্যান্টসমূহ
export {
  PAGE_LAYOUTS,
  PAGE_LAYOUT_LABELS,
  getPageLayoutLabel,
  getAllPageLayouts,
  isValidPageLayout,
  isFullWidthLayout,
  isBoxedLayout,
  isFluidLayout,
  isDefaultLayout,
  getDefaultPageLayout,
  type PageLayout,
} from './page-layout.constants';

// SEO কনস্ট্যান্টসমূহ
export {
  SEO_MODULE_NAME,
  DEFAULT_SEO_TITLE_LENGTH,
  DEFAULT_SEO_DESCRIPTION_LENGTH,
  MAX_SEO_TITLE_LENGTH,
  MAX_SEO_DESCRIPTION_LENGTH,
  MAX_SEO_KEYWORDS,
  DEFAULT_OG_IMAGE,
  isValidSeoTitle,
  isValidSeoDescription,
  isValidSeoKeywords,
  truncateSeoTitle,
  truncateSeoDescription,
  formatSeoTitle,
  generateSeoMetaTags,
  getDefaultSeoData,
  isValidSeoData,
  type SeoData,
  type SeoMetaTags,
} from './seo.constants';

// সাধারণ টাইপসমূহ
export type { Language as SharedLanguage } from './content-status.constants';
