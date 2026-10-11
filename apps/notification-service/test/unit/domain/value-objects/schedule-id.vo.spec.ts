import { describe, it, expect } from '@jest/globals';
import { ScheduleIdVO } from '../../../../src/module/domain/value-objects/primitives/schedule-id.vo.js';
import { makeUuid } from '../../../helpers/test-factories.js';

describe('ScheduleIdVO', () => {
  it('create valid', () => expect(ScheduleIdVO.create(makeUuid()).value).toBeDefined());
  it('rejects empty', () => expect(() => ScheduleIdVO.create('')).toThrow());
  it('rejects bad', () => expect(() => ScheduleIdVO.create('x')).toThrow());
  it('reconstitute', () => expect(ScheduleIdVO.reconstitute('any').value).toBe('any'));
});
