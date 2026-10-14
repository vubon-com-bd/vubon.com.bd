/**
 * Unit Test Setup
 * @module vendor-service/test/unit
 */
import { jest } from '@jest/globals';

(globalThis as Record<string, unknown>)['jest'] = jest;

export {};
