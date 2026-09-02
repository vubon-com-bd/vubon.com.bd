import React from 'react';
import { Button, ButtonProps } from '../components/Button';

export interface BkashButtonProps extends Omit<ButtonProps, 'onClick' | 'children' | 'onError'> {
  amount: number;
  onSuccess: (data: unknown) => void;
  onError: (error: Error) => void;
  onCancel?: () => void;
  loading?: boolean;
  children?: React.ReactNode;
}

export const BkashButton: React.FC<BkashButtonProps> = ({
  amount,
  onSuccess,
  onError,
  onCancel,
  loading = false,
  children = 'Pay with bKash',
  ...props
}) => {
  const handleClick = async () => {
    try {
      // bKash payment integration will be implemented here
      // This is a placeholder for the actual bKash payment flow
      const response = await fetch('/api/payment/bkash/initiate', {
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
      className="bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700"
    >
      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" />
      </svg>
      {children}
    </Button>
  );
};
