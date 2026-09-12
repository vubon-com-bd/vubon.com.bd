import { TypeObject } from '../common/types.types';
import { CONTENT_LICENSE } from '@vubon/shared-constants/src/content/content-license.constants';

export interface ContentLicense extends TypeObject {
  type: keyof typeof CONTENT_LICENSE.TYPES | string;
  category: 'content_license';
  licenseType: keyof typeof CONTENT_LICENSE.LICENSE_TYPES | string;
  isOpen: boolean;
  isClosed: boolean;
  isCustom: boolean;
  url?: string;
}

export type ContentLicenseKey = keyof typeof CONTENT_LICENSE.TYPES;
