/**
 * Request Dispatcher — method dispatcher using requestHelper
 * @module logistics-service/test/utility
 */
import { requestHelper } from './request-helper.js';

export async function sendRequest(
  method: string,
  path: string,
  body?: unknown,
): Promise<unknown> {
  switch (method.toUpperCase()) {
    case 'GET':
      return requestHelper.get(path);
    case 'POST':
      return requestHelper.post(path, body);
    case 'PUT':
      return requestHelper.put(path, body);
    case 'PATCH':
      return requestHelper.patch(path, body);
    case 'DELETE':
      return requestHelper.delete(path);
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
}
