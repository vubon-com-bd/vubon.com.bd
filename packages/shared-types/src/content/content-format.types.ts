import { TypeObject } from '../common/types.types';
import { CONTENT_FORMAT } from '@vubon/shared-constants/src/content/content-format.constants';

export interface ContentFormat extends TypeObject {
  type: keyof typeof CONTENT_FORMAT.TYPES | string;
  category: 'content_format';
  isText: boolean;
  isHtml: boolean;
  isMarkdown: boolean;
  isJson: boolean;
  isXml: boolean;
  isPdf: boolean;
  isDoc: boolean;
  isDocx: boolean;
  isTxt: boolean;
}

export type ContentFormatKey = keyof typeof CONTENT_FORMAT.TYPES;
