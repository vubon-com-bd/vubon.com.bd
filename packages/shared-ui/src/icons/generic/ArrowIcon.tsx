import { Icon, type IconProps } from '../Icon';

export type ArrowDirection = 'up' | 'down' | 'left' | 'right';

export interface ArrowIconProps extends Omit<IconProps, 'children'> {
  readonly direction?: ArrowDirection;
}

const rotation: Record<ArrowDirection, number> = {
  up: 0,
  right: 90,
  down: 180,
  left: 270,
};

export function ArrowIcon({
  direction = 'right',
  ...props
}: ArrowIconProps): JSX.Element {
  return (
    <Icon {...props} style={{ transform: `rotate(${rotation[direction]}deg)`, ...props.style }}>
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </Icon>
  );
}
