import type { ImgHTMLAttributes } from 'react';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly eager?: boolean;
  readonly fallbackSrc?: string;
}
