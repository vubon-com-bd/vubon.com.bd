import { z } from 'zod';
import { NAME } from '@vubon/shared-constants/src/common/name.constants';

/**
 * Name schema — uses NAME constants.
 * Supports Unicode letters (Bangla, English, Arabic, etc.) with accents.
 */
const nameString = (label: string, max: number) =>
  z
    .string()
    .min(NAME.MIN_LENGTH, `${label} is required`)
    .max(max, `${label} must not exceed ${max} characters`)
    .regex(NAME.ALLOWED_CHARS_REGEX, `${label} contains invalid characters`);

export const NameSchema = z.object({
  firstName: nameString('First name', NAME.FIRST_NAME_MAX),
  lastName: nameString('Last name', NAME.LAST_NAME_MAX),
  middleName: nameString('Middle name', NAME.MIDDLE_NAME_MAX).optional(),
});
