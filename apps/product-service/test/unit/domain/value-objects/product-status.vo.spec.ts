/**
 * ProductStatusVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ProductStatusVO } from '../../../../src/module/domain/value-objects/primitives/product-status.vo.js';

describe('ProductStatusVO', () => {
  describe('create()', () => {
    it('creates draft', () => {
      expect(ProductStatusVO.create('draft').value).toBe('draft');
    });
    it('creates published', () => {
      expect(ProductStatusVO.create('published').value).toBe('published');
    });
    it('normalizes case + trims', () => {
      expect(ProductStatusVO.create('  DRAFT  ').value).toBe('draft');
    });
    it('throws for unknown status', () => {
      expect(() => ProductStatusVO.create('unknown')).toThrow();
    });
  });

  describe('static factories', () => {
    it('draft()', () => expect(ProductStatusVO.draft().value).toBe('draft'));
    it('published()', () => expect(ProductStatusVO.published().value).toBe('published'));
    it('approved()', () => expect(ProductStatusVO.approved().value).toBe('approved'));
  });

  describe('predicates', () => {
    it('isDraft', () => expect(ProductStatusVO.draft().isDraft()).toBe(true));
    it('isPublished', () => expect(ProductStatusVO.published().isPublished()).toBe(true));
    it('isVisible — published is visible', () => {
      expect(ProductStatusVO.published().isVisible()).toBe(true);
    });
    it('isVisible — draft is not visible', () => {
      expect(ProductStatusVO.draft().isVisible()).toBe(false);
    });
    it('isEditable — draft is editable', () => {
      expect(ProductStatusVO.draft().isEditable()).toBe(true);
    });
    it('isEditable — deleted is not editable', () => {
      expect(ProductStatusVO.deleted().isEditable()).toBe(false);
    });
    it('isFinal — deleted is final', () => {
      expect(ProductStatusVO.deleted().isFinal()).toBe(true);
    });
  });

  describe('state machine — canTransitionTo()', () => {
    it('draft → pending: allowed', () => {
      expect(ProductStatusVO.draft().canTransitionTo('pending')).toBe(true);
    });
    it('draft → published: not allowed', () => {
      expect(ProductStatusVO.draft().canTransitionTo('published')).toBe(false);
    });
    it('pending → approved: allowed', () => {
      expect(ProductStatusVO.pending().canTransitionTo('approved')).toBe(true);
    });
    it('approved → published: allowed', () => {
      expect(ProductStatusVO.approved().canTransitionTo('published')).toBe(true);
    });
    it('published → archived: allowed', () => {
      expect(ProductStatusVO.published().canTransitionTo('archived')).toBe(true);
    });
    it('deleted → anything: not allowed', () => {
      expect(ProductStatusVO.deleted().canTransitionTo('draft')).toBe(false);
    });
  });
});
