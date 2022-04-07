import { APIGatewayProxyEvent } from "aws-lambda";

export function getBody(event: APIGatewayProxyEvent): { [key: string]: any } {
  try {
    const parsed = JSON.parse(event.body || '');
    return typeof parsed === 'object' ? parsed : {};
  } catch (e) {
    return {};
  }
}
