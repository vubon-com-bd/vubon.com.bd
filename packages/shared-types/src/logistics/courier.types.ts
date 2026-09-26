/**
 * Courier Types
 * @module shared-types/logistics
 *
 * Values আসে shared-constants/logistics/courier.constants থেকে।
 */

import type { COURIER_STATUS, COURIER_TYPE, COURIER_NAME } from '@vubon/shared-constants/logistics';
import type { BaseEntity } from '../common/base';
import type { Url, Phone, Email } from '../common/primitives';

export type CourierStatusValue = (typeof COURIER_STATUS)[keyof typeof COURIER_STATUS];

export type CourierTypeValue = (typeof COURIER_TYPE)[keyof typeof COURIER_TYPE];

export type CourierNameValue = (typeof COURIER_NAME)[keyof typeof COURIER_NAME];

export interface Courier extends BaseEntity<string> {
  readonly name: string;
  readonly code: CourierNameValue | string;
  readonly displayName: string;
  readonly type: CourierTypeValue;
  readonly status: CourierStatusValue;
  readonly logoUrl?: Url;
  readonly website?: Url;
  readonly contactPhone?: Phone;
  readonly contactEmail?: Email;
  readonly trackingUrlTemplate?: string;
  readonly apiEnabled: boolean;
  readonly coverageZones?: readonly string[];
  readonly supportsCOD: boolean;
  readonly supportsInsurance: boolean;
  readonly supportsInternational: boolean;
  readonly averageDeliveryDays: number;
  readonly isDefault: boolean;
  readonly priority: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CourierPublic {
  readonly id: string;
  readonly name: string;
  readonly displayName: string;
  readonly type: CourierTypeValue;
  readonly status: CourierStatusValue;
  readonly logoUrl?: Url;
  readonly supportsCOD: boolean;
}

export interface CourierApiConfig {
  readonly courierId: string;
  readonly apiKeyName: string;
  readonly baseUrl: string;
  readonly webhookSecretName?: string;
  readonly timeout: number;
  readonly retryAttempts: number;
  readonly isEnabled: boolean;
}

export interface CourierListFilter {
  readonly status?: CourierStatusValue;
  readonly type?: CourierTypeValue;
  readonly supportsCOD?: boolean;
  readonly supportsInternational?: boolean;
  readonly search?: string;
}
