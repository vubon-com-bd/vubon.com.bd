import { useCallback, useState } from 'react';

export function useSearch(initial = ''): {
  readonly value: string;
  readonly setValue: (value: string) => void;
  readonly clear: () => void;
} {
  const [value, setValue] = useState(initial);
  const clear = useCallback(() => setValue(''), []);
  return { value, setValue, clear };
}
