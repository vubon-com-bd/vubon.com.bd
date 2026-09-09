import { z } from 'zod';
import { COUNTRY } from '@vubon/shared-constants/src/common/country.constants';
import { DIVISIONS } from '@vubon/shared-constants/src/common/divisions.constants';
import { DISTRICTS } from '@vubon/shared-constants/src/common/districts.constants';
import { UPAZILAS } from '@vubon/shared-constants/src/common/upazilas.constants';

const countryKeys = Object.keys(COUNTRY) as [string, ...string[]];
const divisionKeys = Object.keys(DIVISIONS) as [string, ...string[]];
const districtKeys = Object.keys(DISTRICTS) as [string, ...string[]];
const upazilaKeys = Object.keys(UPAZILAS) as [string, ...string[]];

export const AddressSchema = z.object({
  street: z.string().min(3).max(255),
  city: z.string().min(2).max(100),
  state: z.string().max(100).optional(),
  postalCode: z.string().min(4).max(20),
  country: z.enum(countryKeys),
  division: z.enum(divisionKeys).optional(),
  district: z.enum(districtKeys).optional(),
  upazila: z.enum(upazilaKeys).optional(),
});

export const AddressCreateSchema = AddressSchema;
