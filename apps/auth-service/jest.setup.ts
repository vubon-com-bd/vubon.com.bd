/**
 * Jest global setup — silent env loader warnings.
 */
// Suppress dotenv injection banners from shared-config
const originalLog = console.log;
const originalError = console.error;

console.log = (...args: unknown[]) => {
  const first = String(args[0] ?? '');
  if (first.includes('◇ injected env') || first.includes('[dotenv@')) return;
  originalLog(...args);
};

console.error = (...args: unknown[]) => {
  const first = String(args[0] ?? '');
  if (first.includes('[dotenv@') || first.includes('injecting env')) return;
  originalError(...args);
};
