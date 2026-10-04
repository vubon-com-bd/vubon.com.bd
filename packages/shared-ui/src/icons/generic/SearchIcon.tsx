import { Icon, type IconProps } from '../Icon';

export function SearchIcon(props: Omit<IconProps, 'children'>): JSX.Element {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="7" />
      <line x1="20" y1="20" x2="16.65" y2="16.65" />
    </Icon>
  );
}
