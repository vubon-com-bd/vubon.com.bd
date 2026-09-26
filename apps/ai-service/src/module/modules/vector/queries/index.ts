import { GetVectorHandler } from '../../../application/queries/vector/get-vector.handler';
import { ListVectorIndexesHandler } from '../../../application/queries/vector/list-vector-indexes.handler';

export const VectorQueryHandlers = [
  GetVectorHandler,
  ListVectorIndexesHandler,
];
