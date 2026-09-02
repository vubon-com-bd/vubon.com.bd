import React, { ReactNode, useState } from 'react';

export interface AccordionItem {
  key: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultExpanded?: string[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  multiple = false,
  defaultExpanded = [],
  className = '',
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpanded);

  const toggleItem = (key: string) => {
    if (multiple) {
      setExpandedItems((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      );
    } else {
      setExpandedItems((prev) => (prev.includes(key) ? [] : [key]));
    }
  };

  return (
    <div className={`divide-y divide-gray-200 ${className}`}>
      {items.map((item) => {
        const isExpanded = expandedItems.includes(item.key);
        return (
          <div key={item.key} className="py-2">
            <button
              onClick={() => !item.disabled && toggleItem(item.key)}
              className={`flex w-full items-center justify-between text-left transition-colors ${
                item.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-50'
              }`}
              disabled={item.disabled}
            >
              <span className="text-sm font-medium text-gray-900">{item.title}</span>
              <svg
                className={`h-5 w-5 transform text-gray-500 transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                isExpanded ? 'max-h-96 mt-2' : 'max-h-0'
              }`}
            >
              <div className="text-sm text-gray-600">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
