/**
 * SEO Link Attribute Constants
 * Link attributes and their configurations
 */

export const SEO_LINK_ATTRIBUTE = {
  // Link Attributes
  ATTRIBUTES: {
    REL: 'rel',
    HREFLANG: 'hreflang',
    MEDIA: 'media',
    TARGET: 'target',
    TYPE: 'type',
    TITLE: 'title',
    CLASS: 'class',
    ID: 'id',
    STYLE: 'style',
    DOWNLOAD: 'download',
    PING: 'ping',
    REFERRER_POLICY: 'referrer_policy',
    SIZES: 'sizes',
    CHARSET: 'charset',
    COORDS: 'coords',
    SHAPE: 'shape',
    REV: 'rev',
    HREF: 'href',
    NAME: 'name',
  } as const,

  // Rel Attribute Values
  REL_VALUES: {
    ALTERNATE: 'alternate',
    AUTHOR: 'author',
    BOOKMARK: 'bookmark',
    CANONICAL: 'canonical',
    HELP: 'help',
    ICON: 'icon',
    LICENSE: 'license',
    NEXT: 'next',
    PREV: 'prev',
    SEARCH: 'search',
    STYLESHEET: 'stylesheet',
    TAG: 'tag',
    AMPHTML: 'amphtml',
    APPLE_TOUCH_ICON: 'apple-touch-icon',
    MANIFEST: 'manifest',
    PRECONNECT: 'preconnect',
    PREFETCH: 'prefetch',
    PRELOAD: 'preload',
    PRERENDER: 'prerender',
    DNS_PREFETCH: 'dns-prefetch',
    MODULE_PRELOAD: 'modulepreload',
    DOFOLLOW: 'dofollow',
    NOFOLLOW: 'nofollow',
    SPONSORED: 'sponsored',
    UGC: 'ugc',
    ME: 'me',
    WEBMENTION: 'webmention',
  } as const,

  // Target Attribute Values
  TARGET_VALUES: {
    SELF: '_self',
    BLANK: '_blank',
    PARENT: '_parent',
    TOP: '_top',
  } as const,

  // Media Attribute Values
  MEDIA_VALUES: {
    ALL: 'all',
    PRINT: 'print',
    SCREEN: 'screen',
    SPEECH: 'speech',
    HANDHELD: 'handheld',
    PROJECTION: 'projection',
    TV: 'tv',
  } as const,

  // Type Attribute Values
  TYPE_VALUES: {
    TEXT_CSS: 'text/css',
    TEXT_JAVASCRIPT: 'text/javascript',
    TEXT_PLAIN: 'text/plain',
    TEXT_HTML: 'text/html',
    APPLICATION_JSON: 'application/json',
    APPLICATION_XML: 'application/xml',
    APPLICATION_PDF: 'application/pdf',
    IMAGE_SVG: 'image/svg+xml',
    IMAGE_PNG: 'image/png',
    IMAGE_JPEG: 'image/jpeg',
    IMAGE_WEBP: 'image/webp',
    VIDEO_MP4: 'video/mp4',
    VIDEO_WEBM: 'video/webm',
    AUDIO_MP3: 'audio/mpeg',
  } as const,

  // Referrer Policy Values
  REFERRER_POLICY_VALUES: {
    NO_REFERRER: 'no-referrer',
    NO_REFERRER_WHEN_DOWNGRADE: 'no-referrer-when-downgrade',
    SAME_ORIGIN: 'same-origin',
    ORIGIN: 'origin',
    STRICT_ORIGIN: 'strict-origin',
    ORIGIN_WHEN_CROSS_ORIGIN: 'origin-when-cross-origin',
    STRICT_ORIGIN_WHEN_CROSS_ORIGIN: 'strict-origin-when-cross-origin',
    UNSAFE_URL: 'unsafe-url',
  } as const,

  // Link Attribute Combinations
  COMBINATIONS: {
    // SEO Best Practices
    SEO_FRIENDLY: {
      rel: 'dofollow',
      target: '_self',
    },
    EXTERNAL_LINK: {
      rel: 'nofollow noopener noreferrer',
      target: '_blank',
    },
    SPONSORED_LINK: {
      rel: 'sponsored nofollow noopener',
      target: '_blank',
    },
    UGC_LINK: {
      rel: 'ugc nofollow noopener',
      target: '_blank',
    },
    SOCIAL_SHARE: {
      rel: 'noopener noreferrer',
      target: '_blank',
    },
    DOWNLOAD_LINK: {
      download: 'true',
    },
  } as const,
} as const;

// Link Attributes
export type SEOLinkAttributeType =
  (typeof SEO_LINK_ATTRIBUTE.ATTRIBUTES)[keyof typeof SEO_LINK_ATTRIBUTE.ATTRIBUTES];

