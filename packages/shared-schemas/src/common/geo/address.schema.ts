/**
 * Address Schema
 * @module shared-schemas/common/geo
 *
 * Values আসে shared-constants/common থেকে:
 * - COUNTRY
 * - DIVISION
 * - DISTRICT
 */

import { z } from 'zod';
import { COUNTRY, DIVISION, DISTRICT } from '@vubon/shared-constants/common';

export const CountryCodeSchema = z.enum(Object.values(COUNTRY) as [string, ...string[]]);

export const DivisionSchema = z.enum(Object.values(DIVISION) as [string, ...string[]]);

export const DistrictSchema = z.enum(Object.values(DISTRICT) as [string, ...string[]]);

export const AddressSchema = z.object({
  line1: z.string().trim().min(3).max(255),
  line2: z.string().trim().max(255).optional(),
  city: z.string().trim().min(2).max(100),
  state: z.string().trim().max(100).optional(),
  district: z.union([DistrictSchema, z.string().min(1).max(100)]).optional(),
  division: z.union([DivisionSchema, z.string().min(1).max(100)]).optional(),
  postalCode: z.string().trim().max(20).optional(),
  country: z.union([CountryCodeSchema, z.string().min(2).max(3)]),
  landmark: z.string().trim().max(200).optional(),
  label: z.string().trim().max(50).optional(),
});

export const StructuredAddressSchema = AddressSchema.extend({
  upazila: z.string().trim().max(100).optional(),
  union: z.string().trim().max(100).optional(),
  ward: z.string().trim().max(50).optional(),
  area: z.string().trim().max(100).optional(),
  houseNumber: z.string().trim().max(50).optional(),
  roadNumber: z.string().trim().max(50).optional(),
});

export const GeoAddressSchema = AddressSchema.extend({
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

export type CountryCodeSchemaType = z.infer<typeof CountryCodeSchema>;
export type DivisionSchemaType = z.infer<typeof DivisionSchema>;
export type DistrictSchemaType = z.infer<typeof DistrictSchema>;
export type AddressSchemaType = z.infer<typeof AddressSchema>;
export type StructuredAddressSchemaType = z.infer<typeof StructuredAddressSchema>;
export type GeoAddressSchemaType = z.infer<typeof GeoAddressSchema>;
