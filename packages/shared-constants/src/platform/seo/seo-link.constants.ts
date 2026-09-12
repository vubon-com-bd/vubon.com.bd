import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SEO } from './seo.constants';

export const SEO_LINK = {
  TYPES: {
    ...COMMON_TYPES,
    INTERNAL: 'internal',
    EXTERNAL: 'external',
    BACKLINK: 'backlink',
    NOFOLLOW: 'nofollow',
    DOFOLLOW: 'dofollow',
    SPONSORED: 'sponsored',
    UGC: 'ugc',
  },
  SEO: { ...SEO },
  LINK_ATTRIBUTES: {
    NOFOLLOW: 'rel="nofollow"',
    DOFOLLOW: 'rel="dofollow"',
    SPONSORED: 'rel="sponsored"',
    UGC: 'rel="ugc"',
  },
  MAX_INTERNAL_LINKS: 100,
  MAX_EXTERNAL_LINKS: 50,
  MAX_BACKLINKS: 1000,
  LINK_DEPTH_MAX: 5,
} as const;
