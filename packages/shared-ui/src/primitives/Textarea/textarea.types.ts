import type { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly invalid?: boolean;
  readonly resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}
