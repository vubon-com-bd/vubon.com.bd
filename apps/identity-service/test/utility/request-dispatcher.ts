import { requestHelper } from './request-helper';
export async function sendRequest(method: string, path: string, body?: any){
  switch(method){
    case 'GET': return requestHelper.get(path);
    case 'POST': return requestHelper.post(path, body);
    case 'PUT': return requestHelper.put(path, body);
    case 'DELETE': return requestHelper.delete(path);
    default: throw new Error('Unsupported method '+method);
  }
}
