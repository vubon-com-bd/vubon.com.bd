import { useState, useCallback } from 'react';

export interface Tab {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface UseTabsReturn {
  tabs: Tab[];
  activeTabId: string;
  activeTab: Tab | undefined;
  activeIndex: number;
  setActiveTab: (id: string) => void;
  nextTab: () => void;
  previousTab: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const useTabs = (tabs: Tab[], initialTabId?: string): UseTabsReturn => {
  const [activeTabId, setActiveTabId] = useState(initialTabId ?? tabs[0]?.id ?? '');

  const activeTab = tabs.find((t) => t.id === activeTabId);
  const activeIndex = tabs.findIndex((t) => t.id === activeTabId);

  const setActiveTab = useCallback(
    (id: string) => {
      const tab = tabs.find((t) => t.id === id);
      if (tab && !tab.disabled) setActiveTabId(id);
    },
    [tabs]
  );

  const nextTab = useCallback(() => {
    if (tabs.length === 0) return;
    const nextIndex = (activeIndex + 1) % tabs.length;
    const next = tabs[nextIndex];
    if (next && !next.disabled) setActiveTabId(next.id);
  }, [activeIndex, tabs]);

  const previousTab = useCallback(() => {
    if (tabs.length === 0) return;
    const prevIndex = (activeIndex - 1 + tabs.length) % tabs.length;
    const prev = tabs[prevIndex];
    if (prev && !prev.disabled) setActiveTabId(prev.id);
  }, [activeIndex, tabs]);

  return {
    tabs,
    activeTabId,
    activeTab,
    activeIndex,
    setActiveTab,
    nextTab,
    previousTab,
    isFirst: activeIndex === 0,
    isLast: activeIndex === tabs.length - 1,
  };
};
