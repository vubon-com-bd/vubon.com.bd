import { z } from 'zod';
import { COUNTRY } from '@vubon/shared-constants';
import { DIVISIONS } from '@vubon/shared-constants';
import { DISTRICTS } from '@vubon/shared-constants';
import { UPAZILAS } from '@vubon/shared-constants';

export const AddressSchema = z.object({
  street: z.string().min(3).max(255),
  city: z.string().min(2).max(100),
  state: z.string().max(100).optional(),
  postalCode: z.string().min(4).max(20),
  country: z.enum(Object.keys(COUNTRY) as [string, ...string[]]),
  division: z.enum(Object.keys(DIVISIONS) as [string, ...string[]]).optional(),
  district: z.enum(Object.keys(DISTRICTS) as [string, ...string[]]).optional(),
  upazila: z.enum(Object.keys(UPAZILAS) as [string, ...string[]]).optional(),
});

export const AddressCreateSchema = AddressSchema;
