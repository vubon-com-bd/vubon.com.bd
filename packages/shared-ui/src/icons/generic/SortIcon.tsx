import { Icon, type IconProps } from '../Icon';

export type SortDirection = 'asc' | 'desc' | 'none';

export interface SortIconProps extends Omit<IconProps, 'children'> {
  readonly direction?: SortDirection;
}

export function SortIcon({ direction = 'none', ...props }: SortIconProps): JSX.Element {
  return (
    <Icon {...props}>
      <polyline
        points="8 6 12 2 16 6"
        opacity={direction === 'desc' || direction === 'none' ? 0.3 : 1}
      />
      <polyline
        points="8 18 12 22 16 18"
        opacity={direction === 'asc' || direction === 'none' ? 0.3 : 1}
      />
    </Icon>
  );
}
