import React from 'react';
import { Button, ButtonProps } from '../components/Button';

export interface RocketButtonProps extends Omit<ButtonProps, 'onClick' | 'children' | 'onError'> {
  amount: number;
  onSuccess: (data: unknown) => void;
  onError: (error: Error) => void;
  onCancel?: () => void;
  loading?: boolean;
  children?: React.ReactNode;
}

export const RocketButton: React.FC<RocketButtonProps> = ({
  amount,
  onSuccess,
  onError,
  onCancel,
  loading = false,
  children = 'Pay with Rocket',
  ...props
}) => {
  const handleClick = async () => {
    try {
      // Rocket payment integration will be implemented here
      // This is a placeholder for the actual Rocket payment flow
      const response = await fetch('/api/payment/rocket/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error('Payment initiation failed');
      }

      const data = await response.json();
      onSuccess(data);
    } catch (error) {
      onError(error as Error);
    }
  };

  return (
    <Button
      {...props}
      onClick={handleClick}
      loading={loading}
      className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
    >
      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" />
      </svg>
      {children}
    </Button>
  );
};
