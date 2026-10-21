/**
 * SubscriptionModule — unit test
 * @module test/unit/modules
 */
import 'reflect-metadata';
import { SubscriptionModule } from '@modules/subscription/subscription.module';
import { SubscriptionController } from '@interfaces/controllers/rest/subscription.controller';
import { SUBSCRIPTION_COMMAND_HANDLERS } from '@modules/subscription/commands';
import { SUBSCRIPTION_QUERY_HANDLERS } from '@modules/subscription/queries';
import { SUBSCRIPTION_SAGAS } from '@modules/subscription/sagas';

describe('SubscriptionModule', () => {
  it('is defined', () => {
    expect(SubscriptionModule).toBeDefined();
  });

  it('registers SubscriptionController', () => {
    const controllers = Reflect.getMetadata('controllers', SubscriptionModule);
    expect(controllers).toContain(SubscriptionController);
  });

  it('has 5 command handlers', () => {
    expect(SUBSCRIPTION_COMMAND_HANDLERS).toHaveLength(5);
  });

  it('has 2 query handlers', () => {
    expect(SUBSCRIPTION_QUERY_HANDLERS).toHaveLength(2);
  });

  it('has 1 saga', () => {
    expect(SUBSCRIPTION_SAGAS).toHaveLength(1);
  });
});
