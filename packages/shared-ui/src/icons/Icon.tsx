import { forwardRef } from 'react';
import type { SVGProps } from 'react';
import { iconSizes, type IconSizeKey } from '../tokens/icons';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'size'> {
  readonly size?: IconSizeKey | number;
  readonly label?: string;
  readonly children: React.ReactNode;
}

/**
 * Base icon wrapper.
 * - `currentColor` for fill/stroke
 * - `aria-hidden` by default; `label` → `role="img"`
 * - `focusable="false"` (IE)
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  function Icon({ size = 'md', label, children, ...rest }, ref) {
    const px = typeof size === 'number' ? size : iconSizes[size];
    const isDecorative = !label;

    return (
      <svg
        ref={ref}
        width={px}
        height={px}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden={isDecorative || undefined}
        role={isDecorative ? undefined : 'img'}
        aria-label={label}
        {...rest}
      >
        {children}
      </svg>
    );
  },
);

Icon.displayName = 'Icon';