// Rel Values
export type SEOLinkAttributeRel =
  (typeof SEO_LINK_ATTRIBUTE.REL_VALUES)[keyof typeof SEO_LINK_ATTRIBUTE.REL_VALUES];

// Target Values
export type SEOLinkAttributeTarget =
  (typeof SEO_LINK_ATTRIBUTE.TARGET_VALUES)[keyof typeof SEO_LINK_ATTRIBUTE.TARGET_VALUES];

// Media Values
export type SEOLinkAttributeMedia =
  (typeof SEO_LINK_ATTRIBUTE.MEDIA_VALUES)[keyof typeof SEO_LINK_ATTRIBUTE.MEDIA_VALUES];

// Type Values
export type SEOLinkAttributeTypeValue =
  (typeof SEO_LINK_ATTRIBUTE.TYPE_VALUES)[keyof typeof SEO_LINK_ATTRIBUTE.TYPE_VALUES];

// Referrer Policy Values
export type SEOLinkAttributeReferrerPolicy =
  (typeof SEO_LINK_ATTRIBUTE.REFERRER_POLICY_VALUES)[keyof typeof SEO_LINK_ATTRIBUTE.REFERRER_POLICY_VALUES];

// Utility Functions
export function getSEOLinkAttributeLabel(attribute: SEOLinkAttributeType): string {
  const labels: Record<SEOLinkAttributeType, string> = {
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.REL]: 'Relationship',
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.HREFLANG]: 'Language',
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.MEDIA]: 'Media',
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.TARGET]: 'Target',
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.TYPE]: 'Type',
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.TITLE]: 'Title',
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.CLASS]: 'CSS Class',
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.ID]: 'ID',
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.STYLE]: 'Style',
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.DOWNLOAD]: 'Download',
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.PING]: 'Ping',
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.REFERRER_POLICY]: 'Referrer Policy',
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.SIZES]: 'Sizes',
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.CHARSET]: 'Charset',
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.COORDS]: 'Coordinates',
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.SHAPE]: 'Shape',
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.REV]: 'Reverse Relationship',
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.HREF]: 'Href',
    [SEO_LINK_ATTRIBUTE.ATTRIBUTES.NAME]: 'Name',
  };
  return labels[attribute] || 'Unknown Attribute';
}

export function getSEOLinkRelLabel(rel: SEOLinkAttributeRel): string {
  const labels: Record<SEOLinkAttributeRel, string> = {
    [SEO_LINK_ATTRIBUTE.REL_VALUES.ALTERNATE]: 'Alternate Version',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.AUTHOR]: 'Author Link',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.BOOKMARK]: 'Bookmark Link',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.CANONICAL]: 'Canonical URL',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.HELP]: 'Help Link',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.ICON]: 'Icon Link',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.LICENSE]: 'License Link',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.NEXT]: 'Next Page',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.PREV]: 'Previous Page',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.SEARCH]: 'Search Link',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.STYLESHEET]: 'Stylesheet',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.TAG]: 'Tag Link',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.AMPHTML]: 'AMP HTML',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.APPLE_TOUCH_ICON]: 'Apple Touch Icon',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.MANIFEST]: 'Web Manifest',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.PRECONNECT]: 'Preconnect',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.PREFETCH]: 'Prefetch',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.PRELOAD]: 'Preload',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.PRERENDER]: 'Prerender',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.DNS_PREFETCH]: 'DNS Prefetch',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.MODULE_PRELOAD]: 'Module Preload',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.DOFOLLOW]: 'Dofollow',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.NOFOLLOW]: 'Nofollow',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.SPONSORED]: 'Sponsored',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.UGC]: 'User Generated Content',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.ME]: 'Me Link',
    [SEO_LINK_ATTRIBUTE.REL_VALUES.WEBMENTION]: 'Webmention',
  };
  return labels[rel] || 'Unknown Rel Value';
}

export function getSEOLinkTargetLabel(target: SEOLinkAttributeTarget): string {
  const labels: Record<SEOLinkAttributeTarget, string> = {
    [SEO_LINK_ATTRIBUTE.TARGET_VALUES.SELF]: 'Same Tab/Window',
    [SEO_LINK_ATTRIBUTE.TARGET_VALUES.BLANK]: 'New Tab/Window',
    [SEO_LINK_ATTRIBUTE.TARGET_VALUES.PARENT]: 'Parent Frame',
    [SEO_LINK_ATTRIBUTE.TARGET_VALUES.TOP]: 'Top Frame',
  };
  return labels[target] || 'Unknown Target';
}

