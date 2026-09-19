import { Icon, type IconProps } from '../Icon';

export function GoogleIcon(props: Omit<IconProps, 'children'>): JSX.Element {
  return (
    <Icon {...props} stroke="none" fill="currentColor">
      <path d="M21.35 11.1H12v2.9h5.3c-.23 1.4-1.7 4.1-5.3 4.1-3.19 0-5.8-2.64-5.8-5.9s2.61-5.9 5.8-5.9c1.82 0 3.04.78 3.74 1.45l2.55-2.46C16.7 3.6 14.58 2.8 12 2.8 6.84 2.8 2.65 6.99 2.65 12.2s4.19 9.4 9.35 9.4c5.4 0 8.97-3.8 8.97-9.15 0-.62-.07-1.09-.15-1.55z" />
    </Icon>
  );
}
