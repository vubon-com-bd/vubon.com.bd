import { useEffect, type RefObject } from 'react';

export type MutationCallback = (mutations: readonly MutationRecord[]) => void;

/** Observes DOM mutations on a target element. */
export function useMutationObserver<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: MutationCallback,
  options: MutationObserverInit = { childList: true, subtree: true }
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof MutationObserver === 'undefined') return;
    const observer = new MutationObserver((mutations) => callback(mutations));
    observer.observe(el, options);
    return () => observer.disconnect();
  }, [
    ref,
    callback,
    options.childList,
    options.subtree,
    options.attributes,
    options.characterData,
  ]);
}
