import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { DIVISIONS } from '@vubon/shared-constants/src/common/divisions.constants';
import { DISTRICTS } from '@vubon/shared-constants/src/common/districts.constants';
import { ZONE } from '@vubon/shared-constants/src/logistics/zone.constants';

const zoneStatusKeys = Object.keys(ZONE.STATUS) as [string, ...string[]];
const zoneTypeKeys = Object.keys(ZONE.TYPES) as [string, ...string[]];
const zonePriorityKeys = Object.keys(ZONE.ZONE_PRIORITY) as [string, ...string[]];
const divisionKeys = Object.keys(DIVISIONS) as [string, ...string[]];
const districtKeys = Object.keys(DISTRICTS) as [string, ...string[]];

export const ZoneSchema = BaseSchema.extend({
  zoneId: z.string().uuid(),
  name: z.string().min(1).max(100),
  code: z.string().min(1).max(50),
  status: z.enum(zoneStatusKeys),
  type: z.enum(zoneTypeKeys),
  priority: z.enum(zonePriorityKeys),
  division: z.enum(divisionKeys),
  districts: z.array(z.enum(districtKeys)),
  coverageRadius: z.number().positive(),
  isActive: z.boolean().default(true),
  isUnderReview: z.boolean().default(false),
  centerPoint: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  boundary: z.object({
    type: z.enum(['polygon', 'circle']),
    coordinates: z.array(
      z.object({
        latitude: z.number(),
        longitude: z.number(),
      })
    ),
    radius: z.number().optional(),
  }),
  metadata: z.object({
    population: z.number().min(0),
    area: z.number().positive(),
    language: z.string(),
    timezone: z.string(),
    notes: z.string().optional(),
  }),
});
