/**
 * TransactionModule — unit test
 * @module test/unit/modules
 */
import 'reflect-metadata';
import { TransactionModule } from '@modules/transaction/transaction.module';
import { TransactionController } from '@interfaces/controllers/rest/transaction.controller';
import { TRANSACTION_COMMAND_HANDLERS } from '@modules/transaction/commands';
import { TRANSACTION_QUERY_HANDLERS } from '@modules/transaction/queries';

describe('TransactionModule', () => {
  it('is defined', () => {
    expect(TransactionModule).toBeDefined();
  });

  it('registers TransactionController', () => {
    const controllers = Reflect.getMetadata('controllers', TransactionModule);
    expect(controllers).toContain(TransactionController);
  });

  it('has 2 command handlers', () => {
    expect(TRANSACTION_COMMAND_HANDLERS).toHaveLength(2);
  });

  it('has 2 query handlers', () => {
    expect(TRANSACTION_QUERY_HANDLERS).toHaveLength(2);
  });
});
