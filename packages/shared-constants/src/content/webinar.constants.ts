import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { WEBINAR_STATUS } from './webinar-status.constants';
import { MEDIA } from './media.constants';

export const WEBINAR = {
  STATUS: {
    ...STATUS,
    ...WEBINAR_STATUS,
    DRAFT: 'draft',
    SCHEDULED: 'scheduled',
    LIVE: 'live',
    ENDED: 'ended',
    RECORDED: 'recorded',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'webinar:view',
    CREATE: 'webinar:create',
    UPDATE: 'webinar:update',
    DELETE: 'webinar:delete',
    REGISTER: 'webinar:register',
  },
  WEBINAR_STATUS: { ...WEBINAR_STATUS },
  MEDIA: { ...MEDIA },
  WEBINAR_TYPES: {
    EDUCATIONAL: 'educational',
    PROMOTIONAL: 'promotional',
    TRAINING: 'training',
    DEMO: 'demo',
    CONFERENCE: 'conference',
  },
  MAX_ATTENDEES: 1000,
  MAX_DURATION_MINUTES: 120,
  MIN_DURATION_MINUTES: 15,
} as const;
