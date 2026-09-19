import { Icon, type IconProps } from '../Icon';

export type ChevronDirection = 'up' | 'down' | 'left' | 'right';

export interface ChevronIconProps extends Omit<IconProps, 'children'> {
  readonly direction?: ChevronDirection;
}

const paths: Record<ChevronDirection, string> = {
  up: 'M18 15l-6-6-6 6',
  down: 'M6 9l6 6 6-6',
  left: 'M15 18l-6-6 6-6',
  right: 'M9 18l6-6-6-6',
};

export function ChevronIcon({ direction = 'down', ...props }: ChevronIconProps): JSX.Element {
  return (
    <Icon {...props}>
      <polyline points={paths[direction]} />
    </Icon>
  );
}
