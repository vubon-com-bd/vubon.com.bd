import React from 'react';

export interface PriceBreakdownItem {
  label: string;
  labelBangla?: string;
  amount: number;
  type?: 'subtotal' | 'discount' | 'tax' | 'shipping' | 'total' | 'custom';
}

export interface PriceBreakdownProps {
  items: PriceBreakdownItem[];
  currency?: string;
  currencySymbol?: string;
  showTotal?: boolean;
  className?: string;
}

export const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  items,
  currency = 'BDT',
  currencySymbol = '৳',
  showTotal = true,
  className = '',
}) => {
  const formatPrice = (amount: number): string => {
    return `${currencySymbol} ${amount.toFixed(2)}`;
  };

  const getItemColor = (type?: string): string => {
    switch (type) {
      case 'discount':
        return 'text-green-600';
      case 'tax':
        return 'text-yellow-600';
      case 'shipping':
        return 'text-blue-600';
      case 'total':
        return 'text-gray-900 font-bold text-lg';
      default:
        return 'text-gray-700';
    }
  };

  const getBorderClass = (type?: string): string => {
    if (type === 'total') return 'border-t-2 border-gray-300 pt-2 mt-2';
    if (type === 'subtotal') return 'border-b border-gray-200 pb-2 mb-2';
    return '';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex items-center justify-between ${getBorderClass(item.type)}`}
        >
          <span className={`${getItemColor(item.type)}`}>
            {item.labelBangla || item.label}
          </span>
          <span className={`${getItemColor(item.type)}`}>
            {formatPrice(item.amount)}
          </span>
        </div>
      ))}
    </div>
  );
};
