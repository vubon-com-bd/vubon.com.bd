import { z } from 'zod';
import { DIVISIONS } from '@vubon/shared-constants';
import { REGEX } from '@vubon/shared-constants';

/**
 * Address Schema
 * ঠিকানা স্কিমা
 */
export const AddressSchema = z.object({
  id: z.string().uuid(),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  zipCode: z.string().regex(REGEX.POSTAL_CODE, 'Invalid postal code'),
  division: z.enum([
    DIVISIONS.DHAKA,
    DIVISIONS.CHITTAGONG,
    DIVISIONS.RAJSHAHI,
    DIVISIONS.KHULNA,
    DIVISIONS.BARISAL,
    DIVISIONS.SYLHET,
    DIVISIONS.RANGPUR,
    DIVISIONS.MYMENSINGH,
  ]),
  district: z.string().min(1, 'District is required'),
  upazila: z.string().optional(),
  union: z.string().optional(),
  isDefault: z.boolean().default(false),
  addressType: z.enum(['shipping', 'billing', 'both']).default('both'),
  landmark: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  userId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * Create Address Schema
 * ঠিকানা তৈরি স্কিমা
 */
export const CreateAddressSchema = AddressSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
}).extend({
  userId: z.string().uuid().optional(),
});

/**
 * Update Address Schema
 * ঠিকানা আপডেট স্কিমা
 */
export const UpdateAddressSchema = CreateAddressSchema.partial();

/**
 * Address with Full Details Schema
 * সম্পূর্ণ ঠিকানা স্কিমা
 */
export const AddressWithFullDetailsSchema = AddressSchema.extend({
  divisionName: z.string(),
  divisionNameBangla: z.string(),
  districtName: z.string(),
  upazilaName: z.string().optional(),
  unionName: z.string().optional(),
  fullAddress: z.string(),
  fullAddressBangla: z.string(),
});

export type AddressSchemaType = z.infer<typeof AddressSchema>;
export type CreateAddressSchemaType = z.infer<typeof CreateAddressSchema>;
export type UpdateAddressSchemaType = z.infer<typeof UpdateAddressSchema>;
export type AddressWithFullDetailsSchemaType = z.infer<typeof AddressWithFullDetailsSchema>;
