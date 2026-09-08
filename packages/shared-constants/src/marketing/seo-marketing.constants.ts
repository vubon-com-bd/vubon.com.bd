import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const SEO_MARKETING = {
  TYPES: {
    ...COMMON_TYPES,
    ON_PAGE: 'on_page',
    OFF_PAGE: 'off_page',
    TECHNICAL: 'technical',
    LOCAL: 'local',
    CONTENT: 'content',
  },
  SEO_ELEMENTS: {
    TITLE: 'title',
    DESCRIPTION: 'description',
    KEYWORDS: 'keywords',
    HEADINGS: 'headings',
    ALT_TEXT: 'alt_text',
    URL: 'url',
    CANONICAL: 'canonical',
  },
  KEYWORD_TYPES: {
    HEAD: 'head',
    BODY: 'body',
    LONG_TAIL: 'long_tail',
    LSI: 'lsi',
  },
  MAX_TITLE_LENGTH: 60,
  MAX_DESCRIPTION_LENGTH: 160,
  MAX_KEYWORDS: 10,
  RECOMMENDED_KEYWORD_DENSITY: 0.02,
  MAX_KEYWORD_DENSITY: 0.05,
} as const;
