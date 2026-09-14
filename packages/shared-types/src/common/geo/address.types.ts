/**
 * Address Types
 * @module shared-types/common/geo
 *
 * Values আসে shared-constants/common থেকে:
 * - COUNTRY
 * - DIVISION
 * - DISTRICT
 * - UPAZILA
 */

import type { COUNTRY, DIVISION, DISTRICT } from '@vubon/shared-constants/common';

export type CountryCode = (typeof COUNTRY)[keyof typeof COUNTRY];
export type DivisionCode = (typeof DIVISION)[keyof typeof DIVISION];
export type DistrictCode = (typeof DISTRICT)[keyof typeof DISTRICT];

export interface Address {
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly state?: string;
  readonly district?: DistrictCode | string;
  readonly division?: DivisionCode | string;
  readonly postalCode?: string;
  readonly country: CountryCode | string;
  readonly landmark?: string;
  readonly label?: string;
}

export interface StructuredAddress extends Address {
  readonly upazila?: string;
  readonly union?: string;
  readonly ward?: string;
  readonly area?: string;
  readonly houseNumber?: string;
  readonly roadNumber?: string;
}

export interface GeoAddress extends Address {
  readonly latitude?: number;
  readonly longitude?: number;
}

export interface AddressInput {
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly state?: string;
  readonly postalCode?: string;
  readonly country: string;
}
