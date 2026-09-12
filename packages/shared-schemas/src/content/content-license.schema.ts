import { z } from 'zod';
import { CONTENT_LICENSE } from '@vubon/shared-constants/src/content/content-license.constants';

const contentLicenseTypeKeys = Object.keys(CONTENT_LICENSE.TYPES) as [string, ...string[]];
const contentLicenseLicenseTypeKeys = Object.keys(CONTENT_LICENSE.LICENSE_TYPES) as [
  string,
  ...string[],
];

export const ContentLicenseSchema = z.object({
  license: z.enum(contentLicenseTypeKeys),
  category: z.literal('content_license'),
  licenseType: z.enum(contentLicenseLicenseTypeKeys),
  isOpen: z.boolean().default(false),
  isClosed: z.boolean().default(false),
  isCustom: z.boolean().default(false),
  url: z.string().url().optional(),
});

export const ContentLicenseEnumSchema = z.enum(contentLicenseTypeKeys);
