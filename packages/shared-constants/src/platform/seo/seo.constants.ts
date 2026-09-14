import { SEO_STATUS } from './seo-status.constants';
import { SEO_TYPE } from './seo-type.constants';
import { SEO_PRIORITY, SEO_PRIORITY_WEIGHT } from './seo-priority.constants';
import { SEO_STRATEGY, SEO_CRAWL_FREQUENCY } from './seo-strategy.constants';
import {
  SEO_KEYWORD_TYPE,
  SEO_KEYWORD_DIFFICULTY,
  SEO_KEYWORD_INTENT,
  SEO_KEYWORD,
} from './seo-keyword.constants';
import { SEO_CONTENT_TYPE, SEO_CONTENT, SEO_META_TAG } from './seo-content.constants';
import { SEO_LINK_TYPE, SEO_LINK } from './seo-link.constants';
import { SEO_AUDIT_TYPE, SEO_AUDIT_STATUS, SEO_AUDIT } from './seo-audit.constants';
import { SEO_SCORE_GRADE, SEO_SCORE, SEO_SCORE_WEIGHT } from './seo-score.constants';
import { SEO_RANKING_TYPE, SEO_RANKING } from './seo-ranking.constants';
import { SEO_SITEMAP_TYPE, SEO_SITEMAP, SEO_SITEMAP_CHANGEFREQ } from './seo-sitemap.constants';
import { SEO_ROBOTS_DIRECTIVE, SEO_ROBOTS_USER_AGENT, SEO_ROBOTS } from './seo-robots.constants';
import { SEO_SCHEMA_TYPE, SEO_SCHEMA_FORMAT, SEO_SCHEMA } from './seo-schema.constants';
import { SEO_OPEN_GRAPH_TYPE, SEO_OPEN_GRAPH } from './seo-open-graph.constants';
import { SEO_TWITTER_CARD_TYPE, SEO_TWITTER_CARD } from './seo-twitter-card.constants';
import {
  SEO_ANALYTICS_METRIC,
  SEO_ANALYTICS_PERIOD,
  SEO_ANALYTICS,
} from './seo-analytics.constants';
import {
  SEO_REPORT_TYPE,
  SEO_REPORT_FORMAT,
  SEO_REPORT_SCHEDULE,
  SEO_REPORT,
} from './seo-report.constants';

export const SEO_LIMIT = {
  MAX_KEYWORDS: 10000,
  MAX_PAGES: 100000,
  MAX_BACKLINKS: 1000000,
  MAX_COMPETITORS: 50,
  MAX_AUDIT_HISTORY: 100,
  MIN_CONTENT_LENGTH: 300,
  MAX_CONTENT_LENGTH: 100000,
} as const;

export const SEO = {
  TYPE: SEO_TYPE,
  STATUS: SEO_STATUS,
  PRIORITY: {
    TYPE: SEO_PRIORITY,
    WEIGHT: SEO_PRIORITY_WEIGHT,
  },
  STRATEGY: SEO_STRATEGY,
  CRAWL_FREQUENCY: SEO_CRAWL_FREQUENCY,
  LIMIT: SEO_LIMIT,

  KEYWORD: {
    TYPE: SEO_KEYWORD_TYPE,
    DIFFICULTY: SEO_KEYWORD_DIFFICULTY,
    INTENT: SEO_KEYWORD_INTENT,
    LIMIT: SEO_KEYWORD,
  },

  CONTENT: {
    TYPE: SEO_CONTENT_TYPE,
    META_TAG: SEO_META_TAG,
    LIMIT: SEO_CONTENT,
  },

  LINK: {
    TYPE: SEO_LINK_TYPE,
    LIMIT: SEO_LINK,
  },

  AUDIT: {
    TYPE: SEO_AUDIT_TYPE,
    STATUS: SEO_AUDIT_STATUS,
    LIMIT: SEO_AUDIT,
  },

  SCORE: {
    GRADE: SEO_SCORE_GRADE,
    WEIGHT: SEO_SCORE_WEIGHT,
    LIMIT: SEO_SCORE,
  },

  RANKING: {
    TYPE: SEO_RANKING_TYPE,
    LIMIT: SEO_RANKING,
  },

  SITEMAP: {
    TYPE: SEO_SITEMAP_TYPE,
    CHANGEFREQ: SEO_SITEMAP_CHANGEFREQ,
    LIMIT: SEO_SITEMAP,
  },

  ROBOTS: {
    DIRECTIVE: SEO_ROBOTS_DIRECTIVE,
    USER_AGENT: SEO_ROBOTS_USER_AGENT,
    LIMIT: SEO_ROBOTS,
  },

  SCHEMA: {
    TYPE: SEO_SCHEMA_TYPE,
    FORMAT: SEO_SCHEMA_FORMAT,
    LIMIT: SEO_SCHEMA,
  },

  OPEN_GRAPH: {
    TYPE: SEO_OPEN_GRAPH_TYPE,
    LIMIT: SEO_OPEN_GRAPH,
  },

  TWITTER_CARD: {
    TYPE: SEO_TWITTER_CARD_TYPE,
    LIMIT: SEO_TWITTER_CARD,
  },

  ANALYTICS: {
    METRIC: SEO_ANALYTICS_METRIC,
    PERIOD: SEO_ANALYTICS_PERIOD,
    LIMIT: SEO_ANALYTICS,
  },

  REPORT: {
    TYPE: SEO_REPORT_TYPE,
    FORMAT: SEO_REPORT_FORMAT,
    SCHEDULE: SEO_REPORT_SCHEDULE,
    LIMIT: SEO_REPORT,
  },
} as const;

export type SeoType = typeof SEO;
