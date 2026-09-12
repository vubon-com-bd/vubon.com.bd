/**
 * Compression Helper — gzip/deflate via Node.js zlib.
 * @module shared-utils/common/helper/compression
 */
import { gzipSync, gunzipSync, deflateSync, inflateSync } from 'zlib';

export const gzip = (data: string): Buffer => gzipSync(Buffer.from(data, 'utf8'));

export const gunzip = (data: Buffer): string => gunzipSync(data).toString('utf8');

export const deflate = (data: string): Buffer => deflateSync(Buffer.from(data, 'utf8'));

export const inflate = (data: Buffer): string => inflateSync(data).toString('utf8');

export const gzipBase64 = (data: string): string => gzip(data).toString('base64');

export const gunzipBase64 = (data: string): string => gunzip(Buffer.from(data, 'base64'));
