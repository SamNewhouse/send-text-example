import { SQSEvent } from 'aws-lambda';
import { sendSms } from 'utils/sms'

export const handler = async function (event: SQSEvent) {
  await Promise.all(event.Records.map(async (r) => {
    const { number, message } = JSON.parse(r.body);
    await sendSms(number, message);
  }));
};
