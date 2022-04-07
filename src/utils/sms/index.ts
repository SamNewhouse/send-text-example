import AWS from 'aws-sdk';
import { AWS_ACCESS_SECRET_KEY, AWS_ACCESS_KEY_ID, AWS_SNS_TOPIC_ARN } from 'env';

const SNS = new AWS.SNS({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_ACCESS_SECRET_KEY
});

export const publishSms = async (number: string, message: string) => {
  await SNS.publish({
    Message: JSON.stringify({number, message}),
    TargetArn: AWS_SNS_TOPIC_ARN,
  }).promise();
}

export const sendSms = async (number: string, message: string) => {
  await SNS.publish({
    Message: message,
    PhoneNumber: number,
    MessageAttributes: {
      'AWS.SNS.SMS.SenderID': {
        'DataType': 'String',
        'StringValue': 'SamNewhouse'
      }
    }
  }).promise();
}
