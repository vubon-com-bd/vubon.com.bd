import { Icon, type IconProps } from '../Icon';

export function MinusIcon(props: Omit<IconProps, 'children'>): JSX.Element {
  return (
    <Icon {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </Icon>
  );
}
