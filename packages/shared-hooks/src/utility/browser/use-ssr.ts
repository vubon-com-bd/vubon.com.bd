/** True if running on server. */
export function useSSR(): boolean {
  return typeof window === 'undefined';
}
