/**
 * Unit Test Setup — make jest globals available
 */
import { jest } from '@jest/globals';

// Make jest globally available
(globalThis as Record<string, unknown>)['jest'] = jest;
