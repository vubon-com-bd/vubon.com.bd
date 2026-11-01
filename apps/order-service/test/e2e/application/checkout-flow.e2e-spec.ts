/**
 * E2E — Checkout Flow
 * @module order-service/test/e2e/application
 */
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { createTestApp, TestAppContext } from '@fixtures/e2e/test-app.factory.js';
import { CheckoutEntity } from '@domain/entities/checkout.entity.js';
import { CheckoutVO } from '@domain/composites/checkout.vo.js';
import { CheckoutStatusVO } from '@domain/primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '@domain/primitives/checkout-step.vo.js';
import {
  fixtureCheckoutId,
  fixtureCustomerId,
  UUID_1,
} from '@fixtures/domain/primitive-fixtures.js';
import { E2E_NOW } from '@fixtures/e2e/order-scenario.js';

function makeCheckout(): CheckoutEntity {
  return CheckoutEntity.create({
    id: fixtureCheckoutId.value,
    vo: CheckoutVO.create({
      id: fixtureCheckoutId,
      customerId: fixtureCustomerId,
      status: CheckoutStatusVO.started(),
      currentStep: CheckoutStepVO.cart(),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    }),
    now: E2E_NOW,
  });
}

describe('E2E — Checkout Flow', () => {
  let ctx: TestAppContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.close();
  });

  it('starts at cart step in started status', () => {
    const checkout = makeCheckout();
    expect(checkout.isStarted()).toBe(true);
    expect(checkout.currentStep.value).toBe('cart');
  });

  it('advances through all steps', () => {
    const checkout = makeCheckout();
    checkout.advanceTo(CheckoutStepVO.create('shipping_address'), E2E_NOW);
    checkout.advanceTo(CheckoutStepVO.create('shipping_method'), E2E_NOW);
    checkout.advanceTo(CheckoutStepVO.create('payment_method'), E2E_NOW);
    checkout.advanceTo(CheckoutStepVO.create('review'), E2E_NOW);
    checkout.advanceTo(CheckoutStepVO.confirmation(), E2E_NOW);
    expect(checkout.currentStep.isLast()).toBe(true);
    expect(checkout.isInProgress()).toBe(true);
  });

  it('completes checkout with order', () => {
    const checkout = makeCheckout();
    checkout.advanceTo(CheckoutStepVO.create('shipping_address'), E2E_NOW);
    checkout.complete(UUID_1, E2E_NOW);
    expect(checkout.isCompleted()).toBe(true);
  });

  it('abandons checkout', () => {
    const checkout = makeCheckout();
    checkout.abandon('user timeout', E2E_NOW);
    expect(checkout.isAbandoned()).toBe(true);
  });

  it('emits checkout lifecycle events', () => {
    const checkout = makeCheckout();
    checkout.advanceTo(CheckoutStepVO.create('shipping_address'), E2E_NOW);
    checkout.complete(UUID_1, E2E_NOW);
    const events = checkout.domainEvents;
    expect(events.length).toBeGreaterThanOrEqual(2); // started + completed
  });
});
