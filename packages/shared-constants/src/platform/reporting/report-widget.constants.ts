import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { REPORT_WIDGET_TYPE } from './report-widget-type.constants';

export const REPORT_WIDGET = {
  TYPES: {
    ...COMMON_TYPES,
    ...REPORT_WIDGET_TYPE.TYPES,
  },
  REPORT_WIDGET_TYPE: { ...REPORT_WIDGET_TYPE },
  WIDGET_SIZES: {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    XL: 'xl',
    FULL: 'full',
  },
  WIDGET_POSITIONS: {
    TOP: 'top',
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
    BOTTOM: 'bottom',
  },
  MAX_WIDGETS: 50,
  WIDGET_CACHE_TTL_MINUTES: 5,
} as const;
