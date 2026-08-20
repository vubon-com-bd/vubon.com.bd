/**
 * ইনভেন্টরি মডেলের জন্য কনস্ট্যান্টসমূহ
 */

// ইনভেন্টরি স্ট্যাটাস
export const InventoryStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DISCONTINUED: 'DISCONTINUED',
} as const;

export type InventoryStatusType = (typeof InventoryStatus)[keyof typeof InventoryStatus];

// স্টক লেভেল থ্রেশহোল্ড
export const StockThreshold = {
  LOW_STOCK_THRESHOLD: 10,
  CRITICAL_STOCK_THRESHOLD: 5,
} as const;

// স্টক টাইপ
export const StockType = {
  PHYSICAL: 'PHYSICAL',
  DIGITAL: 'DIGITAL',
  VIRTUAL: 'VIRTUAL',
} as const;

export type StockTypeType = (typeof StockType)[keyof typeof StockType];

// স্টক ইউনিট
export const StockUnit = {
  PIECE: 'PIECE',
  KG: 'KG',
  LITER: 'LITER',
  METER: 'METER',
  GRAM: 'GRAM',
  MILLILITER: 'MILLILITER',
  CENTIMETER: 'CENTIMETER',
  SQUARE_METER: 'SQUARE_METER',
  CUBIC_METER: 'CUBIC_METER',
} as const;

export type StockUnitType = (typeof StockUnit)[keyof typeof StockUnit];

// ইনভেন্টরি আপডেট টাইপ
export const InventoryUpdateType = {
  MANUAL: 'MANUAL',
  AUTO: 'AUTO',
  BATCH: 'BATCH',
} as const;

export type InventoryUpdateTypeType =
  (typeof InventoryUpdateType)[keyof typeof InventoryUpdateType];

// ওয়্যারহাউস টাইপ
export const WarehouseType = {
  MAIN: 'MAIN',
  BRANCH: 'BRANCH',
  DROP_SHIPPING: 'DROP_SHIPPING',
  FULFILLMENT_CENTER: 'FULFILLMENT_CENTER',
} as const;

export type WarehouseTypeType = (typeof WarehouseType)[keyof typeof WarehouseType];

// ডিফল্ট ইনভেন্টরি ভ্যালু
export const DEFAULT_INVENTORY_STATUS = InventoryStatus.ACTIVE;
export const DEFAULT_STOCK_TYPE = StockType.PHYSICAL;
export const DEFAULT_STOCK_UNIT = StockUnit.PIECE;
export const DEFAULT_INVENTORY_UPDATE_TYPE = InventoryUpdateType.MANUAL;
export const DEFAULT_WAREHOUSE_TYPE = WarehouseType.MAIN;

// ইনভেন্টরি স্টক কনস্ট্যান্ট
export const INVENTORY_STOCK_MIN = 0;
export const INVENTORY_STOCK_MAX = 999999999;

// ইনভেন্টরি রিজার্ভ স্টক কনস্ট্যান্ট
export const INVENTORY_RESERVED_STOCK_MIN = 0;
export const INVENTORY_RESERVED_STOCK_MAX = 999999999;

// ইনভেন্টরি সেফটি স্টক কনস্ট্যান্ট
export const INVENTORY_SAFETY_STOCK_MIN = 0;
export const INVENTORY_SAFETY_STOCK_MAX = 999999999;

// ইনভেন্টরি রি-অর্ডার পয়েন্ট কনস্ট্যান্ট
export const INVENTORY_REORDER_POINT_MIN = 0;
export const INVENTORY_REORDER_POINT_MAX = 999999999;

// ইনভেন্টরি রি-অর্ডার কোয়ান্টিটি কনস্ট্যান্ট
export const INVENTORY_REORDER_QUANTITY_MIN = 0;
export const INVENTORY_REORDER_QUANTITY_MAX = 999999999;

// ইনভেন্টরি সোর্ট অপশন
export const InventorySortOption = {
  STOCK_ASC: 'STOCK_ASC',
  STOCK_DESC: 'STOCK_DESC',
  RESERVED_STOCK_ASC: 'RESERVED_STOCK_ASC',
  RESERVED_STOCK_DESC: 'RESERVED_STOCK_DESC',
  CREATED_AT_ASC: 'CREATED_AT_ASC',
  CREATED_AT_DESC: 'CREATED_AT_DESC',
  UPDATED_AT_ASC: 'UPDATED_AT_ASC',
  UPDATED_AT_DESC: 'UPDATED_AT_DESC',
} as const;

export type InventorySortOptionType =
  (typeof InventorySortOption)[keyof typeof InventorySortOption];

// ডিফল্ট ইনভেন্টরি পেজিনেশন
export const DEFAULT_INVENTORY_PAGE_SIZE = 20;

// ইনভেন্টরি ইম্পোর্ট/এক্সপোর্ট কনস্ট্যান্ট
export const MAX_INVENTORY_IMPORT_ROWS = 10000;
export const MAX_INVENTORY_EXPORT_ROWS = 100000;

// ইনভেন্টরি বাল্ক আপডেট কনস্ট্যান্ট
export const MAX_INVENTORY_PER_BULK_UPDATE = 100;

// ইনভেন্টরি হিস্টোরি কনস্ট্যান্ট
export const INVENTORY_HISTORY_MAX_DAYS = 365;
export const INVENTORY_HISTORY_MAX_ENTRIES = 10000;

// ইনভেন্টরি অ্যালার্ট কনস্ট্যান্ট
export const INVENTORY_ALERT_LOW_STOCK_DAYS = 7;
export const INVENTORY_ALERT_CRITICAL_STOCK_DAYS = 3;

// ইনভেন্টরি নোটিফিকেশন কনস্ট্যান্ট
export const INVENTORY_NOTIFICATION_BATCH_SIZE = 100;
export const INVENTORY_NOTIFICATION_RETRY_COUNT = 3;

// ইনভেন্টরি লক কনস্ট্যান্ট
export const INVENTORY_LOCK_TIMEOUT_MINUTES = 15;
export const INVENTORY_LOCK_MAX_RETRIES = 5;

// ওয়্যারহাউস কনস্ট্যান্ট
export const WAREHOUSE_NAME_MIN_LENGTH = 2;
export const WAREHOUSE_NAME_MAX_LENGTH = 100;
export const WAREHOUSE_CODE_MIN_LENGTH = 2;
export const WAREHOUSE_CODE_MAX_LENGTH = 20;
export const WAREHOUSE_CODE_PATTERN = /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/;

// ওয়্যারহাউস লোকেশন কনস্ট্যান্ট
export const WAREHOUSE_LOCATION_MAX_LENGTH = 500;
export const WAREHOUSE_ADDRESS_MAX_LENGTH = 500;

// ওয়্যারহাউস ক্যাপাসিটি কনস্ট্যান্ট
export const WAREHOUSE_CAPACITY_MIN = 0;
export const WAREHOUSE_CAPACITY_MAX = 999999999;
export const WAREHOUSE_CAPACITY_UNIT = 'CUBIC_METER';

// ইনভেন্টরি মেটাডাটা কনস্ট্যান্ট
export const MAX_INVENTORY_META_FIELDS = 20;
export const INVENTORY_META_KEY_MAX_LENGTH = 100;
export const INVENTORY_META_VALUE_MAX_LENGTH = 1000;
