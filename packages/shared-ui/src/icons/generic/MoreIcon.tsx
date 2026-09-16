import { Icon, type IconProps } from '../Icon';

export type MoreOrientation = 'horizontal' | 'vertical';

export interface MoreIconProps extends Omit<IconProps, 'children'> {
  readonly orientation?: MoreOrientation;
}

export function MoreIcon({
  orientation = 'vertical',
  ...props
}: MoreIconProps): JSX.Element {
  if (orientation === 'horizontal') {
    return (
      <Icon {...props}>
        <circle cx="5" cy="12" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <circle cx="19" cy="12" r="1.5" fill="currentColor" />
      </Icon>
    );
  }
  return (
    <Icon {...props}>
      <circle cx="12" cy="5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" />
    </Icon>
  );
}
