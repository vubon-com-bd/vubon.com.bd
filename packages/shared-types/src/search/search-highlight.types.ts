/**
 * Search Highlight Types
 * Type definitions for search highlighting based on shared-constants
 * @module SearchHighlightTypes
 */

import { Metadata } from '../common/core-primitives.types';

// ============================================================
// Search Highlight Types
// ============================================================

/**
 * Base search highlight
 */
export interface SearchHighlight {
  /** Fields to highlight */
  fields: string[];
  /** Highlight tag (opening) */
  preTag?: string;
  /** Highlight tag (closing) */
  postTag?: string;
  /** Fragment size (characters) */
  fragmentSize?: number;
  /** Number of fragments */
  numberOfFragments?: number;
  /** Fragment offset */
  fragmentOffset?: number;
  /** Require field match */
  requireFieldMatch?: boolean;
  /** Boundary scanner */
  boundaryScanner?: 'sentence' | 'word' | 'chars';
  /** Boundary max scan */
  boundaryMaxScan?: number;
  /** Highlight metadata */
  metadata?: Metadata;
}

/**
 * Highlight field configuration
 */
export interface SearchHighlightField {
  /** Field name */
  field: string;
  /** Highlight tag (opening) */
  preTag?: string;
  /** Highlight tag (closing) */
  postTag?: string;
  /** Fragment size (characters) */
  fragmentSize?: number;
  /** Number of fragments */
  numberOfFragments?: number;
  /** Fragment offset */
  fragmentOffset?: number;
  /** Require field match */
  requireFieldMatch?: boolean;
}

/**
 * Highlight result
 */
export interface SearchHighlightResult {
  /** Field name */
  field: string;
  /** Highlighted fragments */
  fragments: string[];
  /** Original text */
  original?: string;
  /** Match count */
  matchCount?: number;
  /** Score */
  score?: number;
}

/**
 * Highlight configuration
 */
export interface SearchHighlightConfiguration {
  /** Default pre tag */
  defaultPreTag: string;
  /** Default post tag */
  defaultPostTag: string;
  /** Default fragment size */
  defaultFragmentSize: number;
  /** Default number of fragments */
  defaultNumberOfFragments: number;
  /** Default fragment offset */
  defaultFragmentOffset: number;
  /** Default boundary scanner */
  defaultBoundaryScanner: 'sentence' | 'word' | 'chars';
  /** Default boundary max scan */
  defaultBoundaryMaxScan: number;
  /** Max fields to highlight */
  maxFields: number;
  /** Max fragments per field */
  maxFragmentsPerField: number;
  /** Max fragment size */
  maxFragmentSize: number;
}

/**
 * Highlight validation
 */
export interface SearchHighlightValidation {
  /** Whether the highlight is valid */
  isValid: boolean;
  /** Field name */
  field: string;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Highlight statistics
 */
export interface SearchHighlightStatistics {
  /** Total highlights */
  totalHighlights: number;
  /** Fields highlighted */
  fields: string[];
  /** Average fragments per field */
  avgFragments: number;
  /** Average fragment size */
  avgFragmentSize: number;
  /** Most highlighted fields */
  topFields: { field: string; count: number }[];
  /** Performance */
  performance: {
    avgTimeMs: number;
    minTimeMs: number;
    maxTimeMs: number;
  };
}
