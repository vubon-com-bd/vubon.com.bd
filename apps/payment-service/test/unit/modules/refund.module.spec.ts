/**
 * RefundModule — unit test
 * @module test/unit/modules
 */
import 'reflect-metadata';
import { RefundModule } from '@modules/refund/refund.module';
import { RefundController } from '@interfaces/controllers/rest/refund.controller';
import { REFUND_COMMAND_HANDLERS } from '@modules/refund/commands';
import { REFUND_QUERY_HANDLERS } from '@modules/refund/queries';
import { REFUND_SAGAS } from '@modules/refund/sagas';

describe('RefundModule', () => {
  it('is defined', () => {
    expect(RefundModule).toBeDefined();
  });

  it('registers RefundController', () => {
    const controllers = Reflect.getMetadata('controllers', RefundModule);
    expect(controllers).toContain(RefundController);
  });

  it('has 4 command handlers', () => {
    expect(REFUND_COMMAND_HANDLERS).toHaveLength(4);
  });

  it('has 2 query handlers', () => {
    expect(REFUND_QUERY_HANDLERS).toHaveLength(2);
  });

  it('has 1 saga', () => {
    expect(REFUND_SAGAS).toHaveLength(1);
  });
});
