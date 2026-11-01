import type { HTMLAttributes } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  readonly src?: string;
  readonly alt: string;
  readonly name?: string;
  readonly size?: AvatarSize;
  readonly fallbackColor?: string;
}
