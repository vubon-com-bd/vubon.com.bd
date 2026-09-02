import React from 'react';
import { Button, ButtonProps } from '../components/Button';

export interface SSLCommerzButtonProps extends Omit<ButtonProps, 'onClick' | 'children' | 'onError'> {
  amount: number;
  onSuccess: (data: unknown) => void;
  onError: (error: Error) => void;
  onCancel?: () => void;
  loading?: boolean;
  children?: React.ReactNode;
}

export const SSLCommerzButton: React.FC<SSLCommerzButtonProps> = ({
  amount,
  onSuccess,
  onError,
  onCancel,
  loading = false,
  children = 'Pay with SSLCommerz',
  ...props
}) => {
  const handleClick = async () => {
    try {
      // SSLCommerz payment integration will be implemented here
      // This is a placeholder for the actual SSLCommerz payment flow
      const response = await fetch('/api/payment/sslcommerz/initiate', {
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
      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
    >
      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M6 8h12M6 12h8M6 16h4" stroke="white" strokeWidth="2" />
      </svg>
      {children}
    </Button>
  );
};
