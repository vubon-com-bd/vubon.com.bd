import { z } from 'zod';
import { COUNTRY } from '@vubon/shared-constants/src/common/country.constants';
import { DIVISIONS } from '@vubon/shared-constants/src/common/divisions.constants';
import { DISTRICTS } from '@vubon/shared-constants/src/common/districts.constants';
import { UPAZILAS } from '@vubon/shared-constants/src/common/upazilas.constants';

/**
 * Country codes — key and value are both 'BD', 'US', so Object.values works.
 */
const countryValues = Object.values(COUNTRY) as [string, ...string[]];

/**
 * Division values (Bengali: 'ঢাকা', 'চট্টগ্রাম', ...) — not keys.
 */
const divisionValues = Object.values(DIVISIONS) as [string, ...string[]];

/**
 * District and upazila values (Bengali strings).
 */
const districtValues = Object.values(DISTRICTS) as [string, ...string[]];
const upazilaValues = Object.values(UPAZILAS) as [string, ...string[]];

export const AddressSchema = z.object({
  street: z.string().min(3).max(255),
  city: z.string().min(2).max(100),
  state: z.string().max(100).optional(),
  postalCode: z.string().min(4).max(20),
  country: z.enum(countryValues),
  division: z.enum(divisionValues).optional(),
  district: z.enum(districtValues).optional(),
  upazila: z.enum(upazilaValues).optional(),
});

export const AddressCreateSchema = AddressSchema;
