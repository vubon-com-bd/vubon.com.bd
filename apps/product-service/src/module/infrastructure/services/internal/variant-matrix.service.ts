/**
 * VariantMatrixService — infra adapter for variant combination generation.
 * @module product-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { VariantMatrixService as DomainVariantMatrix } from '../../../domain/services/variant-matrix.service.js';

export const VARIANT_MATRIX_SERVICE = Symbol('VARIANT_MATRIX_SERVICE');

@Injectable()
export class VariantMatrixService extends DomainVariantMatrix {}
