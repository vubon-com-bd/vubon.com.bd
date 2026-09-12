import { BaseEntity } from '../../common/base.types';
import { FLASH_SALE_RULE } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-rule.constants';
import { FlashSale } from './flash-sale.types';

export interface RuleCondition {
  field: string;
  operator: string;
  value: unknown;
}

export interface RuleAction {
  type: string;
  value: unknown;
}

export interface FlashSaleRule extends BaseEntity {
  ruleId: string;
  flashSaleId: string;
  flashSale: FlashSale;
  type: keyof typeof FLASH_SALE_RULE.TYPES | string;
  operator: keyof typeof FLASH_SALE_RULE.RULE_OPERATORS | string;
  priority: keyof typeof FLASH_SALE_RULE.RULE_PRIORITIES | string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  isActive: boolean;
  metadata: Record<string, unknown>;
}
