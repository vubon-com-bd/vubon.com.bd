'use client';
import { forwardRef, useState, type SyntheticEvent } from 'react';
import { cn } from '../../utils/cn';
import type { ImageProps } from './image.types';

/**
 * Image primitive.
 * - Requires explicit width/height (prevents layout shift)
 * - Lazy by default
 * - Fallback src on error
 */
export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  { src, alt, width, height, eager, fallbackSrc, className, onError, ...rest },
  ref
) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = (e: SyntheticEvent<HTMLImageElement>): void => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }
    setHasError(true);
    onError?.(e);
  };

  return (
    <img
      ref={ref}
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={handleError}
      data-error={hasError || undefined}
      className={cn('block max-w-full', className)}
      {...rest}
    />
  );
});

Image.displayName = 'Image';
