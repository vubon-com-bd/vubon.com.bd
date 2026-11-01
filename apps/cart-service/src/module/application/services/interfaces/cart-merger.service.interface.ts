/**
 * ICartMergerService — contract
 * @module cart-service/application/services/interfaces
 */
import type {
  MergeResponseDTO,
  MergeSummaryResponseDTO,
} from '../../dtos/responses/merge-response.dto.js';

// ─── DI Token ──────────────────────────────
export const CART_MERGER_SERVICE = Symbol('CART_MERGER_SERVICE');

// ─── Contract ─────────────────────────────
export interface ICartMergerService {
  /**
   * Plan a merge (dry-run) — does not persist.
   */
  plan(
    sourceCartId: string,
    targetCartId: string,
    strategy?: string,
  ): Promise<MergeResponseDTO>;

  /**
   * Execute a merge.
   */
  execute(
    sourceCartId: string,
    targetCartId: string,
    strategy?: string,
    actorId?: string,
  ): Promise<MergeSummaryResponseDTO>;

  getById(mergerId: string): Promise<MergeResponseDTO>;
  findByCartId(cartId: string): Promise<readonly MergeSummaryResponseDTO[]>;
}
