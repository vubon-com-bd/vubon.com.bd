import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SEO } from './seo.constants';
import { SEO_SCORE } from './seo-score.constants';

export const SEO_SETTINGS = {
  TYPES: {
    ...COMMON_TYPES,
    ...SEO.SEO_TYPES,
    GENERAL: 'general',
    TECHNICAL: 'technical',
    CONTENT: 'content',
    LINK: 'link',
    SCHEMA: 'schema',
  },
  SEO: { ...SEO },
  SEO_SCORE: { ...SEO_SCORE },
  SETTINGS_CATEGORIES: {
    TITLE_TEMPLATE: 'title_template',
    DESCRIPTION_TEMPLATE: 'description_template',
    DEFAULT_KEYWORDS: 'default_keywords',
    ENABLE_SCHEMA: 'enable_schema',
    ENABLE_OPEN_GRAPH: 'enable_open_graph',
    ENABLE_TWITTER_CARD: 'enable_twitter_card',
    AUTO_OPTIMIZE: 'auto_optimize',
  },
  DEFAULT_SETTINGS: {
    TITLE_TEMPLATE: '{{page_title}} | {{site_name}}',
    DESCRIPTION_TEMPLATE: '{{page_description}} - {{site_name}}',
    ENABLE_SCHEMA: true,
    ENABLE_OPEN_GRAPH: true,
    ENABLE_TWITTER_CARD: true,
    AUTO_OPTIMIZE: false,
  },
} as const;
