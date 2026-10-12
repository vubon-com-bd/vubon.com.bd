import { jest } from '@jest/globals';
import { QueryBus } from '@nestjs/cqrs';
import { VendorPublicController } from '../../../../../src/module/interfaces/controllers/rest/vendor-public.controller.js';
import { GetVendorPublicQuery } from '../../../../../src/module/application/queries/vendor/get-vendor-public.query.js';
import { GetVendorBySlugQuery } from '../../../../../src/module/application/queries/vendor/get-vendor-by-slug.query.js';
import { SearchVendorsQuery } from '../../../../../src/module/application/queries/vendor/search-vendors.query.js';
import { FindTopRatedVendorsQuery } from '../../../../../src/module/application/queries/vendor/find-top-rated-vendors.query.js';
import { FindFeaturedVendorsQuery } from '../../../../../src/module/application/queries/vendor/find-featured-vendors.query.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeQueryBus(): jest.Mocked<QueryBus> {
  return { execute: jest.fn().mockResolvedValue({ id: UUID }) } as unknown as jest.Mocked<QueryBus>;
}

describe('VendorPublicController', () => {
  let controller: VendorPublicController;
  let queryBus: jest.Mocked<QueryBus>;

  beforeEach(() => {
    queryBus = makeQueryBus();
    controller = new VendorPublicController(queryBus);
  });

  it('topRated dispatches FindTopRatedVendorsQuery', async () => {
    await controller.topRated('5');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(FindTopRatedVendorsQuery));
  });

  it('topRated defaults to 10', async () => {
    await controller.topRated(undefined);
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(FindTopRatedVendorsQuery));
  });

  it('featured dispatches FindFeaturedVendorsQuery', async () => {
    await controller.featured('5');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(FindFeaturedVendorsQuery));
  });

  it('search dispatches SearchVendorsQuery', async () => {
    await controller.search('acme', '10');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(SearchVendorsQuery));
  });

  it('getBySlug dispatches GetVendorBySlugQuery', async () => {
    await controller.getBySlug('acme');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetVendorBySlugQuery));
  });

  it('getById dispatches GetVendorPublicQuery', async () => {
    await controller.getById(UUID);
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetVendorPublicQuery));
  });
});
