/**
 * Type Value Types
 * @module shared-types/common/enums
 *
 * Values আসে shared-constants/common/type.constants থেকে।
 */

import type { DATA_TYPE } from '@vubon/shared-constants/common';

export type DataTypeValue = (typeof DATA_TYPE)[keyof typeof DATA_TYPE];

export interface TypeMetadata {
  readonly value: DataTypeValue;
  readonly label: string;
  readonly isPrimitive: boolean;
}
