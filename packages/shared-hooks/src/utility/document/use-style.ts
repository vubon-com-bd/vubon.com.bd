import { useEffect } from 'react';

/** Injects a <style> tag while mounted. */
export function useStyle(css: string, id?: string): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const style = document.createElement('style');
    if (id) style.setAttribute('data-hook-id', id);
    style.textContent = css;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, [css, id]);
}
