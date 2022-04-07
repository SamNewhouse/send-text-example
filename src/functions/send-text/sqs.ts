import { SQSEvent } from 'aws-lambda';
import { handler as SMS } from 'functions/send-text/sms';

export const handler = async function (event: SQSEvent) {
  await Promise.all(event.Records.map(async (r) => {
    const { phoneNumber, message } = JSON.parse(r.body);
    await SMS(phoneNumber, message);
  }));
};
