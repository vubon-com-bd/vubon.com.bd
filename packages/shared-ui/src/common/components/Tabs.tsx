import React, { ReactNode, useState } from 'react';

export interface TabItem {
  key: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onChange?: (key: string) => void;
  variant?: 'line' | 'pill' | 'card';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab: controlledActiveTab,
  onChange,
  variant = 'line',
  className = '',
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<string>(
    tabs[0]?.key || ''
  );

  const activeTab = controlledActiveTab ?? internalActiveTab;

  const handleTabChange = (key: string) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(key);
    }
    onChange?.(key);
  };

  const variantStyles = {
    line: {
      container: 'border-b border-gray-200',
      tab: (isActive: boolean, disabled: boolean) =>
        `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
          isActive
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
        } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`,
    },
    pill: {
      container: 'flex gap-2 bg-gray-100 p-1 rounded-lg',
      tab: (isActive: boolean, disabled: boolean) =>
        `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`,
    },
    card: {
      container: 'flex gap-1 border-b border-gray-200',
      tab: (isActive: boolean, disabled: boolean) =>
        `px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
          isActive
            ? 'bg-white border border-b-0 border-gray-200 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`,
    },
  };

  const activeTabContent = tabs.find((tab) => tab.key === activeTab)?.content;

  return (
    <div className={className}>
      <div className={variantStyles[variant].container}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => !tab.disabled && handleTabChange(tab.key)}
            className={variantStyles[variant].tab(activeTab === tab.key, tab.disabled || false)}
            disabled={tab.disabled}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{activeTabContent}</div>
    </div>
  );
};
