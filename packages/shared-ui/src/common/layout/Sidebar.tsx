import React, { ReactNode, useState } from 'react';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  children?: SidebarItem[];
  active?: boolean;
}

export interface SidebarProps {
  items: SidebarItem[];
  className?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onItemClick?: (item: SidebarItem) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  className = '',
  collapsible = true,
  defaultCollapsed = false,
  onItemClick,
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleCollapse = () => {
    if (collapsible) {
      setCollapsed(!collapsed);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderItem = (item: SidebarItem, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = item.active;

    return (
      <div key={item.id} className="w-full">
        <div
          className={`flex cursor-pointer items-center rounded-lg px-3 py-2 transition-colors ${
            isActive
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
          } ${depth > 0 ? 'ml-4' : ''}`}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.id);
            }
            if (item.href) {
              onItemClick?.(item);
            }
          }}
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {!collapsed && (
            <>
              <span className="flex-1 text-sm font-medium">{item.label}</span>
              {hasChildren && (
                <svg
                  className={`h-4 w-4 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </>
          )}
        </div>
        {hasChildren && isExpanded && !collapsed && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all ${
        collapsed ? 'w-16' : 'w-64'
      } ${className}`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!collapsed && <h2 className="text-lg font-semibold">Menu</h2>}
          {collapsible && (
            <button
              onClick={toggleCollapse}
              className="rounded-lg p-1 hover:bg-gray-100"
            >
              <svg
                className={`h-5 w-5 transition-transform ${
                  collapsed ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          )}
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {items.map((item) => renderItem(item))}
          </div>
        </nav>
      </div>
    </aside>
  );
};
