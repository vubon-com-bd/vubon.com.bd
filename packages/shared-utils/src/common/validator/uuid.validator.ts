/**
 * UUID Validator — uses REGEX.UUID (v4).
 */
import { REGEX } from '@vubon/shared-constants/src/common/regex.constants';

export const isValidUuid = (uuid: string): boolean => REGEX.UUID.test(uuid.trim());
