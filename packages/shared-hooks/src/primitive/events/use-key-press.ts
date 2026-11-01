import { useEffect, useState } from 'react';

/** True while the given key is pressed. */
export function useKeyPress(targetKey: string): boolean {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent): void => {
      if (e.key === targetKey) setPressed(true);
    };
    const up = (e: KeyboardEvent): void => {
      if (e.key === targetKey) setPressed(false);
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [targetKey]);

  return pressed;
}
