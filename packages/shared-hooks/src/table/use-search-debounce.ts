import { useSearch } from './use-search';
import { useDebounce } from '../primitive/timing/use-debounce';

export function useSearchDebounce(
  delayMs = 300,
  initial = ''
): {
  readonly value: string;
  readonly debouncedValue: string;
  readonly setValue: (value: string) => void;
  readonly clear: () => void;
} {
  const { value, setValue, clear } = useSearch(initial);
  const debouncedValue = useDebounce(value, delayMs);
  return { value, debouncedValue, setValue, clear };
}
