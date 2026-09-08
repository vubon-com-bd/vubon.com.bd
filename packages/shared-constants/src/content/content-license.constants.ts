import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const CONTENT_LICENSE = {
  TYPES: {
    ...COMMON_TYPES,
    ALL_RIGHTS_RESERVED: 'all_rights_reserved',
    CC_BY: 'cc_by',
    CC_BY_SA: 'cc_by_sa',
    CC_BY_ND: 'cc_by_nd',
    CC_BY_NC: 'cc_by_nc',
    CC_BY_NC_SA: 'cc_by_nc_sa',
    CC_BY_NC_ND: 'cc_by_nc_nd',
    CC0: 'cc0',
    MIT: 'mit',
    APACHE: 'apache',
    GPL: 'gpl',
  },
  LICENSE_TYPES: {
    OPEN: 'open',
    CLOSED: 'closed',
    CUSTOM: 'custom',
  },
  DEFAULT_LICENSE: 'all_rights_reserved',
} as const;