export function getSEOLinkMediaLabel(media: SEOLinkAttributeMedia): string {
  const labels: Record<SEOLinkAttributeMedia, string> = {
    [SEO_LINK_ATTRIBUTE.MEDIA_VALUES.ALL]: 'All Devices',
    [SEO_LINK_ATTRIBUTE.MEDIA_VALUES.PRINT]: 'Print',
    [SEO_LINK_ATTRIBUTE.MEDIA_VALUES.SCREEN]: 'Screen',
    [SEO_LINK_ATTRIBUTE.MEDIA_VALUES.SPEECH]: 'Speech/Screen Readers',
    [SEO_LINK_ATTRIBUTE.MEDIA_VALUES.HANDHELD]: 'Handheld Devices',
    [SEO_LINK_ATTRIBUTE.MEDIA_VALUES.PROJECTION]: 'Projection',
    [SEO_LINK_ATTRIBUTE.MEDIA_VALUES.TV]: 'TV',
  };
  return labels[media] || 'Unknown Media';
}

export function getSEOLinkReferrerPolicyLabel(policy: SEOLinkAttributeReferrerPolicy): string {
  const labels: Record<SEOLinkAttributeReferrerPolicy, string> = {
    [SEO_LINK_ATTRIBUTE.REFERRER_POLICY_VALUES.NO_REFERRER]: 'No Referrer',
    [SEO_LINK_ATTRIBUTE.REFERRER_POLICY_VALUES.NO_REFERRER_WHEN_DOWNGRADE]:
      'No Referrer When Downgrade',
    [SEO_LINK_ATTRIBUTE.REFERRER_POLICY_VALUES.SAME_ORIGIN]: 'Same Origin',
    [SEO_LINK_ATTRIBUTE.REFERRER_POLICY_VALUES.ORIGIN]: 'Origin Only',
    [SEO_LINK_ATTRIBUTE.REFERRER_POLICY_VALUES.STRICT_ORIGIN]: 'Strict Origin',
    [SEO_LINK_ATTRIBUTE.REFERRER_POLICY_VALUES.ORIGIN_WHEN_CROSS_ORIGIN]:
      'Origin When Cross-Origin',
    [SEO_LINK_ATTRIBUTE.REFERRER_POLICY_VALUES.STRICT_ORIGIN_WHEN_CROSS_ORIGIN]:
      'Strict Origin When Cross-Origin',
    [SEO_LINK_ATTRIBUTE.REFERRER_POLICY_VALUES.UNSAFE_URL]: 'Unsafe URL',
  };
  return labels[policy] || 'Unknown Referrer Policy';
}

export function getLinkAttributeCombination(
  name: keyof typeof SEO_LINK_ATTRIBUTE.COMBINATIONS
): (typeof SEO_LINK_ATTRIBUTE.COMBINATIONS)[keyof typeof SEO_LINK_ATTRIBUTE.COMBINATIONS] {
  return SEO_LINK_ATTRIBUTE.COMBINATIONS[name];
}

export function buildLinkAttributes(
  combination: keyof typeof SEO_LINK_ATTRIBUTE.COMBINATIONS
): string {
  const attrs = getLinkAttributeCombination(combination);
  return Object.entries(attrs)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
}

export function getSEOLinkTypeValueLabel(typeValue: SEOLinkAttributeTypeValue): string {
  const labels: Record<SEOLinkAttributeTypeValue, string> = {
    [SEO_LINK_ATTRIBUTE.TYPE_VALUES.TEXT_CSS]: 'CSS Stylesheet',
    [SEO_LINK_ATTRIBUTE.TYPE_VALUES.TEXT_JAVASCRIPT]: 'JavaScript File',
    [SEO_LINK_ATTRIBUTE.TYPE_VALUES.TEXT_PLAIN]: 'Plain Text',
    [SEO_LINK_ATTRIBUTE.TYPE_VALUES.TEXT_HTML]: 'HTML Document',
    [SEO_LINK_ATTRIBUTE.TYPE_VALUES.APPLICATION_JSON]: 'JSON Data',
    [SEO_LINK_ATTRIBUTE.TYPE_VALUES.APPLICATION_XML]: 'XML Data',
    [SEO_LINK_ATTRIBUTE.TYPE_VALUES.APPLICATION_PDF]: 'PDF Document',
    [SEO_LINK_ATTRIBUTE.TYPE_VALUES.IMAGE_SVG]: 'SVG Image',
    [SEO_LINK_ATTRIBUTE.TYPE_VALUES.IMAGE_PNG]: 'PNG Image',
    [SEO_LINK_ATTRIBUTE.TYPE_VALUES.IMAGE_JPEG]: 'JPEG Image',
    [SEO_LINK_ATTRIBUTE.TYPE_VALUES.IMAGE_WEBP]: 'WebP Image',
    [SEO_LINK_ATTRIBUTE.TYPE_VALUES.VIDEO_MP4]: 'MP4 Video',
    [SEO_LINK_ATTRIBUTE.TYPE_VALUES.VIDEO_WEBM]: 'WebM Video',
    [SEO_LINK_ATTRIBUTE.TYPE_VALUES.AUDIO_MP3]: 'MP3 Audio',
  };
  return labels[typeValue] || 'Unknown Type Value';
}
