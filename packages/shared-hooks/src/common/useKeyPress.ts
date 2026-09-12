import { useState, useEffect } from 'react';
import { KEYBOARD_KEYS } from '@vubon/shared-constants/src/common/use.constants';

type TargetKey = string | string[];

export const useKeyPress = (targetKey: TargetKey): boolean => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const keys = Array.isArray(targetKey) ? targetKey : [targetKey];
    const downHandler = (e: KeyboardEvent) => {
      if (keys.includes(e.key)) setKeyPressed(true);
    };
    const upHandler = (e: KeyboardEvent) => {
      if (keys.includes(e.key)) setKeyPressed(false);
    };
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return keyPressed;
};

export const useEscapeKey = (handler: () => void): void => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === KEYBOARD_KEYS.ESCAPE) handler();
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [handler]);
};

export const useEnterKey = (handler: () => void): void => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === KEYBOARD_KEYS.ENTER) handler();
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [handler]);
};
