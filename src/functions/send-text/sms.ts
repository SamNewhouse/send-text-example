import * as response from 'utils/lambda/response';
import { publishSms } from 'utils/sms'

export const handler = async (number: string, message: string): Promise<any> => {
  await publishSms(number, message);
  return response.success();
};
