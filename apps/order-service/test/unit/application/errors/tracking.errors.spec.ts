/**
 * Tracking Application Errors — Unit Tests
 * @module order-service/test/unit/application/errors
 */
import { describe, it, expect } from '@jest/globals';
import {
  TrackingNotFoundApplicationError,
  TrackingAddError,
  TrackingUpdateError,
} from '@application/errors/tracking.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

describe('TrackingNotFoundApplicationError', () => {
  it('has 404 status', () => {
    const err = new TrackingNotFoundApplicationError('trk-1');
    expect(err.name).toBe('TrackingNotFoundApplicationError');
    expect(err.httpStatus).toBe(404);
    expect(err).toBeInstanceOf(ApplicationError);
  });
});

describe('TrackingAddError', () => {
  it('has 400 status', () => {
    const err = new TrackingAddError('ord-1', 'invalid event');
    expect(err.name).toBe('TrackingAddError');
    expect(err.httpStatus).toBe(400);
  });
});

describe('TrackingUpdateError', () => {
  it('has 400 status', () => {
    const err = new TrackingUpdateError('trk-1', 'already final');
    expect(err.name).toBe('TrackingUpdateError');
    expect(err.httpStatus).toBe(400);
  });
});
