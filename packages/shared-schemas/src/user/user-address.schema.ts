/**
 * User Address Schema
 * ইউজার ঠিকানা সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_ADDRESS } from '@vubon/shared-constants';

export const UserAddressSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  type: z
    .enum([
      USER_ADDRESS.TYPES.SHIPPING,
      USER_ADDRESS.TYPES.BILLING,
      USER_ADDRESS.TYPES.BOTH,
      USER_ADDRESS.TYPES.OFFICE,
      USER_ADDRESS.TYPES.HOME,
      USER_ADDRESS.TYPES.OTHER,
    ])
    .default(USER_ADDRESS.DEFAULTS.TYPE),
  street: z
    .string()
    .min(
      USER_ADDRESS.VALIDATION.STREET_MIN_LENGTH,
      `Street must be at least ${USER_ADDRESS.VALIDATION.STREET_MIN_LENGTH} characters`
    )
    .max(
      USER_ADDRESS.VALIDATION.STREET_MAX_LENGTH,
      `Street must be less than ${USER_ADDRESS.VALIDATION.STREET_MAX_LENGTH} characters`
    ),
  city: z
    .string()
    .min(
      USER_ADDRESS.VALIDATION.CITY_MIN_LENGTH,
      `City must be at least ${USER_ADDRESS.VALIDATION.CITY_MIN_LENGTH} characters`
    )
    .max(
      USER_ADDRESS.VALIDATION.CITY_MAX_LENGTH,
      `City must be less than ${USER_ADDRESS.VALIDATION.CITY_MAX_LENGTH} characters`
    ),
  state: z
    .string()
    .min(
      USER_ADDRESS.VALIDATION.STATE_MIN_LENGTH,
      `State must be at least ${USER_ADDRESS.VALIDATION.STATE_MIN_LENGTH} characters`
    )
    .max(
      USER_ADDRESS.VALIDATION.STATE_MAX_LENGTH,
      `State must be less than ${USER_ADDRESS.VALIDATION.STATE_MAX_LENGTH} characters`
    ),
  country: z
    .enum([
      USER_ADDRESS.COUNTRIES.BD,
      USER_ADDRESS.COUNTRIES.US,
      USER_ADDRESS.COUNTRIES.UK,
      USER_ADDRESS.COUNTRIES.AE,
      USER_ADDRESS.COUNTRIES.IN,
      USER_ADDRESS.COUNTRIES.SG,
      USER_ADDRESS.COUNTRIES.MY,
    ])
    .default(USER_ADDRESS.DEFAULTS.COUNTRY),
  postalCode: z.string().regex(/^[0-9]{4}$/, 'Invalid postal code'),
  division: z
    .enum([
      USER_ADDRESS.DIVISIONS.DHAKA,
      USER_ADDRESS.DIVISIONS.CHITTAGONG,
      USER_ADDRESS.DIVISIONS.RAJSHAHI,
      USER_ADDRESS.DIVISIONS.KHULNA,
      USER_ADDRESS.DIVISIONS.BARISAL,
      USER_ADDRESS.DIVISIONS.SYLHET,
      USER_ADDRESS.DIVISIONS.RANGPUR,
      USER_ADDRESS.DIVISIONS.MYMENSINGH,
    ])
    .default(USER_ADDRESS.DEFAULTS.DIVISION),
  district: z.string().min(1, 'District is required'),
  upazila: z.string().optional(),
  union: z.string().optional(),
  isDefault: z.boolean().default(USER_ADDRESS.DEFAULTS.IS_DEFAULT),
  landmark: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UserAddressCreateSchema = UserAddressSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UserAddressUpdateSchema = UserAddressSchema.partial();

export type UserAddressSchemaType = z.infer<typeof UserAddressSchema>;
export type UserAddressCreateSchemaType = z.infer<typeof UserAddressCreateSchema>;
export type UserAddressUpdateSchemaType = z.infer<typeof UserAddressUpdateSchema>;
