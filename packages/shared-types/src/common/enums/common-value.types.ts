/**
 * Common Value Types
 * @module shared-types/common/enums
 *
 * Cross-cutting value types — device, environment, log level ইত্যাদি।
 */

import type { DEVICE_TYPE, ENVIRONMENT, LOG_LEVEL } from '@vubon/shared-constants/common';

export type DeviceTypeValue = (typeof DEVICE_TYPE)[keyof typeof DEVICE_TYPE];

export type EnvNameValue = (typeof ENVIRONMENT)[keyof typeof ENVIRONMENT];

export type LogLevelValue = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];

export interface EnvironmentMetadata {
  readonly value: EnvNameValue;
  readonly isProduction: boolean;
  readonly isDevelopment: boolean;
}

export interface LogLevelMetadata {
  readonly value: LogLevelValue;
  readonly priority: number;
  readonly color: string;
}
