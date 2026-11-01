/**
 * Vendor Query Handlers Barrel
 * @module vendor-service/modules/vendor/queries
 */
import { GetVendorHandler } from '../../../application/queries/vendor/get-vendor.handler.js';
import { GetVendorBySlugHandler } from '../../../application/queries/vendor/get-vendor-by-slug.handler.js';
import { GetMyVendorHandler } from '../../../application/queries/vendor/get-my-vendor.handler.js';
import { ListVendorsHandler } from '../../../application/queries/vendor/list-vendors.handler.js';
import { SearchVendorsHandler } from '../../../application/queries/vendor/search-vendors.handler.js';
import { GetVendorStatsHandler } from '../../../application/queries/vendor/get-vendor-stats.handler.js';

export const VENDOR_QUERY_HANDLERS = [
  GetVendorHandler,
  GetVendorBySlugHandler,
  GetMyVendorHandler,
  ListVendorsHandler,
  SearchVendorsHandler,
  GetVendorStatsHandler,
] as const;

export {
  GetVendorHandler,
  GetVendorBySlugHandler,
  GetMyVendorHandler,
  ListVendorsHandler,
  SearchVendorsHandler,
  GetVendorStatsHandler,
};
