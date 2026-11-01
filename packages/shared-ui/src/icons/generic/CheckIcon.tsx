import { Icon, type IconProps } from '../Icon';

export function CheckIcon(props: Omit<IconProps, 'children'>): JSX.Element {
  return (
    <Icon {...props}>
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  );
}
