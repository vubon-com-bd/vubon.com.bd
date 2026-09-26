import { IndexVectorHandler } from '../../../application/commands/vector/index-vector.handler';
import { SearchVectorHandler } from '../../../application/commands/vector/search-vector.handler';
import { RebuildIndexHandler } from '../../../application/commands/vector/rebuild-index.handler';

export const VectorCommandHandlers = [
  IndexVectorHandler,
  SearchVectorHandler,
  RebuildIndexHandler,
];
