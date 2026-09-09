import { z } from 'zod';
import { NAME_MAX_LENGTH } from '@vubon/shared-constants/src/common/validation.constants';

export const NameSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(NAME_MAX_LENGTH, `First name must not exceed ${NAME_MAX_LENGTH} characters`),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(NAME_MAX_LENGTH, `Last name must not exceed ${NAME_MAX_LENGTH} characters`),
  middleName: z
    .string()
    .max(NAME_MAX_LENGTH, `Middle name must not exceed ${NAME_MAX_LENGTH} characters`)
    .optional(),
});
