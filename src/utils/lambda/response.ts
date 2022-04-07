import { Response } from 'types';
import { ENV } from 'env';

export default function response(body: any, statusCode: number): Response {
  return {
    statusCode,
    isBase64Encoded: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body, null, 2),
  };
}

export function badRequest(message: string = 'bad request') {
  return response({ message }, 400);
}

export function notAuthorised() {
  return response({ message: 'denied' }, 403);
}

export function notAuthenticated() {
  return response({ message: 'authentication failed' }, 401);
}

export function notFound(message: string = 'not found') {
  return response({ message }, 404);
}

export function success(body?: any) {
  return response(body || {}, 200);
}

export function systemError(error: Error) {
  const r: { [key: string]: any } = { error: 'system error' };

  if (ENV === 'local') {
    r.messes = error.message;
    r.stack = error.stack;
  }

  return response(r, 500);
}
