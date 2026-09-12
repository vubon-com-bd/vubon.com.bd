import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { REPORT_WIDGET } from './report-widget.constants';
import { REPORT_WIDGET_TYPE } from './report-widget-type.constants';

export const REPORT_DASHBOARD = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DRAFT: 'draft',
    PUBLISHED: 'published',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'dashboard:view',
    CREATE: 'dashboard:create',
    UPDATE: 'dashboard:update',
    DELETE: 'dashboard:delete',
    SHARE: 'dashboard:share',
  },
  REPORT_WIDGET: { ...REPORT_WIDGET },
  REPORT_WIDGET_TYPE: { ...REPORT_WIDGET_TYPE },
  DASHBOARD_TYPES: {
    PERSONAL: 'personal',
    SHARED: 'shared',
    PUBLIC: 'public',
    EXECUTIVE: 'executive',
    CUSTOM: 'custom',
  },
  MAX_WIDGETS_PER_DASHBOARD: 20,
  DEFAULT_REFRESH_INTERVAL_MINUTES: 5,
  MAX_DASHBOARDS_PER_USER: 10,
} as const;
