import { Icon, type IconProps } from '../Icon';

export function TelegramIcon(props: Omit<IconProps, 'children'>): JSX.Element {
  return (
    <Icon {...props} stroke="none" fill="currentColor">
      <path d="M23.9 3.6L20.3 20c-.27 1.2-.98 1.5-1.98.94l-5.46-4.02-2.64 2.54c-.29.29-.53.53-1.08.53l.38-5.4L19.9 5.66c.43-.38-.09-.6-.66-.22L6.1 13.36.66 11.66c-1.18-.37-1.2-1.18.24-1.74l21.5-8.29c.98-.36 1.84.22 1.5 2z" />
    </Icon>
  );
}
