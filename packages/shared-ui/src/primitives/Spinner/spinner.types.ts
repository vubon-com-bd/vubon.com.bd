export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps {
  readonly size?: SpinnerSize;
  readonly label?: string;
  readonly className?: string;
}
