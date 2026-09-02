import React from 'react';
import { Button, ButtonProps } from '../components/Button';

export interface NagadButtonProps extends Omit<ButtonProps, 'onClick' | 'children' | 'onError'> {
  amount: number;
  onSuccess: (data: unknown) => void;
  onError: (error: Error) => void;
  onCancel?: () => void;
  loading?: boolean;
  children?: React.ReactNode;
}

export const NagadButton: React.FC<NagadButtonProps> = ({
  amount,
  onSuccess,
  onError,
  onCancel,
  loading = false,
  children = 'Pay with Nagad',
  ...props
}) => {
  const handleClick = async () => {
    try {
      // Nagad payment integration will be implemented here
      // This is a placeholder for the actual Nagad payment flow
      const response = await fetch('/api/payment/nagad/initiate', {
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
      className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
    >
      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="4" />
        <path d="M8 8h8M8 12h8M8 16h4" stroke="white" strokeWidth="2" />
      </svg>
      {children}
    </Button>
  );
};
